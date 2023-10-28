import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReviewPageComponent } from './review-page/review-page.component';
import { PostReviewComponent } from './post-review/post-review.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { SearchComponent } from './search/search.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { NgxStripeModule } from 'ngx-stripe';



@NgModule({
  declarations: [
    ReviewPageComponent,
    PostReviewComponent,
    NotFoundComponent,
    EditReviewComponent,
    SearchComponent,
    MerchantPageComponent,
    ProductPageComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxStripeModule,
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    ReviewPageComponent,
    PostReviewComponent,
    NotFoundComponent,
    MerchantPageComponent,
    ProductPageComponent
  ]
})
export class ElteckModule { }
