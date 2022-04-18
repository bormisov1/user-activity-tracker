import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Track {
  @Prop()
  event: string;

  @Prop([String])
  tags: string[];

  @Prop()
  url: string;

  @Prop()
  title: string;

  @Prop()
  ts: string;
}

export type TrackDocument = Track & Document;
export const TrackSchema = SchemaFactory.createForClass(Track);
