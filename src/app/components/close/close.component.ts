import { Component } from '@angular/core';
//@ts-ignore
import { UnicoSDK } from 'idpay-b2b-sdk/index.js';

@Component({
  selector: 'app-close',
  imports: [],
  templateUrl: './close.component.html',
  styleUrl: './close.component.css'
})
export class CloseComponent {
  close(): void {

    UnicoSDK.close();
  
};
}
