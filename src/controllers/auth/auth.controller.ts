import { Body, Controller, Post, Put, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AuthCaseService } from '../../use-cases/auth/auth-case.service';
import { CreateUserDto } from '../../core/dtos';
import { User } from '../../core/entities';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthRepository } from '../../core/repositories/auth-repository';

@ApiTags('Authentification')
@Controller('api/auth')
export class AuthController implements AuthRepository {
  constructor(private readonly authService: AuthCaseService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Utilisateur connecté avec succès' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Identifiants invalides' })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User | null> {
    return await this.authService.login(email, password);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Inscription utilisateur' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Utilisateur créé avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  async register(@Body() user: CreateUserDto): Promise<void> {
    return await this.authService.register(user);
  }

  @Put('/register/valid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validation du compte utilisateur' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Compte validé avec succès' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Code OTP invalide' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        otp: {
          type: 'string',
          description: 'Code OTP pour la validation',
          example: '123456'
        },
        id: {
          type: 'string',
          description: 'ID de l\'utilisateur',
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      },
      required: ['otp', 'id']
    }
  })

  async verifyauth(
    @Body('otp') otp: string,
    @Body('id') id: string,
  ): Promise<User | null> {
    return await this.authService.verifyauth(otp, id);
  }
}