export class Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  categoryId: number;
  archived: boolean;
  parentId?: number;
  attributes?: Record<string, string>;
}
