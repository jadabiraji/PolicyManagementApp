import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericLoadingService } from 'src/app/shared/services/generic-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: GenericLoadingService // Inject the loading service
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      tenantId: ['tenant-specific-id', Validators.required],  // Static tenant ID
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password, tenantId } = this.loginForm.value;

    // Show loader
    this.loadingService.show();

    this.authService.login(username, password, tenantId).subscribe({
      next: (response) => {
        this.loadingService.hide();  // Hide loader after response
        if (response) {
          this.router.navigate(['/policies']); // Navigate to policies after successful login
        } else {
          alert('Login failed');
        }
      },
      error: (err) => {
        this.loadingService.hide();  // Hide loader on error
        alert('Login failed');
        console.error(err);
      },
    });
  }
}
