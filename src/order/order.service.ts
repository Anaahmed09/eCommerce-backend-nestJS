import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order')
    private orderModel: Model<Order>,
    private productService: ProductService,
  ) {}
  async create({ products }: CreateOrderDto, user: User | any): Promise<Order> {
    const products_ids: string[] = products.map((ele) => ele.product);
    const products_price: any =
      await this.productService.findsAllProductsWithGivenIDs(products_ids);
    let totalPrice = 0;
    products.forEach((element) => {
      const price = products_price.find(
        (ele) => ele.id === element.product,
      ).price;
      totalPrice += price * element.quantity;
    });
    try {
      return await this.orderModel.create({
        owner: user._id,
        products,
        totalPrice,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(user: any): Promise<Order[]> {
    try {
      return await this.orderModel.find({ owner: user._id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string, user: any): Promise<Order> {
    try {
      return await this.orderModel.findOne({
        $and: [{ _id: id }, { owner: user._id }],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, { products }: UpdateOrderDto, user: any) {
    const products_ids: string[] = products.map((ele) => ele.product);
    const products_price: any =
      await this.productService.findsAllProductsWithGivenIDs(products_ids);
    let totalPrice = 0;
    products.forEach((element) => {
      const price = products_price.find(
        (ele) => ele.id === element.product,
      ).price;
      totalPrice += price * element.quantity;
    });
    try {
      return await this.orderModel.updateOne(
        { $and: [{ _id: id }, { owner: user._id }] },
        { $set: { products, totalPrice } },
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string, user: any) {
    try {
      return await this.orderModel.deleteOne({
        $and: [{ _id: id }, { owner: user._id }],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
