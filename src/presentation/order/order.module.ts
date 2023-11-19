import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/infra/models/order.model';
import { UserModule } from '../user/user.module';
import { OrderRepositoryImp } from 'src/infra/repositories/order_repository';
import { CreateOrderUseCase } from 'src/domain/usecases/order/create_order.usecase';
import { IOrderRepository } from 'src/domain/repositories/order.repository';
import { GetManyOrdersUseCase } from 'src/domain/usecases/order/get_many_orders_usecase';
import { GetOrderByIdUseCase } from 'src/domain/usecases/order/get_order_by_id.usecase';
import { GetOrdersUseCase } from 'src/domain/usecases/order/get_orders.usecase';
import { GetOneOrderUseCase } from 'src/domain/usecases/order/get_one_order.usecase';
import { UpdateOrderUseCase } from 'src/domain/usecases/order/update_order.usecase';
import { DeleteOrderUseCase } from 'src/domain/usecases/order/delete_order.usecase';
import { DeleteOneOrderUseCase } from 'src/domain/usecases/order/delete_one_order.usecase';
import { OrderSellerController } from './order_seller.controller';
import { OrderUserController } from './order_user.controller';
import { SellerModule } from '../seller/seller.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule, SellerModule],
  controllers: [OrderController, OrderSellerController, OrderUserController],
  providers: [
    OrderService,
    {
      provide: OrderRepositoryImp,
      useClass: OrderRepositoryImp,
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (orderRepo: IOrderRepository) => {
        return new CreateOrderUseCase(orderRepo);
      },
      inject: [OrderRepositoryImp],
    },
    {
      provide: GetManyOrdersUseCase,
      useFactory: (orderRepo: IOrderRepository) => {
        return new GetManyOrdersUseCase(orderRepo);
      },
      inject: [OrderRepositoryImp],
    },
    {
      provide: GetOrderByIdUseCase,
      useFactory: (orderRepo: IOrderRepository) => {
        return new GetOrderByIdUseCase(orderRepo);
      },
      inject: [OrderRepositoryImp],
    },
    {
      provide: GetOrdersUseCase,
      useFactory: (orderRepo: IOrderRepository) => {
        return new GetOrdersUseCase(orderRepo);
      },
      inject: [OrderRepositoryImp],
    },
    {
      provide: GetOneOrderUseCase,
      useFactory: (orderRepo: IOrderRepository) => {
        return new GetOneOrderUseCase(orderRepo);
      },
      inject: [OrderRepositoryImp],
    },
    {
      provide: UpdateOrderUseCase,
      useFactory: (orderRepo: IOrderRepository) => {
        return new UpdateOrderUseCase(orderRepo);
      },
      inject: [OrderRepositoryImp],
    },
    {
      provide: DeleteOrderUseCase,
      useFactory: (orderRepo: IOrderRepository) => {
        return new DeleteOrderUseCase(orderRepo);
      },
      inject: [OrderRepositoryImp],
    },
    {
      provide: DeleteOneOrderUseCase,
      useFactory: (orderRepo: IOrderRepository) => {
        return new DeleteOneOrderUseCase(orderRepo);
      },
      inject: [OrderRepositoryImp],
    },
  ],
})
export class OrderModule {}
