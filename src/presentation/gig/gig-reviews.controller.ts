import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GigService } from './gig.service';
import { EndPoint } from '../../application/config/enum/endpoint';

@Controller(`gigs-reviewed`)
export class GigReviewController {
  constructor(private gigService: GigService) {}

  @Get('highest')
  async getGigsByHighestReviewedController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.gigService.getManyGigsService({
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },

      relation: {
        seller: true,
        images: true,
        subCategories: true,
        category: true,
        reviews: true,
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
        reviews: {
          id: true,
          star: true,
          description: true,
        },
      },
      order: {
        reviews: {
          star: 'DESC',
        },
      },
    });

    return {
      status: true,
      length,
      result,
    };
  }

  @Get('lowest')
  async getGigsByLowestReviewedController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.gigService.getManyGigsService({
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },

      relation: {
        seller: true,
        images: true,
        subCategories: true,
        category: true,
        reviews: true,
      },

      select: {
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
          src: true,
        },
        subCategories: {
          id: true,
          name: true,
        },
        reviews: {
          id: true,
          star: true,
          description: true,
        },
      },
      order: {
        reviews: {
          star: 'ASC',
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
