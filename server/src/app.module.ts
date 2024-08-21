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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TimetableModule, 
    MealModule,
    SchoolModule, 
    SchoolScheduleModule, 
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${encodeURIComponent(configService.get<string>('MONGO_USERNAME'))}:${encodeURIComponent(configService.get<string>('MONGO_PASSWORD'))}@${configService.get<string>('MONGO_URI')}`,
      }),
      inject: [ConfigService],
    }),
    SwaggerModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
