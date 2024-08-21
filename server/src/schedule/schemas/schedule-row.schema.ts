import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ScheduleRow extends Document {
  @Prop({ required: true })
  ATPT_OFCDC_SC_CODE: string;

  @Prop({ required: true })
  SD_SCHUL_CODE: string;

  @Prop({ required: true })
  AY: string;

  @Prop({ required: true })
  AA_YMD: string;

  @Prop({ required: true })
  ATPT_OFCDC_SC_NM: string;

  @Prop({ required: true })
  SCHUL_NM: string;

  @Prop({ required: true })
  DGHT_CRSE_SC_NM: string;

  @Prop({ required: true })
  SCHUL_CRSE_SC_NM: string;

  @Prop({ required: true })
  EVENT_NM: string;

  @Prop({ required: false })
  EVENT_CNTNT: string;

  @Prop({ required: true })
  ONE_GRADE_EVENT_YN: string;

  @Prop({ required: true })
  TW_GRADE_EVENT_YN: string;

  @Prop({ required: true })
  THREE_GRADE_EVENT_YN: string;

  @Prop({ required: true })
  FR_GRADE_EVENT_YN: string;

  @Prop({ required: true })
  FIV_GRADE_EVENT_YN: string;

  @Prop({ required: true })
  SIX_GRADE_EVENT_YN: string;

  @Prop({ required: true })
  SBTR_DD_SC_NM: string;

  @Prop({ required: true })
  LOAD_DTM: string;
}

export type ScheduleRowDocument = ScheduleRow & Document;
export const ScheduleRowSchema = SchemaFactory.createForClass(ScheduleRow);
