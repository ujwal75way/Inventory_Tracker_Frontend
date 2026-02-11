import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockRequest } from '../models/stock.model';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/stock`;

    processStock(request: StockRequest): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(this.apiUrl, request);
    }

    getVendorPerformance(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/vendor-performance`);
    }

    getRecentMovements(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/recent`);
    }
}
