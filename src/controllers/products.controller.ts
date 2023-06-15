import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpStatus, HttpCode, Res, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/products.dtos'

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`
    // };
    return this.productService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'Accion para crear',
    //   payload
    // };
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    // return {
    //   id,
    //   payload
    // };
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    // return {
    //   id
    // };
    return this.productService.remove(id);
  }

  @Get('filter')
  getProductFilter() {
    return { message: `yo soy un filter` };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    // FROM EXPRESS
    // response.status(200).send({ message: `product ${productId}` });
    // return { message: `product ${productId}` };
    return this.productService.findOne(productId);
  }
}
