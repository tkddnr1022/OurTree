import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';
import { MealModule } from './meal/meal.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [TimetableModule, MealModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
