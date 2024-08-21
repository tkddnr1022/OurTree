import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterSchema } from './schemas/counter.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'counter', schema: CounterSchema }])],
  providers: [CounterService],
  exports: [CounterService]
})
export class CounterModule {}
