import { ProductResponseDto } from "./product-response.dto";

export class PaginatedProductsDto {
    data: ProductResponseDto[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}