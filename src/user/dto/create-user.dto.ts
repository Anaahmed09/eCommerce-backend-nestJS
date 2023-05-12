import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Address {
  @IsNotEmpty()
  @IsString()
  addr1: string;
  @IsString()
  @IsOptional()
  addr2: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  state: string;
  @IsNotEmpty()
  @IsString()
  country: string;
  @IsNotEmpty()
  @IsNumber()
  zip: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsBoolean()
  @IsOptional()
  seller: boolean;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
