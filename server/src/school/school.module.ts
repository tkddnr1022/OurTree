import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolSchema } from './schemas/school.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'school', schema: SchoolSchema }])],
  controllers: [SchoolController],
  providers: [SchoolService]
})
export class SchoolModule { }
