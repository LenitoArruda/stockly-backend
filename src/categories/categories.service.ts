import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { fakesCategories } from 'src/data/categories';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = fakesCategories;

  create(createCategoryDto: CreateCategoryDto): Category {
    const newCategory: Category = {
      id: this.categories.length + 1,
      ...createCategoryDto,
      archived: false,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  findAll(): Category[] {
    return this.categories.filter(category => !category.archived);
  }

  findOne(id: number): Category | undefined {
    return this.categories.find(category => category.id === id && !category.archived);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Category | undefined {
    const category = this.findOne(id);

    if (category) {
      Object.assign(category, updateCategoryDto);
    }

    return category;
  }

  remove(id: number): boolean {
    const category = this.findOne(id);

    if (category) {
      category.archived = true;
    }

    return true;
  }
}
