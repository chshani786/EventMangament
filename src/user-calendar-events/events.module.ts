import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventsCalendar,
  EventsCalendarSchema,
} from '../models/events.calendar.model';
import { UsersService } from '../users/users.service';
import { FirebaseService } from '../firebase/firebase.service';
import { User, UserSchema } from '../models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventsCalendar.name, schema: EventsCalendarSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, FirebaseService, UsersService],
  exports: [EventsService, FirebaseService, UsersService],
})
export class EventsModule {}
