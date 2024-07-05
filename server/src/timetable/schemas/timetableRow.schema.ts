import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TimetableRow extends Document {
  @Prop({ required: true })
  ATPT_OFCDC_SC_CODE: string;

  @Prop({ required: true })
  ATPT_OFCDC_SC_NM: string;

  @Prop({ required: true })
  SD_SCHUL_CODE: string;

  @Prop({ required: true })
  SCHUL_NM: string;

  @Prop({ required: true })
  AY: string;

  @Prop({ required: true })
  SEM: string;

  @Prop({ required: true })
  ALL_TI_YMD: string;

  @Prop({ required: true })
  DGHT_CRSE_SC_NM: string;

  @Prop({ required: true })
  ORD_SC_NM: string;

  @Prop({ required: true })
  DDDEP_NM: string;

  @Prop({ required: true })
  GRADE: string;

  @Prop({ required: true })
  CLRM_NM: string;

  @Prop({ required: true })
  CLASS_NM: string;

  @Prop({ required: true })
  PERIO: string;

  @Prop({ required: true })
  ITRT_CNTNT: string;

  @Prop({ required: true })
  LOAD_DTM: string;
}

export type TimetableRowDocument = TimetableRow & Document;
export const TimetableRowSchema = SchemaFactory.createForClass(TimetableRow);
