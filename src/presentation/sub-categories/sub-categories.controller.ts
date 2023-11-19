import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/role.decorator';
import { Role } from '../../application/config/enum/roles';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { EndPoint } from '../../application/config/enum/endpoint';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoryEntity } from '../../domain/entities/subCategory.entity';
import { CreateSubCategoryDto } from '../../domain/dtos/subCategory/create_subCategory.dto';
import { UpdateSubCategoryDto } from '../../domain/dtos/subCategory/update_subCategory.dto';

@Controller(EndPoint.subCategories)
export class SubCategoriesController {
  constructor(private subCategoriesService: SubCategoriesService) {}

  @Post()
  @Roles(Role.admin, Role.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async createSubCategoryController(
    @Req() req,
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ) {
    const subCategory = new SubCategoryEntity({
      name: createSubCategoryDto.name,
      category: {
        id: createSubCategoryDto.category,
      },
      user: {
        id: req.user.id,
      },
    });

    const result = await this.subCategoriesService.createSubCategoryService(
      subCategory,
    );

    return {
      status: true,
      result,
    };
  }

  @Get()
  async getSubCategoriesController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] =
      await this.subCategoriesService.getSubCategoriesService({
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
        },
        relation: {
          user: true,
          category: true,
        },
        select: {
          user: {
            id: true,
            name: true,
            email: true,
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

  @Get(EndPoint.id)
  async getSubCategoryByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.subCategoriesService.getSubCategoryByIdService({
      id,
      relation: {
        user: true,
        category: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
        category: {
          id: true,
          name: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(`SubCategory ${id} is not exist`);
    }

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.id)
  @Roles(Role.admin, Role.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateSubCategoryByIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateSubCategoryDto,
  ) {
    const result = await this.subCategoriesService.updateSubCategoryService({
      id,
      params: {
        name: updateCategoryDto.name,
        updatedAt: new Date(Date.now()),
      },
      relation: {
        user: true,
        category: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
        category: {
          id: true,
          name: true,
        },
      },
    });

    return {
      status: true,
      result,
    };
  }

  @Delete(EndPoint.id)
  @Roles(Role.admin, Role.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async deleteSubsCategoryByIdController(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = await this.subCategoriesService.deleteSubCategoryService(id);

    if (!result) {
      throw new BadRequestException(`SubCategory ${id} is not exist`);
    }

    return {
      status: true,
      result: 'SubCategory deleted successfully',
    };
  }
}
