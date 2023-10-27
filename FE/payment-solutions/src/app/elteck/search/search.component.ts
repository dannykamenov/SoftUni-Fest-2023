import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
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
  merchants: any;

  constructor(private storageService: FirebaseStorageService, private api: ApiService) {
    this.api.getMerchants().subscribe((res) => {
      this.isNotLoading = true;
      this.merchants = res;
      console.log(this.merchants);
      setTimeout(() => {this.isLoading = false}, 1000);
    });
  }

  searchBox(searchInput: NgModel) {
    const searchTerm = searchInput.value;
    this.api.searchMerchants(searchTerm).subscribe((res) => {
      this.merchants = res;
    });
    searchInput.reset();
  }
}
