import { Category } from "src/categories/entities/category.entity";
import { Product } from "../entities/product.entity";
import { ProductVariantDto } from "./product-variant.dto";

export class ProductResponseDto {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    categoryId: number;
    categoryName: string;
    variants: ProductVariantDto[];

    static fromEntity(product: Product, allProducts: Product[], categories: Category[]): ProductResponseDto {
        const categoryName = categories.find(cat => cat.id === product.categoryId)?.name || '';

        const variants = allProducts
            .filter(p => p.parentId === product.id && !p.archived)
            .map(v => ProductVariantDto.fromEntity(v));

        return {
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId,
            categoryName,
            variants,
        };
    }
}
