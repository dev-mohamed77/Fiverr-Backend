import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { OccupationService } from './occupation.service';

@Controller(`${EndPoint.id}/occupation-seller`)
export class OccupationSellerController {
  constructor(private occupationService: OccupationService) {}

  @Get()
  async getSkillByIdController(
    @Param('id', ParseUUIDPipe) sellerId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] =
      await this.occupationService.getManyOccupationsService({
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
