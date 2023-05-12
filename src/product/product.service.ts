import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private productModel: Model<Product>,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    user: any,
  ): Promise<Product> {
    try {
      return await this.productModel.create({
        ...createProductDto,
        owner: user._id,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(user: any): Promise<Product[]> {
    try {
      return await this.productModel
        .find({ owner: user._id })
        .populate('owner');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string, user: any): Promise<Product> {
    try {
      return await this.productModel
        .findOne({ $and: [{ _id: id }, { owner: user._id }] })
        .populate('owner');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: any) {
    try {
      return await this.productModel.updateOne(
        { $and: [{ _id: id }, { owner: user._id }] },
        { $set: updateProductDto },
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string, user: any) {
    try {
      return await this.productModel.deleteOne({
        $and: [{ _id: id }, { owner: user._id }],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findsAllProductsWithGivenIDs(ids: string[]): Promise<Product[]> {
    try {
      return await this.productModel.find(
        { _id: { $in: ids } },
        { _id: 1, price: 1 },
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
