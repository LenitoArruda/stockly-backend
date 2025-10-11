import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { fakesProducts } from 'src/data/products';

@Injectable()
export class ProductsService {
  private products: Product[] = fakesProducts;

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll(): Product[] {
    return this.products.filter(product => !product.archived);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
