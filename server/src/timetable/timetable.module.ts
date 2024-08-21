import { Module } from '@nestjs/common';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { TimetableSchema } from './schemas/timetable.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'timetable', schema: TimetableSchema }])],
  controllers: [TimetableController],
  providers: [TimetableService]
})
export class TimetableModule {}
