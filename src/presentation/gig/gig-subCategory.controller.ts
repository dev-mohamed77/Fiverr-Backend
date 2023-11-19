import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GigService } from './gig.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EndPoint } from '../../application/config/enum/endpoint';
import { Between } from 'typeorm';
import { LanguageLevel } from 'src/application/config/enum/language_level';

@Controller(`${EndPoint.id}/${EndPoint.gigSubCategoryPrefix}`)
export class GigSubCategoryController {
  constructor(private gigService: GigService) {}

  @Get()
  async getGigsBySubCategoryIdController(
    @Param('id') subCategoryID: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('delivery-time') deliveryTime: string,
    @Query('max-price') maxPrice: string,
    @Query('min-price') minPrice: string,
    @Query('country') country: string,
    @Query('language') language: string,
  ) {
    const [result, length] = await this.gigService.getManyGigsService({
      filter: {
        subCategories: {
          id: subCategoryID,
        },
        deliveryTime: !deliveryTime ? undefined : parseInt(deliveryTime),
        price:
          !minPrice && !maxPrice
            ? undefined
            : Between(parseInt(minPrice), parseInt(maxPrice)),

        seller: {
          language: {
            language: language ? language : undefined,
            level: language ? LanguageLevel.Native : undefined,
          },
          user: {
            country: !country ? undefined : country,
          },
        },
      },
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
      relation: {
        seller: {
          user: country ? true : undefined,
          language: language ? true : undefined,
        },
        images: true,
        subCategories: true,
        category: true,
      },

      select: {
        seller: {
          id: true,
          displayName: true,
          picture: true,
          language: language
            ? { id: true, language: true, level: true }
            : undefined,
          user: country
            ? {
                id: true,
                email: true,
                country: true,
              }
            : undefined,
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
