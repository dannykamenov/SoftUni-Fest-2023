import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent {
  isLoading = true;
  isNotLoading = false;
  reviews: any;
  stars: undefined | number[] = [1, 2, 3, 4, 5];
  currentUserId: string | undefined;
  noReviews = false;
  payments: any;

    constructor(private api: ApiService, private router: Router) { 
      const auth = getAuth();
      this.api.getProducts(auth.currentUser?.uid).subscribe((res) => {
        this.reviews = res;
        this.isNotLoading = true;
        setTimeout(() => {this.isLoading = false}, 1000);
        const auth = getAuth();
        this.currentUserId = auth.currentUser?.uid;
        if(this.reviews.length === 0) {
          this.noReviews = true;
        }
      });
      this.api.getPaymentDetails(auth.currentUser?.uid).subscribe((res) => {
        this.payments = res;
      });
    }

    ownerChecker(uid: string | undefined) {
      if(uid === this.currentUserId) {
        return true;
      } else {
        return false;
      }
    }

    deleteMyProduct(id: string) {
      const agree = confirm('Are you sure you want to delete this review?');
      if(agree) {
        this.api.deleteProduct(id).subscribe((res) => {
          //refresh page
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/products']);
          });
        });
      } else {
        return;
      }
    }
}
