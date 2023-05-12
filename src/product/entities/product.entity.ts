import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: String, required: true })
  image: string;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
