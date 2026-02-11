import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse, DecodedToken, Role } from '../models/auth.model';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private readonly TOKEN_KEY = 'auth_token';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor() {

        setTimeout(() => {
            this.isAuthenticatedSubject.next(this.isAuthenticated());
        }, 0);
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/auth/login`, credentials).pipe(
            tap(response => {
                this.setToken(response.token);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    register(data: RegisterRequest): Observable<AuthResponse> {

        return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/auth/register`, data);
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.isAuthenticatedSubject.next(false);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getDecodedToken(): DecodedToken | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }

        try {
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            return decoded as DecodedToken;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    getUserId(): number | null {
        const decoded = this.getDecodedToken();
        if (!decoded) {
            return null;
        }


        const userId = decoded.userId || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return userId ? parseInt(userId, 10) : null;
    }

    getRole(): Role | null {
        const decoded = this.getDecodedToken();
        if (!decoded) {
            return null;
        }


        const role = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (!role) {
            return null;
        }


        if (role === 'WarehouseManager') {
            return Role.WarehouseManager;
        } else if (role === 'Vendor') {
            return Role.Vendor;
        }

        return null;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        const decoded = this.getDecodedToken();
        if (!decoded) {
            return false;
        }


        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
    }

    private setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
}
