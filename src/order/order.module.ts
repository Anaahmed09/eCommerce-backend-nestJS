import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/order.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
