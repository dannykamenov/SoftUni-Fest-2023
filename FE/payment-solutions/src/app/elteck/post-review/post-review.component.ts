import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Product } from 'src/app/shared/services/review';
import {ApiService} from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.scss']
})
export class PostReviewComponent {

  error: string | undefined;
  public file: any;

  constructor(private api: ApiService, public router: Router, public storage: AngularFireStorage) { }

  detectFiles(event: any) {
    this.file = event.target.files[0];
  }


  postReview(title: string, description: string, price: number) {
    const auth = getAuth();
    const isVerified = auth.currentUser?.emailVerified;
    // upload unique product photo
    const storageRef = this.storage.ref(`products/${auth.currentUser?.uid}/${this.file.name}`);
    const uploadTask = this.storage.upload(`products/${auth.currentUser?.uid}/${this.file.name}`, this.file);
    uploadTask.percentageChanges().subscribe((percentage) => {
    });
    uploadTask.then((res) => {
      res.ref.getDownloadURL().then((url) => {
        if (isVerified) {
          const review: Product = {
            title: title,
            description: description,
            email: auth.currentUser?.email,
            user: auth.currentUser?.displayName,
            uid: auth.currentUser?.uid,
            price: price,
            date: new Date().toISOString().slice(0, 10),
            photoURL: auth.currentUser?.photoURL,
            productPhoto: url,
          };
          this.api.addProduct(review).subscribe(() => {
            this.router.navigate(['/']);
          });
        } else {
          alert('Please verify your email first!');
        }
      });
    });
  }

}
