import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getReview } from 'src/app/shared/services/getReview';
import { ToggleService } from 'src/app/shared/services/toggle.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  isToggled: boolean;
  userRole: boolean;

    constructor(private api: ApiService, private router: Router, private toggleService: ToggleService, private authService: AuthService) { 
      if(localStorage.getItem('role')) {
        this.userRole = true;
      }
    }
  
  ngOnInit() {
    this.toggleService.toggle$.subscribe(value => {
      this.isToggled = value;
    });
  }
  
}
