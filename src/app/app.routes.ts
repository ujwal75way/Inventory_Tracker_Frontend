import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { Role } from './core/models/auth.model';


import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';


import { ManagerDashboardComponent } from './features/manager/dashboard/manager-dashboard.component';
import { InventoryListComponent } from './features/manager/inventory/inventory-list.component';
import { StockAdjustmentComponent } from './features/manager/stock-adjustment/stock-adjustment.component';
import { BulkUploadComponent } from './features/manager/bulk-upload/bulk-upload.component';
import { ReportsComponent } from './features/manager/reports/reports.component';
import { WarehouseListComponent } from './features/manager/warehouses/warehouse-list.component';


import { VendorDashboardComponent } from './features/vendor/dashboard/vendor-dashboard.component';
import { ProductCatalogComponent } from './features/vendor/product-catalog/product-catalog.component';
import { PerformanceComponent } from './features/vendor/performance/performance.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'manager',
        canActivate: [authGuard, roleGuard],
        data: { role: Role.WarehouseManager },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: ManagerDashboardComponent
            },
            {
                path: 'inventory',
                component: InventoryListComponent
            },
            {
                path: 'stock-adjustment',
                component: StockAdjustmentComponent
            },
            {
                path: 'bulk-upload',
                component: BulkUploadComponent
            },
            {
                path: 'reports',
                component: ReportsComponent
            },
            {
                path: 'warehouses',
                component: WarehouseListComponent
            }
        ]
    },
    {
        path: 'vendor',
        canActivate: [authGuard, roleGuard],
        data: { role: Role.Vendor },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: VendorDashboardComponent
            },
            {
                path: 'product-catalog',
                component: ProductCatalogComponent
            },
            {
                path: 'performance',
                component: PerformanceComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
