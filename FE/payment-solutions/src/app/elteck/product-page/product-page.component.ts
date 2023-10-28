import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  isLoading = true;
  isNotLoading = false;
  productInfo: any;

  constructor(private api: ApiService, private router: Router) {
    this.api.getProduct(this.router.url.split('/')[2]).subscribe((res) => {
      this.productInfo = res;
      this.isLoading = false;
      this.isNotLoading = true;
    });
   }

}
