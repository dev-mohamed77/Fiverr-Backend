import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { SkillsService } from './skills.service';

@Controller(`${EndPoint.id}/skills-seller`)
export class SkillsSellerController {
  constructor(private skillsService: SkillsService) {}

  @Get()
  async getSkillByIdController(
    @Param('id', ParseUUIDPipe) sellerId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.skillsService.getManySkillsService({
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
