import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Accion para crear brands',
      payload
    };
  }

  @Get()
  getBrands() {
    return {
      message: 'Obtener las brands'
    };
  }

  @Get(':id')
  getBrand(@Param('id') id: number) {
    return {
      id,
      message: 'Obtener una brand'
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id
    };
  }
}
