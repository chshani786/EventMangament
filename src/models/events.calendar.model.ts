import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import * as mongoose from 'mongoose';

export type EventsCalendarDocument = EventsCalendar & Document;
@Schema()
export class EventsCalendar {
  @Prop()
  event_title: string;

  @Prop()
  event_description: string;

  @Prop()
  event_start_date: Date;

  @Prop()
  event_end_date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const EventsCalendarSchema =
  SchemaFactory.createForClass(EventsCalendar);
