import { Module } from '@nestjs/common';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { TimetableSchema } from './schemas/timetable.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'timetable', schema: TimetableSchema }]), ConfigModule],
  controllers: [TimetableController],
  providers: [TimetableService]
})
export class TimetableModule {}
