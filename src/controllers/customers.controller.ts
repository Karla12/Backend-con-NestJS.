import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CustomersService } from '../services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) { }
  @Post()
  create(@Body() payload: any) {
    return this.customerService.create(payload);
  }

  @Get()
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getCustomer(@Param('id') id: number) {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.customerService.remove(id);
  }
}
