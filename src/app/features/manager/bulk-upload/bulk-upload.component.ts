import { Component, inject, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../core/shared/material.module';
import { BulkUploadService } from '../../../core/services/bulk-upload.service';
import { NotificationService } from '../../../core/shared/notification.service';
import { BulkUploadResult } from '../../../core/models/bulk-upload.model';

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './bulk-upload.component.html',
  styleUrl: './bulk-upload.component.css'
})
export class BulkUploadComponent {
  private bulkUploadService = inject(BulkUploadService);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  selectedFile = signal<File | null>(null);
  uploadResult = signal<BulkUploadResult | null>(null);
  isUploading = signal(false);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
      this.uploadResult.set(null);
    }
  }

  clearFile(): void {
    this.selectedFile.set(null);
    this.uploadResult.set(null);
  }

  uploadFile(): void {
    const file = this.selectedFile();
    if (!file) {
      return;
    }

    this.isUploading.set(true);

    this.bulkUploadService.upload(file).subscribe({
      next: (result) => {
        // Deferring the update to the next microtask/cycle to avoid NG0100
        setTimeout(() => {
          this.uploadResult.set(result);
          this.isUploading.set(false);

          if (result.failed === 0) {
            this.notificationService.success('All rows uploaded successfully!');
          } else {
            this.notificationService.info(`Upload completed with ${result.failed} errors`);
          }
          // Manual trigger as an extra safety measure
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        setTimeout(() => {
          this.isUploading.set(false);
          const message = error.error?.message || 'Failed to upload file';
          this.notificationService.error(message);
          this.cdr.detectChanges();
        });
      }
    });
  }

  downloadSample(): void {
    this.bulkUploadService.getSampleFile().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Inventory_Sample.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading sample:', error);
        this.notificationService.error('Failed to download sample file');
      }
    });
  }
}
