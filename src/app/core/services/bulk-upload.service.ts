import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BulkUploadResult } from '../models/bulk-upload.model';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class BulkUploadService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/bulkupload`;

    upload(file: File): Observable<BulkUploadResult> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<BulkUploadResult>(`${this.apiUrl}/upload`, formData);
    }

    getSampleFile(): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/sample`, { responseType: 'blob' });
    }
}
