import { CounterModule } from '../counter/counter.module';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schemas/article.schema';

@Module({
  imports: [CounterModule, MongooseModule.forFeature([{ name: 'article', schema: ArticleSchema }])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
