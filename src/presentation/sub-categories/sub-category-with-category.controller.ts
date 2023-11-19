import { SubCategoriesService } from './sub-categories.service';
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EndPoint } from '../../application/config/enum/endpoint';

@Controller(`${EndPoint.id}/${EndPoint.subCategories}`)
export class SubCategoryWithCategoryController {
  constructor(private subCategoryService: SubCategoriesService) {}

  @Get()
  async getSubCategoriesByCategoryId(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] =
      await this.subCategoryService.getManySubCategoriesService({
        filter: {
          category: {
            id: id,
          },
        },
        pagination: {
          limit: parseInt(limit),
          page: parseInt(page),
        },
        relation: {
          user: true,
          category: true,
        },
        select: {
          user: {
            id: true,
            name: true,
          },
          category: {
            id: true,
            name: true,
          },
        },
        order: {
          createdAt: 'ASC',
        },
      });

    return {
      status: true,
      length,
      result,
    };
  }
}
