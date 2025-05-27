
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface PaginationResponse<T> {
    page: number;
    total: number;
    data: T;
}

export interface PaginationApiResponse<T> {
    data: PaginationResponse<T>;
    status: boolean;
    error: string | null
}