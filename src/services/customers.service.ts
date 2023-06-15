import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dtos/customers.dtos';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [{
    id: 1,
    name: 'name',
    firstName: 'firstname',
    lastName: 'lastname'
  }];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: any) {
    const customer = this.findOne(id);
    if (!customer) {
      return null;
    }
    const indexCustomer = this.customers.findIndex((item) => item.id === id);
    this.customers[indexCustomer] = { ...customer, ...payload };
    return this.customers[indexCustomer];
  }

  remove(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
