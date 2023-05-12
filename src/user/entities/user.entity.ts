import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

class Address {
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, default: false })
  seller: boolean;

  @Prop({
    type: Address,
    required: true,
  })
  address: {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
  };

  @Prop({ type: String })
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
