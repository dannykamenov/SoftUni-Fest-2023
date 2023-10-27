import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToggleService } from 'src/app/shared/services/toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  menuActive: boolean = false;
  opacityActive: boolean = true;
  isBusiness: boolean = false;

  @Output() isBusinessChange = new EventEmitter<boolean>();

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

    constructor(public authService: AuthService, private toggleService: ToggleService) { 
    }

  menuToggle() {
    this.menuActive = !this.menuActive;
    this.opacityActive = !this.opacityActive;
  }

  clientChange() {
    this.toggleService.toggleView();
  }
}
