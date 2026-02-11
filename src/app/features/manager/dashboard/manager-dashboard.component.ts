import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../core/shared/material.module';
import { InventoryService } from '../../../core/services/inventory.service';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private cdr = inject(ChangeDetectorRef);

  totalItems = 0;
  lowStockCount = 0;
  outOfStockCount = 0;

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {

    this.inventoryService.getAll('', undefined, undefined, 1, 1000).subscribe({
      next: (items) => {
        this.totalItems = items?.length || 0;
        this.lowStockCount = items?.filter(item => item.isLowStock).length || 0;
        this.outOfStockCount = items?.filter(item => item.isOutOfStock).length || 0;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }
}
