import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Chat extends Document {
  @Prop({ unique: true })
  id: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;
}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
