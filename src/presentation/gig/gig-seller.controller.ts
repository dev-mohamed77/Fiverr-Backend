import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GigService } from './gig.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EndPoint } from '../../application/config/enum/endpoint';

@Controller(`${EndPoint.id}/${EndPoint.gigsSellerPrefix}`)
export class GigSellerController {
  constructor(private gigService: GigService) {}

  @Get()
  async getGigsBySellerIdController(
    @Param('id') sellerId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.gigService.getManyGigsService({
      filter: {
        seller: {
          id: sellerId,
        },
      },
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },

      relation: {
        seller: true,
        images: true,
        subCategories: true,
        category: true,
      },

      select: {
        seller: {
          id: true,
          displayName: true,
          picture: true,
        },
        images: {
          id: true,
          src: true,
        },
        category: {
          id: true,
          name: true,
          src: true,
        },
        subCategories: {
          id: true,
          name: true,
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
