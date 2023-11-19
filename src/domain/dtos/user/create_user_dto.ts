import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(5, 50)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  readonly password: string;
}
