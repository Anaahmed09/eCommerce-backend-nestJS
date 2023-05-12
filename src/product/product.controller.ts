import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from 'src/auth/seller.guard';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(SellerGuard)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: any,
  ): Promise<Product> {
    return this.productService.create(createProductDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.productService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any): Promise<Product> {
    return this.productService.findOne(id, user);
  }

  @UseGuards(SellerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: any,
  ) {
    return this.productService.update(id, updateProductDto, user);
  }

  @UseGuards(SellerGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.productService.remove(id, user);
  }
}
