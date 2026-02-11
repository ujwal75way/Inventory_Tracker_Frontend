import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../core/shared/material.module';
import { StockService } from '../../../core/services/stock.service';

@Component({
    selector: 'app-performance',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: './performance.component.html',
    styleUrl: './performance.component.css'
})
export class PerformanceComponent implements OnInit {
    private stockService = inject(StockService);

    totalMovements = 0;
    totalStockIn = 0;
    totalStockOut = 0;

    ngOnInit() {
        this.loadStats();
    }

    loadStats() {
        this.stockService.getVendorPerformance().subscribe({
            next: (data) => {
                this.totalMovements = data.totalMovements;
                this.totalStockIn = data.totalStockIn;
                this.totalStockOut = data.totalStockOut;
            },
            error: (error) => {
                console.error('Error loading performance stats:', error);
            }
        });
    }
}
