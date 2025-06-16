import { AuthRepository } from '../../../core/repositories/auth-repository';
import { PrismaService } from '../../../frameworks/data-services/prisma/prisma.service';
import { User } from '../../../core/entities';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../../core/dtos';
import * as bcrypt from 'bcrypt';
import * as speakeasy from "speakeasy";
import { ConfigService } from '@nestjs/config';

export class AuthCaseRepository implements AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({where: {email}});
    const key_hash = this.configService.get("ENCRYPT_PASSWORD");
    const hash = await bcrypt.compare(password, key_hash);
    if (!hash) {
      throw new NotFoundException('Email or password is incorrect');
    }
    return user
  }

  async register(User : CreateUserDto): Promise<void> {
    const user = await this.prismaService.user.findUnique({where: {email: User.email}});
    if (user) throw  new UnauthorizedException("Email already exists")
    const secret = this.configService.get("OTP_ENC");
    var token = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
      time: 600
    });

  }

  async verifyauth(otp: string, id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({where: {user_id: id}});
    if (!user) throw new NotFoundException("User not found");
    const secret = this.configService.get("OTP_ENC");
    var tokenValidates = speakeasy.hotp.verify({
      secret: secret,
      encoding: 'base32',
      token: otp,
      counter: 123
    });
    if (!tokenValidates) {
      throw new UnauthorizedException("Invalid OTP");
    }
    await this.prismaService.user.update({where : {user_id : id}, data : {token : otp, activate : true}})
    return user;
  }






}