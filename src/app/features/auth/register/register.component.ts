import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../core/shared/material.module';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/shared/notification.service';
import { Role } from '../../../core/models/auth.model';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private notificationService = inject(NotificationService);

    Role = Role; // Expose enum to template
    registerForm: FormGroup;
    isLoading = false;

    constructor() {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: [Role.Vendor, Validators.required]
        });
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            return;
        }

        this.isLoading = true;

        this.authService.register(this.registerForm.value).subscribe({
            next: () => {
                this.isLoading = false;
                this.notificationService.success('Registration successful! Please login.');
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 1500);
            },
            error: (error) => {
                this.isLoading = false;
                const message = error.error?.message || 'Registration failed. Please try again.';
                this.notificationService.error(message);
            }
        });
    }
}
