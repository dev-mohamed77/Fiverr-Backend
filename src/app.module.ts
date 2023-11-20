import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './application/common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './presentation/user/user.module';
import { AuthModule } from './presentation/auth/auth.module';
import { SellerModule } from './presentation/seller/seller.module';
import { LanguageModule } from './presentation/language/language.module';
import { OccupationModule } from './presentation/occupation/occupation.module';
import { SkillsModule } from './presentation/skills/skills.module';
import { CategoriesModule } from './presentation/categories/categories.module';
import { SubCategoriesModule } from './presentation/sub-categories/sub-categories.module';
import { GigModule } from './presentation/gig/gig.module';
import { GigImagesModule } from './presentation/gig-images/gig-images.module';
import { FavoriteModule } from './presentation/favorite/favorite.module';
import { ReviewModule } from './presentation/review/review.module';
import { OrderModule } from './presentation/order/order.module';
import { ConversationModule } from './presentation/conversation/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    SellerModule,
    LanguageModule,
    OccupationModule,
    SkillsModule,
    CategoriesModule,
    SubCategoriesModule,
    GigModule,
    GigImagesModule,
    FavoriteModule,
    ReviewModule,
    OrderModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
