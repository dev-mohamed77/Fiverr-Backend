import { PartialType } from '@nestjs/mapped-types';
import { CreateGigImageDto } from './create-gig-image.dto';

export class UpdateGigImageDto extends PartialType(CreateGigImageDto) {}
