import { UserService } from './../user/user.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn({ username, password }) {
    const user = await this.userService.findOne(username);
    if (!user) throw new ConflictException('This username not existed');
    const hashPassword = await bcrypt.hash(password, user.salt);
    if (user.password === hashPassword) {
      const payload: Payload = { username: user.username };
      return { token: await this.jwtService.sign(payload) };
    } else throw new UnauthorizedException();
  }
}
