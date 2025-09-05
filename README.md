<p align='center'>
  <a href='https://unico.io'>
    <img width='350' src='https://unico.io/wp-content/uploads/2024/05/idcloud-horizontal-color.svg'></img>
  </a>
</p>

<h1 align='center'>SDK Iframe</h1>

<div align='center'>
  
  ### UnicoSDK CBU Implementation POC in Angular
  
  <img width='350' src='https://static-00.iconduck.com/assets.00/angular-icon-2048x554-ogh7idu0.png'></img>
</div>

## 💻 Compatibility

### Minimum versions

- Angular 14 (The POC was developed with Standalone components. For lower versions with NgModule, adjustments need to be made)

### Compatible devices

- You can check the devices tested in our laboratories in <a href='https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/visao-geral#dispositivos-compativeis'>this</a> device list.


## ✨ Getting Started

To use by Unico through the UnicoSDK by Unico, the first step is to register the domains that will be used as hosts to display the iFrame of the user journey in by Unico.

Contact the person responsible for your integration project or Unico's support team to perform this configuration.

To start using CBU, it's necessary to install the UnicoSDK. It's worth noting that "by Unico" uses the same SDK employed in IDPay:

```javascript
$ npm install idpay-b2b-sdk or for this POC just run npm install
```

To be able to run it, you need to have a service account at Unico and a test environment registered by your project manager so you can create a process. After creating a process, you will receive a process ID and a Token in the response.

With this information, you should pass it within the Init and Open methods as shown below, then run npm start to start the POC.

Once done, you should click the Init button to start authentication and then Open to open the process and start the By Unico flow.


## ✨ Available Methods

init(options)
This method initializes the SDK by pre-loading assets, creating a smoother experience for the end user. At this moment, you need to send the token received as a result of CreateProcess.

<strong>Parameters:</strong>

options - is an object with the following configuration properties:

<strong>type</strong>

### The type of flow that will be initialized. In by Unico we use the "IFRAME" option.

<strong>token</strong>

### Receives the token from the created process. This token is important for us to authenticate the journey and ensure that only authorized domains use it (can be obtained when creating the process via API).

```javascript
import { ByUnicoSDK } from "idpay-b2b-sdk";

ByUnicoSDK.init({
  env: 'uat'// Only to be filled if it's a test environment.
  token,
});
```

---

<strong>open(options)</strong>
### This method opens the by Unico experience. For IFRAME type flow, this function displays the pre-loaded iframe and starts the messaging flow between the client page and the by Unico experience.

## Parameters:

<strong>options</strong> - is an object with configuration properties:

<strong>processId</strong>

### Receives the ID of the created process. This ID is important for us to obtain process details and perform the entire flow correctly (can be obtained when creating the process via API).

<strong>token</strong>

### Receives the token from the created process. This token is important for us to authenticate the journey and ensure that only authorized domains use it (can be obtained when creating the process via API).

<strong>onFinish(process)</strong>

### Receives a callback function that will be executed at the end of the by Unico journey, passing as argument the process object with the following data: { captureConcluded, concluded, id }

```javascript
const processId = '9bc22bac-1e64-49a5-94d6-9e4f8ec9a1bf';
```

```javascript
const process = {
  id: '9bc22bac-1e64-49a5-94d6-9e4f8ec9a1bf',
  concluded: true,
  captureConcluded: true
};
```

```javascript
const onFinishCallback = process => {
  console.log('Process', process);
}
```

```javascript
ByUnicoSDK.open({
  transactionId: processId,
  token: token,
  onFinish: onFinishCallback
});
```

---

## ✨ Link to our documentation: 

https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/controlando-a-experiencia/sdk#como-comecar
