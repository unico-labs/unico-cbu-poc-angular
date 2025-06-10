import { Component } from '@angular/core';
import { ByUnicoSDK } from 'idpay-b2b-sdk';

@Component({
  selector: 'app-close',
  imports: [],
  templateUrl: './close.component.html',
  styleUrl: './close.component.css',
})
export class CloseComponent {
  close(): void {
    ByUnicoSDK.close();
  }
}
