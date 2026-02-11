
export enum Role {
    WarehouseManager = 1,
    Vendor = 2
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface AuthResponse {
    token: string;
    role: string;
    userId: number;
}

export interface DecodedToken {
    userId: string;
    email: string;
    role: string;
    exp: number;
    iat: number;

    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
}
