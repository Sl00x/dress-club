import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { Public } from './auth.constant';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Public()
  create(@Body() createAuthDto: AuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  // @Post('/requestResetPassword')
  // @Public()
  // async requestResetPassword(@Body('email') email: string) {
  //   const user = await this.userService.findOne({ where: { email } });
  //   if (user) {
  //     await this.authService.sendResetPasswordEmail(user);
  //   }
  //   return true;
  // }

  // @Post('/validateResetCode')
  // @Public()
  // async validateResetCode(
  //   @Body('email') email: string,
  //   @Body('code') code: string,
  // ) {
  //   await this.authService.validateResetCode(email, code);
  //   return true;
  // }

  // @Post('/resetPassword')
  // @Public()
  // resetPassword(
  //   @Body('email') email: string,
  //   @Body('code') code: string,
  //   @Body('password') password: string,
  // ) {
  //   return this.authService.resetPassword(email, code, password);
  // }
}
