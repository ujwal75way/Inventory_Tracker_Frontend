import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    InventoryView,
    InventoryCategorySummary,
    InventoryVendorSummary,
    LowStock,
    StockBalance
} from '../models/inventory.model';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/inventory`;

    getAll(
        search?: string,
        lowStock?: boolean,
        outOfStock?: boolean,
        page: number = 1,
        pageSize: number = 100
    ): Observable<InventoryView[]> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        if (search) {
            params = params.set('search', search);
        }
        if (lowStock !== undefined) {
            params = params.set('lowStock', lowStock.toString());
        }
        if (outOfStock !== undefined) {
            params = params.set('outOfStock', outOfStock.toString());
        }

        return this.http.get<InventoryView[]>(this.apiUrl, { params });
    }

    getCategorySummary(): Observable<InventoryCategorySummary[]> {
        return this.http.get<InventoryCategorySummary[]>(`${this.apiUrl}/group-by-category`);
    }

    getVendorSummary(): Observable<InventoryVendorSummary[]> {
        return this.http.get<InventoryVendorSummary[]>(`${this.apiUrl}/group-by-vendor`);
    }

    getStockBalance(): Observable<StockBalance[]> {
        return this.http.get<StockBalance[]>(`${this.apiUrl}/balance`);
    }

    getLowStock(): Observable<LowStock[]> {
        return this.http.get<LowStock[]>(`${this.apiUrl}/low-stock`);
    }
}
