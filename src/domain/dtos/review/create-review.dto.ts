import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsUUID('4')
  gig: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  star: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
