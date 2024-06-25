import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';

@Module({
  imports: [TimetableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
