import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../frameworks/auth-services/JwtAuthGuard';

@Controller('user')
export class UserController {
  constructor() {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return "hello"
  }
}
