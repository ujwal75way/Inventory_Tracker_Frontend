import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../core/shared/material.module';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/shared/notification.service';
import { ProductWithStock, Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.css'
})
export class ProductCatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  products: ProductWithStock[] = [];
  editingProductId: number | null = null;
  editingPrice: number = 0;
  isLoading = false;

  isCreating = false;
  newProduct: Product = {
    sku: '',
    name: '',
    category: '',
    price: 0,
    reorderLevel: 10
  };

  displayedColumns = ['sku', 'name', 'category', 'price', 'stock', 'status'];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getMyProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.notificationService.error('Failed to load products');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleCreate(): void {
    this.isCreating = !this.isCreating;
    if (!this.isCreating) {
      this.resetNewProduct();
    }
  }

  resetNewProduct(): void {
    this.newProduct = {
      sku: '',
      name: '',
      category: '',
      price: 0,
      reorderLevel: 10
    };
  }

  isValidProduct(): boolean {
    return !!(this.newProduct.sku &&
      this.newProduct.name &&
      this.newProduct.category &&
      this.newProduct.price >= 0 &&
      this.newProduct.reorderLevel >= 0);
  }

  createProduct(): void {
    if (!this.isValidProduct()) return;

    this.isLoading = true;
    this.productService.create(this.newProduct).subscribe({
      next: (response) => {
        this.notificationService.success(response.message);
        this.toggleCreate();
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.notificationService.error(error.error?.message || 'Failed to create product');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  startEdit(product: ProductWithStock): void {
    this.editingProductId = product.id;
    this.editingPrice = product.price;
  }

  savePrice(product: ProductWithStock): void {
    if (this.editingPrice < 0) {
      this.notificationService.error('Price cannot be negative');
      return;
    }

    this.productService.updatePrice(product.id, this.editingPrice).subscribe({
      next: (response) => {
        product.price = this.editingPrice;
        this.notificationService.success(response.message);
        this.cancelEdit();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error updating price:', error);
        this.notificationService.error(error.error?.message || 'Failed to update price');
        this.cdr.detectChanges();
      }
    });
  }

  cancelEdit(): void {
    this.editingProductId = null;
    this.editingPrice = 0;
  }

  getProductStatus(product: ProductWithStock): 'available' | 'low' | 'out' {
    if (!product.inventories || product.inventories.length === 0) {
      return 'out';
    }

    const hasOutOfStock = product.inventories.some(inv => inv.isOutOfStock);
    const hasLowStock = product.inventories.some(inv => inv.isLowStock);

    if (hasOutOfStock) {
      return 'out';
    } else if (hasLowStock) {
      return 'low';
    }
    return 'available';
  }
}
