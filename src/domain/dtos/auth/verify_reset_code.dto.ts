import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyPassResetCodeDtoDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  readonly resetCode: string;
}
