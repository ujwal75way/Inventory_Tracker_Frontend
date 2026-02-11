import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../core/shared/material.module';
import { InventoryService } from '../../../core/services/inventory.service';
import { LowStock, StockBalance } from '../../../core/models/inventory.model';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatTabGroup, MatTab],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private cdr = inject(ChangeDetectorRef);

  lowStockItems: LowStock[] = [];
  stockBalance: StockBalance[] = [];
  isLoadingLowStock = false;
  isLoadingBalance = false;

  lowStockColumns = ['sku', 'productName', 'warehouse', 'currentQuantity', 'reorderLevel'];
  balanceColumns = ['sku', 'productName', 'warehouse', 'availableQuantity'];

  ngOnInit(): void {
    this.loadLowStock();
    this.loadStockBalance();
  }

  loadLowStock(): void {
    this.isLoadingLowStock = true;
    this.inventoryService.getLowStock().subscribe({
      next: (data) => {
        this.lowStockItems = data || [];
        this.isLoadingLowStock = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading low stock:', error);
        this.isLoadingLowStock = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadStockBalance(): void {
    this.isLoadingBalance = true;
    this.inventoryService.getStockBalance().subscribe({
      next: (data) => {
        this.stockBalance = data || [];
        this.isLoadingBalance = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading stock balance:', error);
        this.isLoadingBalance = false;
        this.cdr.detectChanges();
      }
    });
  }
}
