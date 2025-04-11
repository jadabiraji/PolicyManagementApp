import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() {}

  /**
   * Example of a shared utility method (add more as needed)
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US').format(date);
  }
}
