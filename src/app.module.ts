import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
