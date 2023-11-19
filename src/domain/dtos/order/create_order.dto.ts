import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Payment } from 'src/application/config/enum/payment';
import SellerEntity from 'src/domain/entities/seller.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID('4')
  seller: string;

  @IsNotEmpty()
  @IsUUID('4')
  gig: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  serviceFee: number;

  @IsNotEmpty()
  @IsEnum(Payment)
  payment: Payment;

  @IsNotEmpty()
  @IsNumber()
  subTotal: number;

  @IsNotEmpty()
  @IsNumber()
  deliveryTime: number;
}
