
export enum StockMovementType {
    StockIn = 1,
    StockOut = 2,
    Transfer = 3
}

export interface StockRequest {
    productId: number;
    warehouseId: number;
    targetWarehouseId?: number;
    quantity: number;
    movementType: StockMovementType;
}

export interface StockMovementHistory {
    productName: string;
    sku: string;
    movementType: string;
    quantity: number;
    fromWarehouse?: string;
    toWarehouse?: string;
    createdAt: Date;
}
