import { Component, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ByUnicoSDK } from 'idpay-b2b-sdk';

@Component({
  selector: 'app-modal-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-test.component.html',
  styleUrl: './modal-test.component.css'
})
export class ModalTestComponent implements AfterViewInit, OnChanges {

  @ViewChild('unicoIframeRef', { static: false }) unicoIframeRef!: ElementRef;

  showModal: boolean = false;
  error: string = '';
  transactionId: string = '';
  token: string = '';
  iframeKey: number = 0;
  sdkInitialized: boolean = false;
  isProcessing: boolean = false;

  ngAfterViewInit(): void {
    console.log('*** ModalTestComponent initialized ***');
    
    if (this.showModal && this.unicoIframeRef?.nativeElement) {
      console.log("ngAfterViewInit: Modal and iframe ready, scheduling SDK initialization");
      setTimeout(() => {
        this.initializeAndOpenSDKAfterModal();
      }, 200);
    }
  }

  private closeByUnicoSDKSession(): void {
    if (!this.sdkInitialized) {
      console.log("*** SDK not initialized yet, skipping close ***");
      return;
    }

    console.log("*** EXECUTING closeByUnicoSDKSession ***");
    try {
      if (typeof ByUnicoSDK !== "undefined" && ByUnicoSDK && typeof ByUnicoSDK.close === "function") {
        console.log("*** CALLING ByUnicoSDK.close() ***");
        ByUnicoSDK.close();
        console.log("ByUnicoSDK session closed successfully.");
        this.sdkInitialized = false;
      } else {
        console.warn("ByUnicoSDK.close method not fully available for calling, skipping close.");
      }
    } catch (e) {
      console.error("Error closing ByUnicoSDK session:", e);
    }
  }

  private handleCloseModal(): void {
    console.log("*** CLOSING MODAL - starting cleanup process ***");
    this.showModal = false;
    this.isProcessing = false;
    this.closeByUnicoSDKSession();
    this.iframeKey += 1;
    this.error = '';
  }

  private onFinishSdk = (result: any): void => {
    console.log("Finish SDK:", result);
    console.log("*** SDK FINISHED - closing modal automatically ***");
    this.handleCloseModal();
  }

  private initializeAndOpenByUnicoSDK(): void {
    if (!this.unicoIframeRef?.nativeElement) {
      console.warn("initializeAndOpenByUnicoSDK called but unicoIframeRef.current is null.");
      return;
    }

    const startInitialization = () => {
      console.log("*** STARTING ByUnicoSDK... ***");
      
      try {
        ByUnicoSDK.init({ 
          type: "IFRAME",
          env: "uat",
          token: this.token,
          element: this.unicoIframeRef.nativeElement,
        });

        this.sdkInitialized = true;
        console.log("*** SDK initialized successfully ***");

        setTimeout(() => {
          console.log("*** OPENING ByUnicoSDK after 0.5s delay... ***");
          ByUnicoSDK.open({
            transactionId: this.transactionId,
            token: this.token,
            onFinish: this.onFinishSdk,
          });
        }, 500);

      } catch (error) {
        console.error("Error initializing SDK:", error);
        this.setError(`Error initializing SDK: ${error}`);
        this.handleCloseModal();
      }
    };

    if (this.sdkInitialized) {
      console.log("*** SDK already initialized, closing previous session ***");
      this.closeByUnicoSDKSession();
      setTimeout(startInitialization, 200);
    } else {
      startInitialization();
    }
  }

  openModal(): void {
    this.error = '';

    if (!this.token.trim()) {
      this.setError('Token is required');
      return;
    }
    if (!this.transactionId.trim()) {
      this.setError('Transaction ID is required');
      return;
    }

    console.log("*** OPENING MODAL ***");
    this.showModal = true;
    
    setTimeout(() => {
      if (this.showModal && this.unicoIframeRef?.nativeElement) {
        console.log("Modal is visible and iframe ref is ready. Attempting to initialize and open SDK.");
        this.initializeAndOpenSDKAfterModal();
      }
    }, 100);
  }

  closeModal(): void {
    console.log("*** CLOSE BUTTON CLICKED ***");
    this.handleCloseModal();
  }

  onTransactionIdChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.error = '';
    this.transactionId = target.value;
  }

  onTokenChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.error = '';
    this.token = target.value;
  }

  /**
   * Lifecycle - detecta mudanças nas propriedades
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showModal'] && this.showModal && this.unicoIframeRef?.nativeElement) {
      console.log("ngOnChanges: showModal changed to true, scheduling SDK initialization");
      setTimeout(() => {
        this.initializeAndOpenSDKAfterModal();
      }, 200);
    }
  }
  
  /**
   * Inicializa e abre o SDK após modal estar visível
   * Segue o padrão do React que funciona
   */
  private initializeAndOpenSDKAfterModal(): void {
    if (!this.showModal || !this.unicoIframeRef?.nativeElement) {
      console.log("Modal not ready yet, skipping SDK initialization");
      return;
    }

    console.log("Modal is visible and iframe ref is ready. Attempting to initialize and open SDK.");
    setTimeout(() => {
      this.initializeAndOpenByUnicoSDK();
    }, 100);
  }

  onBack(): void {
    console.log("*** BACK BUTTON CLICKED - ModalTest ***");
    const backEvent = new CustomEvent('backToHome');
    document.dispatchEvent(backEvent);
  }

  /**
   * Utilitários
   */
  private setError(message: string): void {
    this.error = message;
    console.error('*** ERROR:', message);
  }

  /**
   * Getters para validação
   */
  get canOpenModal(): boolean {
    return !this.showModal && 
           this.token.trim().length > 0 && 
           this.transactionId.trim().length > 0;
  }

  get hasTokenError(): boolean {
    return this.error.includes('Token');
  }

  get hasTransactionError(): boolean {
    return this.error.includes('Transaction');
  }
}