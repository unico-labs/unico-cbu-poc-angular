import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitComponent } from "./components/init/init.component";
import { OpenComponent } from './components/open/open.component';
import { CloseComponent } from './components/close/close.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,InitComponent,OpenComponent,CloseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poc-cbu-angular';
}
