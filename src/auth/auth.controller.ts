import { Body, Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res() res) {
    res.clearCookie('session', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return res.status(204).json({ message: 'Logged out successfully' });
  }
}
