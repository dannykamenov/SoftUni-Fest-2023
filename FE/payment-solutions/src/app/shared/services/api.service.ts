import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './review';
import { getReview } from './getReview';
import { Observable, catchError, map, throwError } from 'rxjs';
import { getProduct } from './getProduct';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addProduct(product: Product) {
    return this.http.post<Product>('http://localhost:3000/api/upload-product', product).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    )
  }

  getProducts(uid: string | undefined) {
    return this.http.get<getProduct[]>(`http://localhost:3000/api/get-products?uid=${uid}`)
  }

  getLatestReviews() {
    return this.http.get<getReview[]>('https://elteck-production-server.onrender.com/api/latest?limit=3');
  }

  updateUserInfo(review: any) {
    console.log(review);
    return this.http.post<any>('http://localhost:3000/api/update', review);
  }

  getAverageRating() {
    return this.http.get<any>('https://elteck-production-server.onrender.com/api/average');
  }

  getMyReviews(uid: string | undefined) {
    return this.http.get<getReview[]>(`https://elteck-production-server.onrender.com/api/myreviews?uid=${uid}`);
  }

  deleteReview(_id: string) {
    return this.http.delete<getReview[]>(`http://localhost:3000/api/product/${_id}`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/api/product/${id}`);
  } 

  editProduct(id: string, product: any) {
    return this.http.put<Product>(`http://localhost:3000/api/product/${id}`, product);
  }

  getMerchants() {
    return this.http.get<any>('http://localhost:3000/api/merchants');
  }
}
