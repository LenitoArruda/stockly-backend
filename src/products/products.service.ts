import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { fakesProducts } from 'src/data/products';
import { PaginatedProductsDto } from './dto/paginated-products.dto';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = fakesProducts;

  findAll(): Product[] {
    return this.products.filter(product => !product.archived);
  }

  findPaginated(filter: FilterProductsDto): PaginatedProductsDto {
    const {
      name,
      sku,
      category,
      minPrice,
      maxPrice,
      page = '1',
      pageSize = '10',
    } = filter;

    let results = this.products.filter((p) => !p.archived);

    if (name) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (sku) {
      results = results.filter((p) =>
        p.sku.toLowerCase().includes(sku.toLowerCase()),
      );
    }

    if (category) {
      results = results.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (minPrice) {
      results = results.filter((p) => p.price >= +minPrice);
    }

    if (maxPrice) {
      results = results.filter((p) => p.price <= +maxPrice);
    }

    const total = results.length;

    const pageNum = page ? parseInt(page, 10) : 1;
    const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 10;

    const startIndex = (pageNum - 1) * pageSizeNum;
    const endIndex = startIndex + pageSizeNum;

    const data = results.slice(startIndex, endIndex);

    return {
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum),
      data
    };
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...createProductDto,
      archived: false,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  findOne(id: number): Product | undefined {
    return this.products.find(product => product.id === id && !product.archived);
  }

  update(id: number, updateProductDto: UpdateProductDto): Product | undefined {
    const product = this.findOne(id);

    if (product) {
      Object.assign(product, updateProductDto);
    }

    return product;
  }

  remove(id: number): boolean {
    const product = this.findOne(id);

    if (product) {
      product.archived = true;
    }

    return true;
  }
}
