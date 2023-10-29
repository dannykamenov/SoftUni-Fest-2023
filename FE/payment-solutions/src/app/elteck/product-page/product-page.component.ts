import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import {
  StripeCardNumberComponent,
  StripeService,
  StripeCardComponent,
  StripeCardExpiryComponent,
  StripeCardCvcComponent,
} from 'ngx-stripe';
import {
  PaymentIntent,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { NgxStripeModule } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { secret } from 'src/environments/stripeSecret';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  constructor(
    private api: ApiService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {
    this.api.getProduct(this.router.url.split('/')[2]).subscribe((res) => {
      this.productInfo = res;
      this.isLoading = false;
      this.isNotLoading = true;
      this.price = res.price;
      this.paymentForm.patchValue({
        amount: this.price
    });
    });
  }
  price: number = 0;
  isLoading = true;
  isNotLoading = false;
  productInfo: any;
  showPaymentForm: boolean = false;
  paymentError: string = '';
  isSuccess: boolean = false;

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  public cardOptions: StripeCardElementOptions = {
    style: {
        base: {
            fontWeight: 500,          
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '18px',          
            iconColor: '#666EE8',
            color: '#002333',        
            '::placeholder': {
                color: '#919191',
                fontSize: '16px',        
            },
        },
    },
};

  paymentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    amount: [{ value: this.price, disabled: true }, [Validators.required]],
  });

  pay(): void {
    if (this.paymentForm.valid) {
      this.createPaymentIntent(this.paymentForm.get('amount').value)
        .pipe(
          switchMap((pi: any) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.paymentForm.get('name').value,
                  email: this.paymentForm.get('email').value,                 
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            this.paymentError = result.error.message;
          } else {
            console.log(result.paymentIntent.status);
            if (result.paymentIntent.status === 'succeeded') {
              this.isSuccess = true;
              const auth = getAuth();
              const user = auth.currentUser;
              const paymentDetails = {
                user: user?.uid,
                merchant: this.productInfo.uid,
                productName: this.productInfo.title,
                price: this.productInfo.price,
                date: new Date().toLocaleString(),
              }
              this.api.paymentDetails(paymentDetails).subscribe((res) => {
              });
            }
          }
        });
    } else {
      console.log(this.paymentForm);
    }
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `http://localhost:3000/api/create-payment-intent`,
      { amount }
    );
  }

  createCoinbaseCharge(product: any) {
    const auth = getAuth();
    const user = auth.currentUser;
    return this.http.post<any>(
      `http://localhost:3000/api/create-coinbase-charge`,
      { product, user }
    );
  }

  redirectToCoinbase(product: any) {
    this.createCoinbaseCharge(product).subscribe(
      (res) => {
        if (res && res.data && res.data.hosted_url) {
          window.location.href = res.data.hosted_url;
        } else {
          console.log('Failed to generate Coinbase payment URL');
        }
      },
      (error) => {
        console.error('Error creating Coinbase charge:', error);
      }
    );
  }

  showCardPayment() {
    this.showPaymentForm = true;
  }

  closeCreditPayment() {
    this.showPaymentForm = false;
  }
}
