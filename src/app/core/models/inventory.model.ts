
export interface InventoryView {
    productId: number;
    productName: string;
    sku: string;
    category: string;
    warehouseId: number;
    warehouseName: string;
    quantity: number;
    reorderLevel: number;
    isLowStock: boolean;
    isOutOfStock: boolean;
}

export interface InventoryCategorySummary {
    category: string;
    totalProducts: number;
    totalQuantity: number;
    lowStockCount: number;
    outOfStockCount: number;
}

export interface InventoryVendorSummary {
    vendorId: number;
    vendorName: string;
    totalProducts: number;
    totalQuantity: number;
    lowStockCount: number;
    outOfStockCount: number;
}

export interface LowStock {
    productId: number;
    productName: string;
    sku: string;
    warehouseName: string;
    currentQuantity: number;
    reorderLevel: number;
}

export interface StockBalance {
    productId: number;
    productName: string;
    sku: string;
    warehouseId: number;
    warehouseName: string;
    availableQuantity: number;
}
