import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_ENDPOINT = environment.apiUrl;
  private authenticated = false;

  constructor(private http: HttpClient) {}

  /**
   * Login method - authenticates the user with provided credentials and tenant ID.
   * @param username - User's username
   * @param password - User's password
   * @param tenantId - Tenant ID (should be retrieved from the frontend form or other method)
   */
  login(username: string, password: string, tenantId: string): Observable<any> {
    return this.http
      .post(
        `${this.API_ENDPOINT}/api/auth/login`,
        { username, password, tenantId },
        { withCredentials: true }
      )
      .pipe(
        tap(() => {
          // Only store tenantId in localStorage
          localStorage.setItem('tenantId', tenantId);
  
          // Set authenticated flag to true after successful login
          this.authenticated = true;
        }),
        catchError((err) => {
          this.authenticated = false;
          return of(err); // Handle error and return observable
        })
      );
  }  

  /**
   * Checks if the user is authenticated by validating the token.
   */
  checkAuth(): Observable<boolean> {
    return this.http
      .get(`${this.API_ENDPOINT}/api/auth/validate-token`, { withCredentials: true })
      .pipe(
        map(() => {
          this.authenticated = true;
          return true;
        }),
        catchError(() => {
          this.authenticated = false;
          return of(false);
        })
      );
  }

  /**
   * Returns the authentication status of the user.
   */
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  /**
   * Logout method - Clears cookies and removes user data
   */
  logout(): Observable<any> {
    return this.http
      .post(`${this.API_ENDPOINT}/api/auth/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          // After logout, clear the token and other session data
          this.authenticated = false;
          localStorage.removeItem('token'); // Clear token stored in localStorage
          // You can also clear cookies here if needed
        })
      );
  }
}
