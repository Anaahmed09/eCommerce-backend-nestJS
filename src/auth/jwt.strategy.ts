import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import { Payload } from './payload.interface';
import { UserService } from 'src/user/user.service';
config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }
  async validate(payload: Payload) {
    const user = await this.userService.findOne(payload.username);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
