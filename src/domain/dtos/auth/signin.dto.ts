import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(5, 50)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  password: string;
}
