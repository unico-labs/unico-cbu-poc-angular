import { Component } from '@angular/core';
//@ts-ignore
import { IDPaySDK } from 'idpay-b2b-sdk';

@Component({
  selector: 'app-open',
  imports: [],
  templateUrl: './open.component.html',
  styleUrl: './open.component.css'
})
export class OpenComponent {
open(): void {
  const processId = '';
  const token = '';

  const process = {
    id: '',
    concluded: true,
    captureConcluded: true
  };
  
  const onFinishCallback = (process: any) => {
    console.log('Process', process);
  };

  IDPaySDK.open({
    transactionId: processId,
    token: token,
    onFinish: onFinishCallback
  });
  console.log(IDPaySDK.open);
}
}
