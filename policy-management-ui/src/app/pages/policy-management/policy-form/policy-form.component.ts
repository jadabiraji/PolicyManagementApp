import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PolicyType } from 'src/app/shared/models/common/policy-type.model';
import { PolicyManagementService } from 'src/app/shared/services/api/policy-management.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
})
export class PolicyFormComponent implements OnInit {
  policyForm!: FormGroup;
  isEditMode = false;
  policyId!: number;
  policyTypes: PolicyType[] = [];
  tenantId: string = ''; // To store the tenantId

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private policyService: PolicyManagementService
  ) {}

  ngOnInit(): void {
    // Fetch the tenantId from localStorage or session
    this.tenantId = localStorage.getItem('tenantId') || ''; // Default to an empty string if not available
    
    // Initialize the form with necessary validations
    this.policyForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      creationDate: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      policyTypeId: ['', Validators.required],
    });

    // If editing an existing policy, get the policy ID from route params
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.policyId = +params['id'];
        this.loadPolicy(this.policyId);
      }
    });

    // Load policy types from the service
    this.loadPolicyTypes();
  }

  loadPolicyTypes(): void {
    this.policyService.getPolicyTypes().subscribe({
      next: (types: PolicyType[]) => {
        this.policyTypes = types;
      },
      error: (err) => {
        console.error('Failed to load policy types', err);
      }
    });
  }

  loadPolicy(id: number): void {
    this.policyService.getPolicyById(id).subscribe((res: any) => {
      const policy = res?.data ?? res;

      const formattedPolicy = {
        name: policy.name,
        description: policy.description,
        creationDate: this.convertToDateInput(policy.creationDate),
        effectiveDate: this.convertToDateInput(policy.effectiveDate),
        expiryDate: this.convertToDateInput(policy.expiryDate),
        policyTypeId: policy.policyTypeId, // Set the policyTypeId
      };

      this.policyForm.patchValue(formattedPolicy);
    });
  }

  convertToDateInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10); // Convert the date to YYYY-MM-DD format
  }

  onSubmit(): void {
    if (this.policyForm.invalid) return;

    const formData = {
      id: this.policyId,
      tenantId: this.tenantId, // Add the tenantId to the request
      ...this.policyForm.value,
    };

    // Decide whether to create or update the policy based on the mode
    if (this.isEditMode) {
      this.policyService.updatePolicy(this.policyId, formData).subscribe(() => {
        alert('Policy updated successfully');
      });
    } else {
      this.policyService.createPolicy(formData).subscribe(() => {
        alert('Policy created successfully');
        this.policyForm.reset();
      });
    }
  }
}