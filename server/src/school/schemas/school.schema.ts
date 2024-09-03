import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class School extends Document {
  @Prop()
  ATPT_OFCDC_SC_CODE: string;

  @Prop()
  ATPT_OFCDC_SC_NM: string;

  @Prop()
  SD_SCHUL_CODE: string;

  @Prop()
  SCHUL_NM: string;

  @Prop()
  ENG_SCHUL_NM: string;

  @Prop()
  SCHUL_KND_SC_NM: string;

  @Prop()
  LCTN_SC_NM: string;

  @Prop()
  JU_ORG_NM: string;

  @Prop()
  FOND_SC_NM: string;

  @Prop()
  ORG_RDNZC: string;

  @Prop()
  ORG_RDNMA: string;

  @Prop()
  ORG_RDNDA: string;

  @Prop()
  ORG_TELNO: string;

  @Prop()
  HMPG_ADRES: string;

  @Prop()
  COEDU_SC_NM: string;

  @Prop()
  ORG_FAXNO: string;

  @Prop()
  HS_SC_NM: string;

  @Prop()
  INDST_SPECL_CCCCL_EXST_YN: string;

  @Prop()
  HS_GNRL_BUSNS_SC_NM: string;

  @Prop()
  SPCLY_PURPS_HS_ORD_NM: string;

  @Prop()
  ENE_BFE_SEHF_SC_NM: string;

  @Prop()
  DGHT_SC_NM: string;

  @Prop()
  FOND_YMD: string;

  @Prop()
  FOAS_MEMRD: string;

  @Prop()
  LOAD_DTM: string;
}

export type SchoolDocument = School;
export const SchoolSchema = SchemaFactory.createForClass(School);
