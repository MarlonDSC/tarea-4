import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authorId: string;

  @Prop()
  publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
