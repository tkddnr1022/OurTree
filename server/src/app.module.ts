import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';
import { MealModule } from './meal/meal.module';
import { SchoolScheduleModule } from './schedule/schedule.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TimetableModule, 
    MealModule, 
    SchoolScheduleModule, 
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
