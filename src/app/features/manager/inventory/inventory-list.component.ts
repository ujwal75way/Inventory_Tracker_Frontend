import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../core/shared/material.module';
import { InventoryService } from '../../../core/services/inventory.service';
import { InventoryView } from '../../../core/models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  inventory: InventoryView[] = [];
  filteredInventory: InventoryView[] = [];
  searchControl = new FormControl('');
  groupBy: 'none' | 'category' | 'vendor' = 'none';
  isLoading = false;

  displayedColumns = ['sku', 'productName', 'category', 'warehouse', 'quantity', 'reorderLevel', 'status'];

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchControl.setValue(params['search']);
      }
      if (params['groupBy']) {
        this.groupBy = params['groupBy'];
      }
    });

    this.loadInventory();


    this.searchControl.valueChanges.subscribe(searchTerm => {
      this.updateQueryParams();
      this.filterInventory();
    });
  }

  loadInventory(): void {
    this.isLoading = true;
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.inventory = data || []; // Handle null/undefined data
        this.filterInventory();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading inventory:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filterInventory(): void {
    const searchTerm = this.searchControl.value || '';

    if (searchTerm.trim() === '') {
      this.filteredInventory = [...this.inventory];
    } else {
      this.filteredInventory = this.inventory.filter(item =>
        (item.sku?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (item.productName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (item.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }
  }

  setGroupBy(type: 'none' | 'category' | 'vendor'): void {
    this.groupBy = type;
    this.updateQueryParams();

    if (type === 'category') {
      this.loadCategorySummary();
    } else if (type === 'vendor') {
      this.loadVendorSummary();
    } else {
      this.loadInventory();
    }
  }

  loadCategorySummary(): void {
    this.isLoading = true;
    this.inventoryService.getCategorySummary().subscribe({
      next: (data) => {
        console.log('Category summary:', data);
        this.isLoading = false;

        this.loadInventory();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading category summary:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadVendorSummary(): void {
    this.isLoading = true;
    this.inventoryService.getVendorSummary().subscribe({
      next: (data) => {
        console.log('Vendor summary:', data);
        this.isLoading = false;

        this.loadInventory();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading vendor summary:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchControl.value || null,
        groupBy: this.groupBy !== 'none' ? this.groupBy : null
      },
      queryParamsHandling: 'merge'
    });
  }
}
