import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { fakeUsers } from 'src/data/users';
import { InvalidCredentialsError } from './errors';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { NotFoundError } from 'src/common/errors';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private users: User[] = fakeUsers;

  async login(loginDto: LoginDto, res: Response): Promise<LoginResponseDto> {
    const user = this.users.find((user) => user.email === loginDto.email && !user.archived);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new InvalidCredentialsError();
    }

    const payload = {
      sub: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    // 🔑 Setar cookie seguro
    res.cookie('session', token, {
      httpOnly: true,
      secure: true, // em produção precisa estar HTTPS
      sameSite: 'none', // necessário para cross-domain (Vercel + Railway)
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    return LoginResponseDto.fromEntity(user, token);
  }

  async getProfile(userId: number): Promise<UserResponseDto> {
    const user: User | undefined = this.users.find((user) => user.id === userId && !user.archived);

    if (!user) throw new NotFoundError('User', String(userId));

    return UserResponseDto.fromEntity(user);
  }
}
