import { Product } from "../entities/product.entity";

export class ProductVariantDto {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;

  static fromEntity(variant: Product): ProductVariantDto {
    return {
      id: variant.id,
      name: variant.name,
      sku: variant.sku,
      price: variant.price,
      stock: variant.stock,
      attributes: variant.attributes || {},
    };
  }
}
