import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OrderService } from './order.service';
import { OrderStatus } from 'src/application/config/enum/order_status';

@Controller(`${EndPoint.id}/order-user`)
export class OrderUserController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrdersByUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('status') status: OrderStatus,
  ) {
    const [result, length] = await this.orderService.getManyOrdersService({
      filter: {
        statusUser: status ? status : undefined,
        user: {
          id: id,
        },
      },
      pagination: {
        limit: limit ? parseInt(limit) : undefined,
        page: page ? parseInt(page) : undefined,
      },
      relation: {
        gig: true,
        seller: true,
        user: true,
      },
      select: {
        gig: {
          id: true,
          title: true,
          coverImage: true,
          price: true,
          deliveryTime: true,
        },
        seller: {
          id: true,
          fullName: true,
          displayName: true,
          picture: true,
        },
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return {
      status: true,
      length,
      result,
    };
  }
}
