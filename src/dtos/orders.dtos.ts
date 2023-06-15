import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
  @IsNumber()
  @IsNotEmpty()
  readonly total: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }
