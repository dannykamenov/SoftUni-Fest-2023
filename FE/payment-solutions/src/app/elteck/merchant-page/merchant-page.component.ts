import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-merchant-page',
  templateUrl: './merchant-page.component.html',
  styleUrls: ['./merchant-page.component.scss']
})
export class MerchantPageComponent {

  constructor(private api: ApiService, private router: Router) {
    this.api.getMerchant(this.router.url.split('/')[2]).subscribe((res) => {
      console.log(res);
    });
   }


}
