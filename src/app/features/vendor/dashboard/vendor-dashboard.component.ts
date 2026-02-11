import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../core/shared/material.module';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.css'
})
export class VendorDashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  totalProducts = 0;
  totalWarehouses = 0;

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.productService.getMyProducts().subscribe({
      next: (products) => {
        this.totalProducts = products.length;

        const warehouseSet = new Set<number>();
        products.forEach(product => {
          product.inventories?.forEach(inv => warehouseSet.add(inv.warehouseId));
        });
        this.totalWarehouses = warehouseSet.size;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        this.cdr.detectChanges();
      }
    });
  }
}
