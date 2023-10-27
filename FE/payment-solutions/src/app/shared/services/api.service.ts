import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './review';
import { getReview } from './getReview';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addProduct(product: Product) {
    return this.http.post<Product>('https://elteck-production-server.onrender.com/api/upload-product', product).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    )
  }

  getReviews() {
    return this.http.get<getReview[]>('https://elteck-production-server.onrender.com/api/reviews');
  }

  getLatestReviews() {
    return this.http.get<getReview[]>('https://elteck-production-server.onrender.com/api/latest?limit=3');
  }

  updateUserInfo(review: any) {
    return this.http.post<Product>('https://elteck-production-server.onrender.com/api/update', review);
  }

  getAverageRating() {
    return this.http.get<any>('https://elteck-production-server.onrender.com/api/average');
  }

  getMyReviews(uid: string | undefined) {
    return this.http.get<getReview[]>(`https://elteck-production-server.onrender.com/api/myreviews?uid=${uid}`);
  }

  deleteReview(_id: string) {
    return this.http.delete<getReview[]>(`https://elteck-production-server.onrender.com/api/reviews/${_id}`);
  }

  getReview(id: string) {
    return this.http.get<Product>(`https://elteck-production-server.onrender.com/api/reviews/${id}`);
  } 

  updateReview(review: any) {
    return this.http.put<Product>(`https://elteck-production-server.onrender.com/api/reviews/${review.id}`, review);
  }
}
