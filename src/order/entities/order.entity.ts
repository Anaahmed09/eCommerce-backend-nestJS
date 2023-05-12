import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Number, default: 0 })
  totalPrice: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;
  @Prop({
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 0 },
      },
    ],
  })
  products: { product: Product; quantity: number }[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);
