import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { getReview } from 'src/app/shared/services/getReview';
import { ToggleService } from 'src/app/shared/services/toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  isToggled: boolean;

    constructor(private api: ApiService, private router: Router, private toggleService: ToggleService) { 
    }
  
  ngOnInit() {
    this.toggleService.toggle$.subscribe(value => {
      this.isToggled = value;
    });
  }
  
}
