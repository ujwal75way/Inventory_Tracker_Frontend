import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../core/shared/material.module';
import { WarehouseService } from '../../../core/services/warehouse.service';
import { NotificationService } from '../../../core/shared/notification.service';
import { Warehouse } from '../../../core/models/warehouse.model';

@Component({
    selector: 'app-warehouse-list',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
    templateUrl: './warehouse-list.component.html',
    styleUrl: './warehouse-list.component.css'
})
export class WarehouseListComponent implements OnInit {
    private warehouseService = inject(WarehouseService);
    private notificationService = inject(NotificationService);
    private fb = inject(FormBuilder);
    private cdr = inject(ChangeDetectorRef);

    warehouses: Warehouse[] = [];
    isLoading = false;
    isCreating = false;
    warehouseForm: FormGroup;

    displayedColumns = ['id', 'name', 'location'];

    constructor() {
        this.warehouseForm = this.fb.group({
            name: ['', Validators.required],
            location: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadWarehouses();
    }

    loadWarehouses(): void {
        this.isLoading = true;
        this.warehouseService.getAll().subscribe({
            next: (data) => {
                this.warehouses = data;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error loading warehouses:', error);
                this.notificationService.error('Failed to load warehouses');
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    toggleCreate(): void {
        this.isCreating = !this.isCreating;
        if (!this.isCreating) {
            this.warehouseForm.reset();
        }
    }

    onSubmit(): void {
        if (this.warehouseForm.invalid) return;

        this.isLoading = true;
        this.warehouseService.create(this.warehouseForm.value).subscribe({
            next: (response) => {
                this.notificationService.success(response.message);
                this.isCreating = false;
                this.warehouseForm.reset();
                this.loadWarehouses();
            },
            error: (error) => {
                console.error('Error creating warehouse:', error);
                this.notificationService.error(error.error?.message || 'Failed to create warehouse');
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }
}
