import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Product } from 'src/app/shared/services/review';
import {ApiService} from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.scss']
})
export class PostReviewComponent {

  error: string | undefined;

  constructor(private api: ApiService, public router: Router) { }


  postReview(title: string, description: string, price: number) {
    const auth = getAuth();
    const isVerified = auth.currentUser?.emailVerified;
    if (isVerified) {
      const review: Product = {
        title: title,
        description: description,
        email: auth.currentUser?.email,
        user: auth.currentUser?.displayName,
        uid: auth.currentUser?.uid,
        price: price,
        date: new Date().toISOString().slice(0, 10),
        photoURL: auth.currentUser?.photoURL
      };
      this.api.addProduct(review).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      alert('Please verify your email first!');
    }
  }

}
