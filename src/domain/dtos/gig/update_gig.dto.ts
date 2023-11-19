import { PartialType } from '@nestjs/mapped-types';
import { CreateGigDto } from './create_gig.dto';

export class UpdateGigDto extends PartialType(CreateGigDto) {}
