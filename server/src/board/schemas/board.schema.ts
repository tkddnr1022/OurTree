import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Board extends Document {
  @Prop({ unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ required: true, default: 0 })
  postCount: number;
}

export type BoardDocument = Board & Document;
export const BoardSchema = SchemaFactory.createForClass(Board);
