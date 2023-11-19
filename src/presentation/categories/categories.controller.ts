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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from '../../application/config/enum/roles';
import { CreateCategoryDto } from '../../domain/dtos/category/create_category.dto';
import { EndPoint } from '../../application/config/enum/endpoint';
import { UpdateCategoryDto } from '../../domain/dtos/category/update_category.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CloudinaryService } from 'src/application/common/cloudinary/cloudinary.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private cloudianryService: CloudinaryService,
  ) {}

  @Post()
  @Roles(Role.admin, Role.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createCategoryController(
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    if (!image) {
      throw new BadRequestException('images is required');
    }

    const imageUrl = await this.cloudianryService.uploadImage(
      image,
      'category',
    );

    const category = new CategoryEntity({
      name: createCategoryDto.name,
      src: imageUrl.url,
      user: {
        id: req.user.id,
      },
    });

    const result = await this.categoriesService.createCategoryService(category);

    return {
      status: true,
      result,
    };
  }

  @Get()
  async getCategoriesController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.categoriesService.getCategoriesService({
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
      relation: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
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
  async getCategoryByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.categoriesService.getCategoryByIdService({
      id,
      relation: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(`Category ${id} is not exist`);
    }

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.id)
  @Roles(Role.admin, Role.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateCategoryByIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const date = new Date(Date.now());

    const result = await this.categoriesService.updateCategoryService({
      id,
      params: {
        name: updateCategoryDto.name,
        updatedAt: date,
      },
      relation: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
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
  async deleteCategoryByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.categoriesService.deleteCategoryService(id);

    if (!result) {
      throw new BadRequestException(`category ${id} is not exist`);
    }

    return {
      status: true,
      result: 'Category deleted successfully',
    };
  }
}
