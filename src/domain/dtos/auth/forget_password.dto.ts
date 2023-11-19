import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ForgetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(5, 50)
  readonly email: string;
}
