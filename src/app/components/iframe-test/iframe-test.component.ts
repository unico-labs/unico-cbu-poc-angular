import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ByUnicoSDK } from 'idpay-b2b-sdk';

@Component({
  selector: 'app-iframe-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iframe-test.component.html',
  styleUrl: './iframe-test.component.css'
})
export class IframeTestComponent implements OnInit, OnDestroy {
  
  transactionId: string = '';
  token: string = '';
  isInitialized: boolean = false;
  isProcessing: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    console.log('*** IframeTestComponent initialized ***');
    this.clearMessages();
  }

  ngOnDestroy(): void {
    console.log('*** IframeTestComponent destroyed - cleaning up SDK ***');
    this.cleanupSDK();
  }

  initializeSDK(): void {
    if (!this.token.trim()) {
      this.setError('Token is required to initialize the SDK');
      return;
    }

    try {
      this.isProcessing = true;
      this.clearMessages();
      
      console.log('*** INITIALIZING SDK in IFRAME mode ***');
      console.log('Token:', this.token.substring(0, 20) + '...');

      ByUnicoSDK.init({
        env: 'uat',
        token: this.token,
      });

      this.isInitialized = true;
      this.setSuccess('SDK initialized successfully! Now you can open a transaction.');
      console.log('*** SDK INITIALIZED SUCCESSFULLY ***');

    } catch (error) {
      console.error('Error initializing SDK:', error);
      this.setError(`Error initializing SDK: ${error}`);
      this.isInitialized = false;
    } finally {
      this.isProcessing = false;
    }
  }

  openTransaction(): void {
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

      console.log('*** OPENING TRANSACTION ***');
      console.log('Transaction ID:', this.transactionId);

      ByUnicoSDK.open({
        transactionId: this.transactionId,
        token: this.token,
        onFinish: this.handleTransactionFinish.bind(this)
      });

      this.setSuccess('Transaction opened! Complete the process in the SDK area.');

    } catch (error) {
      console.error('Error opening transaction:', error);
      this.setError(`Error opening transaction: ${error}`);
    } finally {
      this.isProcessing = false;
    }
  }

  closeSDK(): void {
    try {
      this.isProcessing = true;
      this.clearMessages();

      console.log('*** CLOSING SDK SESSION ***');
      
      ByUnicoSDK.close();
      
      this.isInitialized = false;
      this.setSuccess('SDK closed successfully!');
      console.log('*** SDK SESSION CLOSED ***');

    } catch (error) {
      console.error('Error closing SDK:', error);
      this.setError(`Error closing SDK: ${error}`);
    } finally {
      this.isProcessing = false;
    }
  }

  private handleTransactionFinish(result: any): void {
    console.log('*** TRANSACTION FINISHED ***', result);
    
    this.setSuccess('Transaction completed successfully! Check the console for details.');
    
    console.log('*** CLOSING SDK automatically after transaction completion ***');
    this.closeSDK();
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
    console.error('*** ERROR:', message);
  }

  private setSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    console.log('*** SUCCESS:', message);
  }

  get canInitialize(): boolean {
    return !this.isProcessing && !this.isInitialized && this.token.trim().length > 0;
  }

  get canOpenTransaction(): boolean {
    return !this.isProcessing && this.isInitialized && this.transactionId.trim().length > 0;
  }

  get canClose(): boolean {
    return !this.isProcessing && this.isInitialized;
  }
}

