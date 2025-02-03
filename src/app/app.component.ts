import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitComponent } from "./components/init/init.component";
import { OpenComponent } from './components/open/open.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InitComponent,OpenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poc-cbu-angular';
}
