import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirebaseStorageService } from 'src/app/shared/services/firebase-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  isLoading = true;
  isNotLoading = false;
  imageUrls$: Observable<string[]>;

  constructor(private storageService: FirebaseStorageService) {
    this.imageUrls$ = this.storageService.getImageUrls();
    this.imageUrls$.subscribe(() => {
      this.isNotLoading = true;
      setTimeout(() => {this.isLoading = false}, 1000);
    });
  }

  searchBox(searchInput: NgModel) {
    const searchTerm = searchInput.value;
    searchInput.reset();
  }
}
