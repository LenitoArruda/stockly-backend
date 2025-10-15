import { Body, Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import type { Response } from 'express'; // 👈 importante
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('session', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { message: 'Logged out successfully' };
  }
}
