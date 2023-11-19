import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../../domain/dtos/auth/signin.dto';
import { SignUpDto } from '../../domain/dtos/auth/signup.dto';
import { ForgetPasswordDto } from '../../domain/dtos/auth/forget_password.dto';
import { VerifyPassResetCodeDtoDto } from '../../domain/dtos/auth/verify_reset_code.dto';
import { ResetPasswordDto } from '../../domain/dtos/auth/reset_password.dto';
import { EndPoint } from '../../application/config/enum/endpoint';

@UseInterceptors(ClassSerializerInterceptor)
@Controller(EndPoint.authPrefix)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(EndPoint.signIn)
  async signInController(@Body() signInDto: SignInDto) {
    const [result, token] = await this.authService.signInUserService(
      signInDto.email,
      signInDto.password,
    );

    return {
      status: true,
      result,
      token,
    };
  }

  @Post(EndPoint.signUp)
  async signUpController(@Body() signUpDto: SignUpDto) {
    const result = await this.authService.signUpService(
      signUpDto.name,
      signUpDto.email,
      signUpDto.password,
    );

    return {
      status: true,
      result,
    };
  }

  @Post(EndPoint.registerByGoogle)
  async registerByGoogleController(@Body() signUpDto: SignUpDto) {
    const [result, token] = await this.authService.registerByGoogleService(
      signUpDto.name,
      signUpDto.email,
      signUpDto.password,
    );

    return {
      status: true,
      result,
      token,
    };
  }

  @Post(EndPoint.forgetPassword)
  async forgetPasswordController(@Body() forgetPasswordDto: ForgetPasswordDto) {
    const result = await this.authService.forgetPasswordService(
      forgetPasswordDto.email,
    );

    console.log(`result =====>> ${result}`);

    return {
      status: true,
      result,
    };
  }

  @Post(EndPoint.verifyPassResetCode)
  async verifyPassResetCodeController(
    @Body() verifyPassResetCodeDto: VerifyPassResetCodeDtoDto,
  ) {
    const result = await this.authService.verifyPassResetCodeService(
      verifyPassResetCodeDto.resetCode,
    );

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.resetPassword)
  async restCodeController(@Body() resetPasswordDto: ResetPasswordDto) {
    const [result, token] = await this.authService.resetPasswordService(
      resetPasswordDto.email,
      resetPasswordDto.password,
    );

    return {
      status: true,
      result,
      token,
    };
  }
}
