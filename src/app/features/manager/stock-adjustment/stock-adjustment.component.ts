import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../core/shared/material.module';
import { StockService } from '../../../core/services/stock.service';
import { InventoryService } from '../../../core/services/inventory.service';
import { WarehouseService } from '../../../core/services/warehouse.service';
import { NotificationService } from '../../../core/shared/notification.service';
import { StockMovementType } from '../../../core/models/stock.model';
import { Warehouse } from '../../../core/models/warehouse.model';
import { ProductWithStock } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-stock-adjustment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './stock-adjustment.component.html',
  styleUrl: './stock-adjustment.component.css'
})
export class StockAdjustmentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private stockService = inject(StockService);
  private inventoryService = inject(InventoryService);
  private warehouseService = inject(WarehouseService);
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);

  StockMovementType = StockMovementType;
  stockForm: FormGroup;
  products: ProductWithStock[] = [];
  warehouses: Warehouse[] = [];
  showTargetWarehouse = false;
  isLoading = false;
  recentMovements$ = new BehaviorSubject<any[]>([]);

  constructor() {
    this.stockForm = this.fb.group({
      productId: [null, Validators.required],
      warehouseId: [null, Validators.required],
      movementType: [StockMovementType.StockIn, Validators.required],
      targetWarehouseId: [null],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  displayedColumns = ['date', 'product', 'type', 'quantity', 'warehouse', 'user'];

  ngOnInit(): void {
    this.loadProducts();
    this.loadWarehouses();
    this.loadRecentMovements();
  }

  loadRecentMovements(): void {
    this.stockService.getRecentMovements().subscribe({
      next: (data) => {
        this.recentMovements$.next(data || []);
      },
      error: (error: any) => {
        console.error('Error loading recent movements:', error);
      }
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.products = data;
        });
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.notificationService.error('Failed to load products');
      }
    });
  }

  loadWarehouses(): void {
    this.warehouseService.getAll().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.warehouses = data;
        });
      },
      error: (error: any) => {
        console.error('Error loading warehouses:', error);
        this.notificationService.error('Failed to load warehouses');
      }
    });
  }

  onMovementTypeChange(): void {
    const movementType = this.stockForm.get('movementType')?.value;
    this.showTargetWarehouse = movementType === StockMovementType.Transfer;

    if (this.showTargetWarehouse) {
      this.stockForm.get('targetWarehouseId')?.setValidators(Validators.required);
    } else {
      this.stockForm.get('targetWarehouseId')?.clearValidators();
      this.stockForm.get('targetWarehouseId')?.setValue(null);
    }
    this.stockForm.get('targetWarehouseId')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.stockForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.stockService.processStock(this.stockForm.value).subscribe({
      next: (response: any) => {
        setTimeout(() => {
          this.notificationService.success(response.message);
          this.stockForm.reset({
            movementType: StockMovementType.StockIn,
            quantity: 1
          });
          this.isLoading = false;
          this.loadRecentMovements();
        });
      },
      error: (error: any) => {
        setTimeout(() => {
          this.isLoading = false;
          const message = error.error?.message || 'Failed to process stock movement';
          this.notificationService.error(message);
        });
      }
    });
  }
}
