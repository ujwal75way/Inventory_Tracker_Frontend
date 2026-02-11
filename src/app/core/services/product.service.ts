import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductWithStock } from '../models/product.model';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/products`;

    create(product: Product): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(this.apiUrl, product);
    }

    getMyProducts(): Observable<ProductWithStock[]> {
        return this.http.get<ProductWithStock[]>(`${this.apiUrl}/my-products`);
    }

    getAll(): Observable<ProductWithStock[]> {
        return this.http.get<ProductWithStock[]>(this.apiUrl);
    }

    updatePrice(productId: number, price: number): Observable<{ message: string }> {
        return this.http.patch<{ message: string }>(`${this.apiUrl}/${productId}/price`, price);
    }
}
