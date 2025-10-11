import { Product } from '../entities/product.entity';

export class PaginatedProductsDto {
    data: Product[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}