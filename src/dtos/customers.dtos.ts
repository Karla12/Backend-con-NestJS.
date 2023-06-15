import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsOptional()
  readonly lastName: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }
