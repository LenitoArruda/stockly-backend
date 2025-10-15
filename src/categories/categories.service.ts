import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { fakeCategories } from 'src/data/categories';
import { Category } from './entities/category.entity';
import { AlreadyExistsError, NotFoundError } from 'src/common/errors';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  private categories: Category[] = fakeCategories;

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const existingCategory = this.categories.find(
      (cat) => cat.name.toLowerCase() === createCategoryDto.name.toLowerCase() && !cat.archived,
    );

    if (existingCategory)
      throw new AlreadyExistsError('Category', `${createCategoryDto.name}`, 'name');

    const newCategory: Category = {
      id: this.categories.length + 1,
      ...createCategoryDto,
      archived: false,
    };

    this.categories.push(newCategory);

    return CategoryResponseDto.fromEntity(newCategory);
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = this.categories.filter((category) => !category.archived);
    categories.reverse();
    return categories.map((cat) => CategoryResponseDto.fromEntity(cat));
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    const category = this.categories.find((category) => category.id === id && !category.archived);

    if (!category) throw new NotFoundError('Category', String(id));

    return CategoryResponseDto.fromEntity(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    const category = this.categories.find((category) => category.id === id && !category.archived);

    if (!category) throw new NotFoundError('Category', String(id));

    const existingCategory = this.categories.find(
      (cat) =>
        cat.name.toLowerCase() === updateCategoryDto.name?.toLowerCase() &&
        cat.id !== id &&
        !cat.archived,
    );

    if (existingCategory)
      throw new AlreadyExistsError('Category', `${updateCategoryDto.name}`, 'name');

    Object.assign(category, updateCategoryDto);

    return CategoryResponseDto.fromEntity(category);
  }

  async remove(id: number): Promise<void> {
    const category = this.categories.find((category) => category.id === id && !category.archived);

    if (!category) throw new NotFoundError('Category', String(id));

    category.archived = true;
  }
}
