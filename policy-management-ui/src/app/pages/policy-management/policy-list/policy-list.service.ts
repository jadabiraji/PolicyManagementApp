import { Injectable } from '@angular/core';
import { PolicyManagementService } from 'src/app/shared/services/api/policy-management.service';
import { catchError, Observable } from 'rxjs';
import { GenericLoadingService } from 'src/app/shared/services/generic-loading.service';

@Injectable({
  providedIn: 'root',
})
export class PolicyListService {
  constructor(
    private policyApiService: PolicyManagementService,
    private loadingService: GenericLoadingService
  ) {}

  // API call to load policies without pagination logic
  loadPolicies(page: number, pageSize: number): Observable<any> {
    this.loadingService.show(); // Show loading spinner

    return this.policyApiService.getAllPolicies(page, pageSize).pipe(
      catchError((error) => {
        console.error('Failed to load policies', error);
        this.loadingService.hide(); // Hide loading spinner in case of error
        throw error;
      })
    );
  }

  // Delete a policy
  deletePolicy(id: number): Observable<any> {
    return this.policyApiService.deletePolicy(id).pipe(
      catchError((error) => {
        console.error('Failed to delete policy', error);
        throw error;
      })
    );
  }
}
