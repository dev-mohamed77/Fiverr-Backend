import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrderStatus } from 'src/application/config/enum/order_status';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  statusSeller: OrderStatus;

  @IsOptional()
  @IsEnum(OrderStatus)
  statusUser: OrderStatus;
}
