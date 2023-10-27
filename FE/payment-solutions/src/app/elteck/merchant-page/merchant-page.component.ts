import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-merchant-page',
  templateUrl: './merchant-page.component.html',
  styleUrls: ['./merchant-page.component.scss']
})
export class MerchantPageComponent {

  merchantInfo: any;
  merchantOffers: any;
  isLoading = true;
  isNotLoading = false;

  constructor(private api: ApiService, private router: Router) {
    this.api.getMerchant(this.router.url.split('/')[2]).subscribe((res) => {
      this.merchantInfo = res[0];
      this.merchantOffers = res;
      this.isLoading = false;
      this.isNotLoading = true;
    });
   }


}
