
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserFactoryService } from '../../use-cases/user/user-factory.service';

type payload = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserFactoryService,
    private jwtService: JwtService
  ) {}

  async validateUser(payload : payload): Promise<any> {
    const user = await this.usersService.findOne(payload.email);
    if (user && user.password === payload.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
