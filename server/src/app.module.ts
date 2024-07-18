import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';
import { MealModule } from './meal/meal.module';
import { SchoolScheduleModule } from './schedule/schedule.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolModule } from './school/school.module';
import { ConfigModule } from '@nestjs/config';

const username = encodeURIComponent("ourtree");
const password = encodeURIComponent("@e848048");

@Module({
  imports: [
    TimetableModule, 
    MealModule,
    SchoolModule, 
    SchoolScheduleModule, 
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${username}:${password}@cluster0.ry1jhyz.mongodb.net/ourtree?retryWrites=true&w=majority&appName=Cluster0`),
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
