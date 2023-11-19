import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GigService } from './gig.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EndPoint } from '../../application/config/enum/endpoint';

@Controller(`${EndPoint.id}/seller-gig`)
export class SellerGigController {
  constructor(private gigService: GigService) {}

  @Get(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async getGigByIdController(@Param('id') id: string) {
    const result = await this.gigService.getManyGigsService(
      {},
      {},
      {
        seller: true,
        images: true,
        subCategories: true,
        category: true,
      },
      {
        seller: {
          id: true,
          fullName: true,
          user: {
            id: true,
            email: true,
          },
        },
        images: {
          id: true,
          src: true,
        },
        category: {
          id: true,
          name: true,
        },
        subCategories: {
          id: true,
          name: true,
        },
      },
    );

    return {
      status: true,
      result,
    };
  }
}
