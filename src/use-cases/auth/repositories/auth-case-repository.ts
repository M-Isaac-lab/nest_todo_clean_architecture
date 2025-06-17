import { AuthRepository } from '../../../core/repositories/auth-repository';
import { PrismaService } from '../../../frameworks/data-services/prisma/prisma.service';
import { User } from '../../../core/entities';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../../core/dtos';
import * as bcrypt from 'bcrypt';
import * as speakeasy from "speakeasy";
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../../../frameworks/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthCaseRyepository implements AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly nodemailerService : MailerService,
    private readonly jwtService : JwtService,
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({where: {email}});
    if (!user) throw new NotFoundException('Email or password is incorrect');
    const hash = await bcrypt.compare(password, user.password);
    if (!hash) {
      throw new NotFoundException('Email or password is incorrect');
    }
    return user
  }

  async register(User : CreateUserDto): Promise<void> {
    const user = await this.prismaService.user.findUnique({where: {email: User.email}});
    if (user) throw  new UnauthorizedException("Email already exists")
    const secret_hash = this.configService.get("ENCRYPT_PASSWORD");
    const hash_password = await bcrypt.hash(User.password, secret_hash)
    await this.prismaService.user.create({data:{...User, password : hash_password}})
    const secret = this.configService.get("OTP_ENC");
    var otp = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
      time: 600
    });
    await this.nodemailerService.sendSignupConfirmation(User.email, otp);
  }

  async verifyauth(otp: string, id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({where: {user_id: id}});
    if (!user) throw new NotFoundException("User not found");
    const secret = this.configService.get("OTP_ENC");
    const otpValidates = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: otp,
      window: 1  // autorise une marge d’erreur temporelle
    });
    if (!otpValidates) {throw new UnauthorizedException("Invalid OTP");}
    const payload = { sub: user.user_id, email: user.email };
    const access_token = this.jwtService.sign(payload, {expiresIn : '2h', secret : this.configService.get("SECRET_KEY")})
    await this.prismaService.user.update({where : {user_id : id}, data : {token : access_token, activate : true}})
    return user;
  }

}