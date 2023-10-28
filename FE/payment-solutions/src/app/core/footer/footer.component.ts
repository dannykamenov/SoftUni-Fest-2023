import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  roleUser: boolean;
  roleBusiness: boolean;

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

    constructor(public authService: AuthService) { 
      if(localStorage.getItem('role') === 'user') {
        this.roleUser = true;
      }
      if(localStorage.getItem('role') === 'business') {
        this.roleBusiness = true;
      }
    }
}
