import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { ErrorHandlerService } from '../error-handler.service';

//=========================== REQUEST ===========================//
import { PolicyCreateRequest } from '../../models/http/policy-management/policy-create/policy-create-request.model';
import { PolicyUpdateRequest } from '../../models/http/policy-management/policy-update/policy-update-request.model';
//=========================== RESPONSE ===========================//
import { PolicyGetResponse } from '../../models/http/policy-management/policy-get/policy-get-response.model';
import { PolicyCreateResponse } from '../../models/http/policy-management/policy-create/policy-create-response.model';
import { PolicyDeleteResponse } from '../../models/http/policy-management/policy-delete/policy-delete-response.model';
import { PolicyGetByIdResponse } from '../../models/http/policy-management/policy-get-by-id/policy-get-by-id-response.model';
import { PolicyUpdateResponse } from '../../models/http/policy-management/policy-update/policy-update-response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PolicyType } from '../../models/common/policy-type.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyManagementService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService
  ) {}

  private get baseUrl(): string {
    return `${this.authService.API_ENDPOINT}/api/policies`;
  }

  getAllPolicies(page: number, pageSize: number): Observable<PolicyGetResponse> {
    return this.http.get<PolicyGetResponse>(`${this.baseUrl}`, {
      params: {
        page: page.toString(),      // Sending the page number as a query parameter
        pageSize: pageSize.toString(),  // Sending the page size as a query parameter
      },
    }).pipe(
      catchError(this.errorHandler.handleError) // Error handling
    );
  }

  getPolicyById(id: number): Observable<PolicyGetByIdResponse> {
    return this.http.get<PolicyGetByIdResponse>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  createPolicy(request: PolicyCreateRequest): Observable<PolicyCreateResponse> {
    return this.http.post<PolicyCreateResponse>(`${this.baseUrl}`, request)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updatePolicy(id: number, request: PolicyUpdateRequest): Observable<PolicyUpdateResponse> {
    return this.http.put<PolicyUpdateResponse>(`${this.baseUrl}/${id}`, request)
      .pipe(catchError(this.errorHandler.handleError));
  }

  deletePolicy(id: number): Observable<PolicyDeleteResponse> {
    return this.http.delete<PolicyDeleteResponse>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getPolicyTypes(): Observable<PolicyType[]> {
    return this.http
      .get<PolicyType[]>(`${this.authService.API_ENDPOINT}/api/policy-types`)
      .pipe(catchError(this.errorHandler.handleError));
  }
  
}
