import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PolicyManagementService } from 'src/app/shared/services/api/policy-management.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericLoadingService } from 'src/app/shared/services/generic-loading.service'; 

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
})
export class PolicyListComponent implements OnInit {
  policies: any[] = [];
  currentPage: number = 1;
  pageSize: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;

  constructor(
    private policyService: PolicyManagementService,
    private authService: AuthService,
    private router: Router,
    private loadingService: GenericLoadingService, 
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPolicies(this.currentPage); // Load policies on component init
  }

  loadPolicies(page: number): void {
    this.loadingService.show(); // Show the loading spinner

    this.policyService.getAllPolicies(page, this.pageSize).subscribe({
      next: (response) => {
        this.policies = response.data ?? response;
        this.totalCount = response.totalCount;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
        this.loadingService.hide(); // Hide the loading spinner once data is loaded
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (error) => {
        console.error('Failed to load policies', error);
        this.loadingService.hide(); // Hide the spinner in case of an error
      },
    });
  }

  // Method to handle page changes (Next and Previous)
  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return; // Avoid out of bounds
    this.loadPolicies(page);
  }

  // Method to delete a policy
  deletePolicy(id: number): void {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.policyService.deletePolicy(id).subscribe({
        next: () => {
          alert('Policy deleted successfully');
          this.loadPolicies(this.currentPage); // Refresh the list
        },
        error: (error) => {
          console.error('Failed to delete policy', error);
        },
      });
    }
  }

  // Method to handle logout
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}
