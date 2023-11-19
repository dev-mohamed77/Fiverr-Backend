import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GigService } from './gig.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EndPoint } from '../../application/config/enum/endpoint';

@Controller(`${EndPoint.id}/${EndPoint.gigCategoryPrefix}`)
export class GigCategoryController {
  constructor(private gigService: GigService) {}

  @Get()
  async getGigsByCategoryIdController(
    @Param('id') categoryId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.gigService.getManyGigsService({
      filter: {
        category: {
          id: categoryId,
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
