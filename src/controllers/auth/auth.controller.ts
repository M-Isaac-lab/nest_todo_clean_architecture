import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthCaseService } from '../../use-cases/auth/auth-case.service';
import { CreateUserDto } from '../../core/dtos';
import { User } from '../../core/entities';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthCaseService) {}

  @Post('/login')
  Login(@Body('email') email: string, @Body('password') password: string): Promise<User | null> {
    return this.authService.login(email, password);
  }


  @Post('/register')
  Register(user : CreateUserDto): Promise<void> {
    return this.authService.register(user);
  }

  @Put('/register/valid')
  Register_valid(@Body('otp') otp: string, @Body('id') id: string): Promise<User | null> {
    return this.authService.verifyauth(otp, id);
  }

}