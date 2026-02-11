import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../core/shared/material.module';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/shared/notification.service';
import { Role } from '../../../core/models/auth.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private notificationService = inject(NotificationService);

    loginForm: FormGroup;
    isLoading = false;

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;

        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.isLoading = false;
                const role = this.authService.getRole();
                this.notificationService.success('Login successful!');


                if (role === Role.WarehouseManager) {
                    this.router.navigate(['/manager/dashboard']);
                } else if (role === Role.Vendor) {
                    this.router.navigate(['/vendor/dashboard']);
                } else {
                    this.router.navigate(['/']);
                }
            },
            error: (error) => {
                this.isLoading = false;
                const message = error.error?.message || 'Login failed. Please check your credentials.';
                this.notificationService.error(message);
            }
        });
    }
}
