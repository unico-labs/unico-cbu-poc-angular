import { Component } from '@angular/core';
//@ts-ignore
import { UnicoSDK } from 'idpay-b2b-sdk/index.js';

@Component({
  selector: 'app-open',
  imports: [],
  templateUrl: './open.component.html',
  styleUrl: './open.component.css'
})
export class OpenComponent {
open(): void {
  const processId = ''; // inserir o processID
  const token = ''; // inserir o token
  
  const onFinishCallback = (process: any) => {
    console.log('Process', process);
  };

  UnicoSDK.open({
    transactionId: processId,
    token: token,
    onFinish: onFinishCallback
  });
  console.log(UnicoSDK.open);
}
}
