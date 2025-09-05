import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ByUnicoSDK } from 'idpay-b2b-sdk';

@Component({
  selector: 'app-fullscreen-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fullscreen-test.component.html',
  styleUrl: './fullscreen-test.component.css'
})
export class FullscreenTestComponent implements OnInit, OnDestroy {

  @ViewChild('fullscreenContainer', { static: true }) fullscreenContainer!: ElementRef;

  transactionId: string = '';
  token: string = '';
  isFullscreen: boolean = false;
  isInitialized: boolean = false;
  isProcessing: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    console.log('*** FullscreenTestComponent initialized ***');
    this.clearMessages();
  }

  ngOnDestroy(): void {
    console.log('*** FullscreenTestComponent destroyed - cleaning up SDK ***');
    this.cleanupSDK();
  }

  initializeSDK(): void {
    if (!this.token.trim()) {
      this.setError('Token is required to initialize the SDK');
      return;
    }

    if (!this.fullscreenContainer?.nativeElement) {
      this.setError('Fullscreen container is not available');
      return;
    }

    try {
      this.isProcessing = true;
      this.clearMessages();
      
      console.log('*** INITIALIZING SDK in FULLSCREEN mode ***');
      console.log('Token:', this.token.substring(0, 20) + '...');

      ByUnicoSDK.init({
        env: 'uat',
        token: this.token,
        element: this.fullscreenContainer.nativeElement
      });

      this.isInitialized = true;
      this.setSuccess('SDK initialized! Now you can open in fullscreen mode.');
      console.log('*** SDK INITIALIZED SUCCESSFULLY for FULLSCREEN ***');

    } catch (error) {
      console.error('Error initializing SDK:', error);
      this.setError(`Error initializing SDK: ${error}`);
      this.isInitialized = false;
    } finally {
      this.isProcessing = false;
    }
  }

  openFullscreen(): void {
    if (!this.isInitialized) {
      this.setError('SDK needs to be initialized first');
      return;
    }

    if (!this.transactionId.trim()) {
      this.setError('Transaction ID is required');
      return;
    }

    try {
      this.isProcessing = true;
      this.clearMessages();

      console.log('*** OPENING FULLSCREEN MODE ***');
      console.log('Transaction ID:', this.transactionId);

      this.isFullscreen = true;

      setTimeout(() => {
        ByUnicoSDK.open({
          transactionId: this.transactionId,
          token: this.token,
          onFinish: this.handleTransactionFinish.bind(this)
        });

        this.setSuccess('Fullscreen mode activated! Complete the process on screen.');
        this.isProcessing = false;
      }, 100);

    } catch (error) {
      console.error('Error opening fullscreen:', error);
      this.setError(`Error opening fullscreen: ${error}`);
      this.isFullscreen = false;
      this.isProcessing = false;
    }
  }

  closeSDK(): void {
    try {
      this.isProcessing = true;
      this.clearMessages();

      console.log('*** CLOSING FULLSCREEN SDK ***');
      
      ByUnicoSDK.close();
      
      this.isFullscreen = false;
      this.isInitialized = false;
      this.setSuccess('Fullscreen mode closed successfully!');
      console.log('*** FULLSCREEN SDK CLOSED ***');

    } catch (error) {
      console.error('Error closing fullscreen SDK:', error);
      this.setError(`Error closing SDK: ${error}`);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Callback executado quando a transação é finalizada
   * Automaticamente sai do modo fullscreen
   */
  private handleTransactionFinish(result: any): void {
    console.log('*** FULLSCREEN TRANSACTION FINISHED ***', result);
    
    this.isFullscreen = false;
    this.setSuccess('Transaction completed successfully! Fullscreen disabled.');
    
    console.log('*** CLOSING SDK automatically after transaction completion ***');
    this.closeSDK();
  }

  exitFullscreen(): void {
    console.log('*** EMERGENCY EXIT FROM FULLSCREEN ***');
    this.isFullscreen = false;
    this.clearMessages();
    this.setSuccess('Fullscreen mode disabled. SDK is still active.');
  }

  private cleanupSDK(): void {
    try {
      if (this.isInitialized) {
        ByUnicoSDK.close();
      }
    } catch (error) {
      console.error('Error cleaning up SDK:', error);
    }
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  private setError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
    console.error('*** FULLSCREEN ERROR:', message);
  }

  private setSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    console.log('*** FULLSCREEN SUCCESS:', message);
  }

  /**
   * Getters para validação e estados da UI
   */
  get canInitialize(): boolean {
    return !this.isProcessing && !this.isInitialized && !this.isFullscreen && this.token.trim().length > 0;
  }

  get canOpenFullscreen(): boolean {
    return !this.isProcessing && this.isInitialized && !this.isFullscreen && this.transactionId.trim().length > 0;
  }

  get canClose(): boolean {
    return !this.isProcessing && (this.isInitialized || this.isFullscreen);
  }

  get showControls(): boolean {
    return !this.isFullscreen;
  }
}
