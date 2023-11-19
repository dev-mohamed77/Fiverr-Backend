import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { SkillsRepositoryImp } from '../../infra/repositories/skilles.repository';
import { CreateSkillsUseCase } from 'src/domain/usecases/skills/create_skills_usecase';
import { ISkillsRepository } from 'src/domain/repositories/skilles.repository';
import { GetManySkillsUseCase } from 'src/domain/usecases/skills/get_many_skills_usecase';
import { GetSkillsUseCase } from 'src/domain/usecases/skills/get_skills_usecase';
import { GetSkillsByIdUseCase } from 'src/domain/usecases/skills/get_skills_by_id_usecase';
import { GetOneSkillsUseCase } from 'src/domain/usecases/skills/get_one_skills_usecase';
import { UpdateSkillsUseCase } from 'src/domain/usecases/skills/update_skills_usecase';
import { DeleteSkillsUseCase } from 'src/domain/usecases/skills/delete_skills_usecase';
import { DeleteOneSkillsUseCase } from 'src/domain/usecases/skills/delete_one_skills_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from 'src/infra/models/skills.moadel';
import { UserModule } from '../user/user.module';
import { SkillsSellerController } from './skills_seller.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skills]), UserModule],
  controllers: [SkillsController, SkillsSellerController],
  exports: [SkillsService],
  providers: [
    SkillsService,
    {
      provide: SkillsRepositoryImp,
      useClass: SkillsRepositoryImp,
    },
    {
      provide: CreateSkillsUseCase,
      useFactory: (skillRepo: ISkillsRepository) => {
        return new CreateSkillsUseCase(skillRepo);
      },
      inject: [SkillsRepositoryImp],
    },
    {
      provide: GetManySkillsUseCase,
      useFactory: (skillRepo: ISkillsRepository) => {
        return new GetManySkillsUseCase(skillRepo);
      },
      inject: [SkillsRepositoryImp],
    },
    {
      provide: GetSkillsByIdUseCase,
      useFactory: (skillRepo: ISkillsRepository) => {
        return new GetSkillsByIdUseCase(skillRepo);
      },
      inject: [SkillsRepositoryImp],
    },
    {
      provide: GetSkillsUseCase,
      useFactory: (skillRepo: ISkillsRepository) => {
        return new GetSkillsUseCase(skillRepo);
      },
      inject: [SkillsRepositoryImp],
    },
    {
      provide: GetOneSkillsUseCase,
      useFactory: (skillRepo: ISkillsRepository) => {
        return new GetOneSkillsUseCase(skillRepo);
      },
      inject: [SkillsRepositoryImp],
    },
    {
      provide: UpdateSkillsUseCase,
      useFactory: (skillRepo: ISkillsRepository) => {
        return new UpdateSkillsUseCase(skillRepo);
      },
      inject: [SkillsRepositoryImp],
    },
    {
      provide: DeleteSkillsUseCase,
      useFactory: (skillRepo: ISkillsRepository) => {
        return new DeleteSkillsUseCase(skillRepo);
      },
      inject: [SkillsRepositoryImp],
    },
    {
      provide: DeleteOneSkillsUseCase,
      useFactory: (skillRepo: ISkillsRepository) => {
        return new DeleteOneSkillsUseCase(skillRepo);
      },
      inject: [SkillsRepositoryImp],
    },
  ],
})
export class SkillsModule {}
