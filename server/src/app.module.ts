import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';
import { MealModule } from './meal/meal.module';
import { SchoolScheduleModule } from './schedule/schedule.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolModule } from './school/school.module';
import { SwaggerModule } from '@nestjs/swagger';
import { BoardModule } from './board/board.module';
import { CounterModule } from './counter/counter.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { ChatModule } from './chat/chat.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${encodeURIComponent(configService.get<string>('MONGO_USERNAME'))}:${encodeURIComponent(configService.get<string>('MONGO_PASSWORD'))}@${configService.get<string>('MONGO_URI')}`,
      }),
      inject: [ConfigService],
    }),
    SwaggerModule,
    EventEmitterModule.forRoot(),
    TimetableModule, 
    MealModule,
    SchoolModule, 
    SchoolScheduleModule, 
    CounterModule,
    BoardModule,
    ArticleModule,
    CommentModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
