import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginatedProductsDto } from './dto/paginated-products.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { fakeProducts } from 'src/data/products';
import { ProductResponseDto } from './dto/product-response.dto';
import { Category } from 'src/categories/entities/category.entity';
import { fakeCategories } from 'src/data/categories';
import { ProductVariantDto } from './dto/product-variant.dto';
import { AlreadyExistsError, NotFoundError } from 'src/common/errors';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = fakeProducts;
  private categories: Category[] = fakeCategories;

  async findAll(): Promise<ProductResponseDto[]> {
    const products = this.products.filter((product) => !product.archived);

    return products.map((p) => ProductResponseDto.fromEntity(p, this.products, this.categories));
  }

  async findPaginated(filter: FilterProductsDto): Promise<PaginatedProductsDto> {
    const {
      name,
      sku,
      categoryId,
      minPrice,
      maxPrice,
      page = '1',
      pageSize = '10',
      sortBy,
      sortOrder = 'asc',
    } = filter;

    let results = this.products.filter((p) => !p.archived && !p.parentId);

    if (name) results = results.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));

    if (sku) results = results.filter((p) => p.sku.toLowerCase().includes(sku.toLowerCase()));

    if (categoryId) results = results.filter((p) => p.categoryId == +categoryId);

    if (minPrice) results = results.filter((p) => p.price >= +minPrice);

    if (maxPrice) results = results.filter((p) => p.price <= +maxPrice);

    if (sortBy) {
      results = results.sort((a, b) => {
        let valA: any;
        let valB: any;

        switch (sortBy) {
          case 'name':
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
            break;
          case 'sku':
            valA = a.sku.toLowerCase();
            valB = b.sku.toLowerCase();
            break;
          case 'category':
            valA = this.categories.find((c) => c.id === a.categoryId)?.name || '';
            valB = this.categories.find((c) => c.id === b.categoryId)?.name || '';
            break;
          case 'stock':
            valA = a.stock;
            valB = b.stock;
            break;
          case 'price':
            valA = a.price;
            valB = b.price;
            break;
          default:
            return 0;
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const total = results.length;

    const pageNum = page ? parseInt(page, 10) : 1;
    const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 10;

    const startIndex = (pageNum - 1) * pageSizeNum;
    const endIndex = startIndex + pageSizeNum;

    const data = results
      .slice(startIndex, endIndex)
      .map((p) => ProductResponseDto.fromEntity(p, this.products, this.categories));

    return {
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum),
      data,
    };
  }

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const category = this.categories.find((c) => c.id === createProductDto.categoryId);

    if (!category) throw new NotFoundError('Category', String(createProductDto.categoryId));

    const existingProduct = this.products.find(
      (p) => p.sku.toLowerCase() === createProductDto.sku.toLowerCase() && !p.archived,
    );

    if (existingProduct) throw new AlreadyExistsError('Product', `${createProductDto.sku}`, 'sku');

    const newProduct: Product = {
      id: this.products.length + 1,
      ...createProductDto,
      archived: false,
    };

    this.products.push(newProduct);

    return ProductResponseDto.fromEntity(newProduct, this.products, this.categories);
  }

  async createVariant(createVariantDto: CreateVariantDto): Promise<ProductVariantDto> {
    const existingProduct = this.products.find(
      (p) => p.sku.toLowerCase() === createVariantDto.sku.toLowerCase() && !p.archived,
    );

    if (existingProduct) throw new AlreadyExistsError('Product', `${createVariantDto.sku}`, 'sku');

    const parentProduct = this.products.find(
      (p) => p.id === createVariantDto.parentId && !p.archived,
    );

    if (!parentProduct) throw new NotFoundError('Product', String(createVariantDto.parentId));

    const newVariant: Product = {
      id: this.products.length + 1,
      categoryId: parentProduct.categoryId,
      archived: false,
      ...createVariantDto,
    };

    this.products.push(newVariant);

    return ProductVariantDto.fromEntity(newVariant);
  }

  async findOne(id: number): Promise<ProductResponseDto | ProductVariantDto> {
    const productEntity = this.products.find((product) => product.id === id && !product.archived);

    if (!productEntity) throw new NotFoundError('Product', String(id));

    if (productEntity.parentId) return ProductVariantDto.fromEntity(productEntity);

    return ProductResponseDto.fromEntity(productEntity, this.products, this.categories);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const productEntity = await this.products.find(
      (product) => product.id === id && !product.archived,
    );

    if (!productEntity) throw new NotFoundError('Product', String(id));

    const existingProduct = this.products.find(
      (p) =>
        updateProductDto.sku &&
        p.sku.toLowerCase() === updateProductDto.sku.toLowerCase() &&
        !p.archived &&
        p.id !== id,
    );

    if (existingProduct) throw new AlreadyExistsError('Product', `${updateProductDto.sku}`, 'sku');

    Object.assign(productEntity, updateProductDto);

    return ProductResponseDto.fromEntity(productEntity, this.products, this.categories);
  }

  async updateVariant(id: number, updateVariantDto: UpdateVariantDto): Promise<ProductVariantDto> {
    const productEntity = await this.products.find(
      (product) => product.id === id && !product.archived,
    );

    if (!productEntity) throw new NotFoundError('Product', String(id));

    const existingProduct = this.products.find(
      (p) =>
        updateVariantDto.sku &&
        p.sku.toLowerCase() === updateVariantDto.sku.toLowerCase() &&
        !p.archived &&
        p.id !== id,
    );

    if (existingProduct) throw new AlreadyExistsError('Product', `${updateVariantDto.sku}`, 'sku');

    Object.assign(productEntity, updateVariantDto);

    return ProductVariantDto.fromEntity(productEntity);
  }

  async remove(id: number): Promise<void> {
    const productEntity = this.products.find((product) => product.id === id && !product.archived);

    if (!productEntity) throw new NotFoundError('Product', String(id));

    productEntity.archived = true;
  }
}
