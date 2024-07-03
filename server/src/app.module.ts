import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';
import { MealModule } from './meal/meal.module';

@Module({
  imports: [TimetableModule, MealModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
