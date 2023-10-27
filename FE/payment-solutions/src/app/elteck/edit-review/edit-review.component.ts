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

  review: Product = {
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
    this.api.getReview(this.router.url.split('/')[2]).subscribe((data: Product) => {
      this.review = data;
      this.getTitle = this.review.title;
      this.getContent = this.review.description;
    })
  }



  editReview(title: string, content: string) {
  }

}
