import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedSnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'OK', {
      duration,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top'
    });
  }

  showError(message: string, duration: number = 4000): void {
    this.snackBar.open(message, 'Dismiss', {
      duration,
      panelClass: ['snackbar-error'],
      verticalPosition: 'top'
    });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, '', {
      duration,
      panelClass: ['snackbar-info'],
      verticalPosition: 'top'
    });
  }
}