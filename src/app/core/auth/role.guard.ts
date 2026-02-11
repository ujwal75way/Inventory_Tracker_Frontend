import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from '../models/auth.model';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const requiredRole = route.data['role'] as Role;
    const userRole = authService.getRole();

    if (userRole === requiredRole) {
        return true;
    }


    if (userRole === Role.WarehouseManager) {
        router.navigate(['/manager/dashboard']);
    } else if (userRole === Role.Vendor) {
        router.navigate(['/vendor/dashboard']);
    } else {
        router.navigate(['/login']);
    }

    return false;
};
