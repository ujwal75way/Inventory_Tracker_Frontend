
export interface BulkUploadResult {
    totalRows: number;
    successful: number;
    failed: number;
    errors: RowError[];
}

export interface RowError {
    rowNumber: number;
    message: string;
}
