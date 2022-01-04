import { Body, Controller, Request, Patch, Post, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAccountDto } from 'src/auth/dto/login-account.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { AuthService } from './auth.service';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Patch('login')
  async login(@Body() loginAccountDto: LoginAccountDto) {
    const response = await this.authService.login(loginAccountDto);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong'
      }
    }

    return {
      status: CORRECT,
      data: response
    }
  }

  @Patch('logout')
  async logout(@Request() req) {
    const response = await this.authService.logout(req.user.id);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: "Can't logout"
      }
    }

    return {
      status: CORRECT
    }
  }

  @Public()
  @Post('request-reset-password')
  async requestResetPassword(@Body() requestResetPassword: RequestResetPasswordDto) {
    const response = await this.authService.requestResetPassword(requestResetPassword);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Request fail'
      }
    }

    return {
      status: CORRECT
    }
  }

  @Public()
  @Get('validate-reset-password-request/:code')
  async validateResetPasswordRequest(@Param('code') code: string) {
    const response = await this.authService.validateResetPasswordRequest(code);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Request is invalid'
      }
    }

    return {
      status: CORRECT,
      data: response.data
    }
  }

  @Public()
  @Patch('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const response = await this.authService.resetPassword(resetPasswordDto);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: "Can't reset password"
      }
    }

    return {
      status: CORRECT
    }
  }
}
