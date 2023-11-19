import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OrderStatus } from 'src/application/config/enum/order_status';

@Controller(`${EndPoint.id}/order-seller`)
export class OrderSellerController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrdersBySeller(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('status') status: OrderStatus,
  ) {
    const [result, length] = await this.orderService.getManyOrdersService({
      filter: {
        statusSeller: status ? status : undefined,
        seller: {
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
