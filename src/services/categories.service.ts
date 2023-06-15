import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private category: Category[] = [{
    id: 1,
    name: 'Vegetables',
    description: 'Vegetables'
  }];

  findAll() {
    return this.category;
  }

  findOne(id: number) {
    const category = this.category.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload
    };
    this.category.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: any) {
    const category = this.findOne(id);
    if (!category) {
      return null;
    }
    const indexCategory = this.category.findIndex((item) => item.id === id);
    this.category[indexCategory] = { ...category, ...payload };
    return this.category[indexCategory];
  }

  remove(id: number) {
    const index = this.category.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.category.splice(index, 1);
    return true;
  }
}
