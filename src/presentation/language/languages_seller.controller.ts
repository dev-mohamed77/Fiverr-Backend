import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { LanguageService } from './language.service';

@Controller(`${EndPoint.id}/languages-seller`)
export class LanguagesSellerController {
  constructor(private languagesService: LanguageService) {}

  @Get()
  async getSkillByIdController(
    @Param('id', ParseUUIDPipe) sellerId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] =
      await this.languagesService.getManyLanguagesService({
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
        },
        select: {
          seller: {
            id: true,
            fullName: true,
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
