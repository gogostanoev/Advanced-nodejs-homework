import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './common/local-auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsertDto } from './users/dto/user.dto';
import { RefreshDto } from './users/dto/refreshtoken.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  };


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login( @Body() body: UsertDto ) {
    return await this.authService.login(body);
  }


  @Post('register')
  async register( @Body() body: UsertDto ) {
    const ID = await this.authService.register(body);

    return {
      message: 'User is created',
      id: ID
    };
  };


  @Post('refresh')
  async refreshToken( @Body() body: RefreshDto) {
    return await this.authService.refreshTokens(body);
  };


  @Post('logout')
  async logout( @Body() body: RefreshDto ) {
    return await this.authService.logout(body)
  }
}
