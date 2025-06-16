import { User } from '../entities';
import { CreateUserDto } from '../dtos';

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<User | null>;
  abstract register(user: CreateUserDto): Promise<void>;
  abstract verifyauth(otp: string, id : string): Promise<User | null>;
}
