import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MealRow, MealRowSchema } from './mealRow.schema';

@Schema()
export class Meal extends Document {
    @Prop({ type: [MealRowSchema], required: true })
    row: MealRow[];

    @Prop()
    SD_SCHUL_CODE: string;

    @Prop()
    MLSV_YMD: string;
}

export type MealDocument = Meal & Document;
export const MealSchema = SchemaFactory.createForClass(Meal);