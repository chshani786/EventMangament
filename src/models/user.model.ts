import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  uid: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ default: null })
  fcm: string;

  @Prop({ default: Date })
  created_at: Date;

  @Prop({ default: Date })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
