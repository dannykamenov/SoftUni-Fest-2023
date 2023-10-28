import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { StripeCardNumberComponent } from 'ngx-stripe';
import {StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js'
import { NgxStripeModule } from 'ngx-stripe';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  isLoading = true;
  isNotLoading = false;
  productInfo: any;

@ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontWeight: 400,
        fontFamily: 'Circular',
        fontSize: '14px',
        iconColor: '#666EE8',
        color: '#002333',
        '::placeholder': {
          color: '#919191',
        },
      },
    },
  };

public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };


  constructor(private api: ApiService, private router: Router) {
    this.api.getProduct(this.router.url.split('/')[2]).subscribe((res) => {
      this.productInfo = res;
      this.isLoading = false;
      this.isNotLoading = true;
    });
   }

}
