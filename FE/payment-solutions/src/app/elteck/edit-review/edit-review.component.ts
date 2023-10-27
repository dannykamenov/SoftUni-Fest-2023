import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { ApiService } from 'src/app/shared/services/api.service';
import { Product } from 'src/app/shared/services/review';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent {


  error: string = '';
  getTitle: string = '';
  getContent: string = '';
  getPrice: number = 0;

  product: Product = {
    title: '',
    description: '',
    user: '',
    email: '',
    date: '',
    uid: '',
    price: 0,
    photoURL: ''
  }


  constructor(private api: ApiService, public router: Router) { 
    this.api.getProduct(this.router.url.split('/')[2]).subscribe((data: Product) => {
      this.product = data;
      console.log(this.product);
      this.getTitle = this.product.title;
      this.getContent = this.product.description;
      this.getPrice = this.product.price;
    })
  }



  editReview(title: string, content: string, price: number) {
  }

}
