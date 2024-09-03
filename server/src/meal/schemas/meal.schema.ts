import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Meal extends Document {
  @Prop({ required: true })
  ATPT_OFCDC_SC_CODE: string;

  @Prop({ required: true })
  ATPT_OFCDC_SC_NM: string;

  @Prop({ required: true })
  SD_SCHUL_CODE: string;

  @Prop({ required: true })
  SCHUL_NM: string;

  @Prop({ required: true })
  MMEAL_SC_CODE: string;

  @Prop({ required: true })
  MMEAL_SC_NM: string;

  @Prop({ required: true })
  MLSV_YMD: string;

  @Prop({ required: true })
  MLSV_FGR: number;

  @Prop({ required: true })
  DDISH_NM: string;

  @Prop({ required: true })
  ORPLC_INFO: string;

  @Prop({ required: true })
  CAL_INFO: string;

  @Prop({ required: true })
  NTR_INFO: string;

  @Prop({ required: true })
  MLSV_FROM_YMD: string;

  @Prop({ required: true })
  MLSV_TO_YMD: string;

  @Prop({ required: true })
  LOAD_DTM: string;
}

export type MealDocument = Meal & Document;
export const MealSchema = SchemaFactory.createForClass(Meal);
