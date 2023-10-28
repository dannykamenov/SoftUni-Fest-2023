import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { StripeCardNumberComponent, StripeService, StripeCardComponent } from 'ngx-stripe';
import {PaymentIntent, StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js'
import { NgxStripeModule } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

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

public elementsOptions: StripeElementsOptions = {
  locale: 'en',
};

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



  paymentForm: FormGroup = this.fb.group({
    name: ['John', [Validators.required]],
    email: ['john@gmail.com', [Validators.required]],
    amount: [100, [Validators.required, Validators.pattern(/d+/)]],
});


  constructor(private api: ApiService, private router: Router, private http: HttpClient, private fb: FormBuilder, private stripeService: StripeService) {
    this.api.getProduct(this.router.url.split('/')[2]).subscribe((res) => {
      this.productInfo = res;
      this.isLoading = false;
      this.isNotLoading = true;
    });
   }

   pay(): void {
    if (this.paymentForm.valid) {
      this.createPaymentIntent(this.paymentForm.get('amount').value)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.paymentForm.get('name').value,
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
            }
          }
        });
    } else {
      console.log(this.paymentForm);
    }
  }

createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${env.apiUrl}/create-payment-intent`,
      { amount }
    );
 }

}
