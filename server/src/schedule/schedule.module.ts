import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchema } from './schemas/schedule.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'schedule', schema: ScheduleSchema }]), ConfigModule],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class SchoolScheduleModule { }
