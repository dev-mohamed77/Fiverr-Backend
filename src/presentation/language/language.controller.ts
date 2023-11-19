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
import { LanguageService } from './language.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateLanguageDto } from '../../domain/dtos/language/create_language.dto';
import { LanguageEntity } from '../../domain/entities/language.entity';
import { EndPoint } from '../../application/config/enum/endpoint';
import { UpdateLanguageDto } from '../../domain/dtos/language/update_language.dto';

@Controller(EndPoint.languagePrefix)
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto) {
    const language = new LanguageEntity({
      language: createLanguageDto.language,
      level: createLanguageDto.level,
      seller: {
        id: createLanguageDto.seller,
      },
    });
    const result = await this.languageService.createLanguageService(language);

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(EndPoint.id)
  async getLanguageByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.languageService.getLanguageByIdService({
      id,
      relation: {
        seller: true,
      },
    });

    if (!result) {
      throw new BadRequestException(`Language ${id} is not exist`);
    }

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getLanguagesController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.languageService.getLanguagesService({
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
      relation: { seller: true },
    });

    return {
      status: true,
      length: length,
      result: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(EndPoint.id)
  async updateLanguageByIdController(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    const languageExsit = await this.languageService.getLanguageByIdService({
      id: id,
      relation: {
        seller: true,
      },
      select: {
        seller: {
          id: true,
        },
      },
    });

    if (!req.user.isSeller) {
      throw new BadRequestException(
        'You cannot modify this language, as you are not a seller',
      );
    }

    if (languageExsit.seller.id !== req.user.seller.id) {
      throw new BadRequestException('You cannot modify this language');
    }

    const language = new LanguageEntity({
      language: updateLanguageDto.language,
      level: updateLanguageDto.level,
      updatedAt: new Date(Date.now()),
    });

    const result = await this.languageService.updateLanguageService({
      id,
      params: language,
      relation: { seller: true },
      select: {
        seller: {
          id: true,
          fullName: true,
        },
      },
    });

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(EndPoint.id)
  async deleteLanguageByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.languageService.deleteLanguageService(id);

    if (!result) {
      throw new BadRequestException(`seller ${id} is not exist`);
    }

    return {
      status: true,
      result: 'Language deleted successfully',
    };
  }
}
