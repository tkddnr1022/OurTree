import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolSchema } from './schemas/school.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'school', schema: SchoolSchema }]), ConfigModule],
  controllers: [SchoolController],
  providers: [SchoolService]
})
export class SchoolModule { }
