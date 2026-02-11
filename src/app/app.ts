import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { MaterialModule } from './core/shared/material.module';
import { AuthService } from './core/auth/auth.service';
import { Role } from './core/models/auth.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isAuthenticated = false;
  userRole: Role | null = null;
  Role = Role; // Expose enum to template

  ngOnInit(): void {

    this.authService.isAuthenticated$.subscribe(isAuth => {
      setTimeout(() => {
        this.isAuthenticated = isAuth;
        if (isAuth) {
          this.userRole = this.authService.getRole();
        } else {
          this.userRole = null;
        }
        this.cdr.detectChanges();
      }, 0);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
