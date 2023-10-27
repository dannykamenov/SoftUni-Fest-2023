import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private toggleSubject = new BehaviorSubject<boolean>(false);
  toggle$ = this.toggleSubject.asObservable();

  constructor() { }

  toggleView() {
    this.toggleSubject.next(!this.toggleSubject.value);
  }
}
