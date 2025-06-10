import { Component } from '@angular/core';
import { ByUnicoSDK } from 'idpay-b2b-sdk';

@Component({
  selector: 'app-init',
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css',
})
export class InitComponent {
  Init(): void {
    const token = ''; // inserir o token

    ByUnicoSDK.init({
      env: 'uat',
      token,
    });
  }
}
