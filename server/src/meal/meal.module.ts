import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from './schemas/meal.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'meal', schema: MealSchema }]), ConfigModule],
  controllers: [MealController],
  providers: [MealService]
})
export class MealModule {}
