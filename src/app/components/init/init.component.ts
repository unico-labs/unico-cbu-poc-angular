import { Component } from '@angular/core';
//@ts-ignore
import { UnicoSDK } from 'idpay-b2b-sdk/index.js';


@Component({
  selector: 'app-init',
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'

})
export class InitComponent {
  Init(): void {

const token = '';

UnicoSDK.init({
  type: 'IFRAME',
  env: 'uat',
  token,
});
    console.log(UnicoSDK.init);

  };
}
