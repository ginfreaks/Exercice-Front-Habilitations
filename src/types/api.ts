export interface ApiResponse<T> {
    data: T
}

export interface ApiErrorBody {
    message:string;
    errors?: Record<string, string>;
}