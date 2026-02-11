import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warehouse, WarehouseCreate } from '../models/warehouse.model';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/warehouses`;

    getAll(): Observable<Warehouse[]> {
        return this.http.get<Warehouse[]>(this.apiUrl);
    }

    create(warehouse: WarehouseCreate): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(this.apiUrl, warehouse);
    }
}
