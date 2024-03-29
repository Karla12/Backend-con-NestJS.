import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from '../dtos/brands.dtos';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [{
    id: 1,
    name: 'name',
    description: 'description',
    image: 'image'
  }];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: any) {
    const brand = this.findOne(id);
    if (!brand) {
      return null;
    }
    const indexBrand = this.brands.findIndex((item) => item.id === id);
    this.brands[indexBrand] = { ...brand, ...payload };
    return this.brands[indexBrand];
  }

  remove(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
