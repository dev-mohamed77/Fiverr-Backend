import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordLoggedUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  newPassword: string;
}
