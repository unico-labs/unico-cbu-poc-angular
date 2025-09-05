import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {

  onModeSelect(mode: 'modal' | 'fullscreen' | 'iframe'): void {
    console.log(`*** MODE SELECTED: ${mode} ***`);
    
    const event = new CustomEvent('modeSelected', { 
      detail: { mode },
      bubbles: true 
    });
    document.dispatchEvent(event);
  }
}

