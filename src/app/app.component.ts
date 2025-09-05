import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { IframeTestComponent } from './components/iframe-test/iframe-test.component';
import { ModalTestComponent } from './components/modal-test/modal-test.component';
import { FullscreenTestComponent } from './components/fullscreen-test/fullscreen-test.component';

type ScreenType = 'home' | 'iframe' | 'modal' | 'fullscreen';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HomeScreenComponent,
    IframeTestComponent,
    ModalTestComponent,
    FullscreenTestComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'poc-cbu-angular';
  
  currentScreen: ScreenType = 'home';

  private boundModeSelectHandler = this.handleModeSelect.bind(this);

  ngOnInit(): void {
    document.addEventListener('modeSelected', this.boundModeSelectHandler as EventListener);
    console.log('*** AppComponent initialized - Starting at HOME screen ***');
  }

  ngOnDestroy(): void {
    document.removeEventListener('modeSelected', this.boundModeSelectHandler as EventListener);
  }

  private handleModeSelect(event: Event): void {
    const customEvent = event as CustomEvent;
    const { mode } = customEvent.detail;
    console.log(`*** MODE SELECTED: ${mode} - Navigating from HOME ***`);
    this.currentScreen = mode;
  }

  handleBackToHome(): void {
    console.log('*** BACK TO HOME CALLED - Leaving current screen ***');
    this.currentScreen = 'home';
  }

  isCurrentScreen(screen: ScreenType): boolean {
    return this.currentScreen === screen;
  }
}
