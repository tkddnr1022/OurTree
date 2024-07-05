import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ScheduleRow, ScheduleRowSchema } from './scheduleRow.schema';

@Schema()
export class Schedule extends Document {
    @Prop({ type: [ScheduleRowSchema], required: true })
    row: ScheduleRow[];

    @Prop()
    SD_SCHUL_CODE: string;

    @Prop()
    YEARMONTH: string;
}

export type ScheduleDocument = Schedule & Document;
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);