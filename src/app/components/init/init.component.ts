import { Component } from '@angular/core';
//@ts-ignore
import { IDPaySDK } from 'idpay-b2b-sdk';


@Component({
  selector: 'app-init',
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'

})
export class InitComponent {
  Init(): void {

const token = '';

IDPaySDK.init({
  type: 'IFRAME',
  env: 'uat',
  token,
});
    console.log(IDPaySDK.init);

  };
}
