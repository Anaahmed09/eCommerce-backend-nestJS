import { User } from './entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    user.address = createUserDto.address;
    user.salt = salt;
    user.password = password;
    user.seller = createUserDto.seller;
    user.username = createUserDto.username;
    try {
      return await this.userModel.create(user);
    } catch (error) {
      if (error.code === 11000) throw new ConflictException('username existed');
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: any) {
    if (updateUserDto.seller || updateUserDto.username) {
      throw new ConflictException(
        'You do not update username or seller status',
      );
    }
    if (updateUserDto.password) {
      const password = await bcrypt.hash(updateUserDto.password, user.salt);
      updateUserDto.password = password;
    }
    try {
      return await this.userModel.updateOne(
        { _id: user._id },
        { $set: updateUserDto },
      );
    } catch (error) {
      if (error.code === 11000) throw new ConflictException('username existed');
      throw new InternalServerErrorException(error);
    }
  }
}
