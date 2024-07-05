import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimetableRow, TimetableRowSchema } from './timetableRow.schema';

@Schema()
export class Timetable extends Document {
    @Prop({ type: [TimetableRowSchema], required: true })
    row: TimetableRow[];

    @Prop()
    SD_SCHUL_CODE: string;

    @Prop()
    GRADE: string;

    @Prop()
    CLASS_NM: string;

    @Prop()
    ALL_TI_YMD: string;
}

export type TimetableDocument = Timetable & Document;
export const TimetableSchema = SchemaFactory.createForClass(Timetable);