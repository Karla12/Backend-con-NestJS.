import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) { }

  @Get(':id/products/:productId')
  getProductsCategory(
    @Param('productId') productId: string,
    @Param('id') id: string
  ) {
    return `product ${productId} and ${id}`;
  }

  @Post()
  create(@Body() payload: any) {
    return this.categoryService.create(payload);
  }

  @Get()
  getCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getCategory(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.categoryService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
