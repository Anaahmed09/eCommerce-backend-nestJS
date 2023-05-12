import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

class Products {
  @IsNotEmpty()
  product: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Products)
  products: Products[];
}
