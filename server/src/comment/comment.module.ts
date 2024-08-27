import { CounterModule } from '../counter/counter.module';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [CounterModule, ArticleModule, MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }])],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
