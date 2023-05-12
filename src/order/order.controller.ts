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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Order } from './entities/order.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: User,
  ): Promise<Order> {
    return this.orderService.create(createOrderDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: any): Promise<Order[]> {
    return this.orderService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any): Promise<Order> {
    return this.orderService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() user: any,
  ) {
    return this.orderService.update(id, updateOrderDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.orderService.remove(id, user);
  }
}
