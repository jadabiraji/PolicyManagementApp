import { Injectable } from '@angular/core';
import { PolicyManagementService } from 'src/app/shared/services/api/policy-management.service';
import { catchError, Observable } from 'rxjs';
import { GenericLoadingService } from 'src/app/shared/services/generic-loading.service';

@Injectable({
  providedIn: 'root',
})
export class PolicyFormService {
  constructor(
    private policyApiService: PolicyManagementService,
    private loadingService: GenericLoadingService
  ) {}

 
}
