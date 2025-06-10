import { Component } from '@angular/core';
import { ByUnicoSDK } from 'idpay-b2b-sdk';

@Component({
  selector: 'app-open',
  imports: [],
  templateUrl: './open.component.html',
  styleUrl: './open.component.css',
})
export class OpenComponent {
  open(): void {
    const processId = ''; // inserir o processID
    const token = ''; // inserir o token

    const onFinishCallback = (process: any) => {
      console.log('Process', process);
    };

    ByUnicoSDK.open({
      transactionId: processId,
      token: token,
      onFinish: onFinishCallback,
    });
  }
}
