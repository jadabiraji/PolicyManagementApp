import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericLoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Observable to be used in components
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }

  toggle(): void {
    this.loadingSubject.next(!this.loadingSubject.value);
  }
}
