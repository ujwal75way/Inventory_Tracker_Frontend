
export interface Product {
    sku: string;
    name: string;
    category: string;
    price: number;
    reorderLevel: number;
}

export interface ProductWithStock extends Product {
    id: number;
    vendorUserId: number;
    inventories: InventoryStock[];
}

export interface InventoryStock {
    warehouseId: number;
    warehouseName: string;
    quantity: number;
    isLowStock?: boolean;
    isOutOfStock?: boolean;
}
