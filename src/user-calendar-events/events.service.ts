import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import {
  EventsCalendar,
  EventsCalendarDocument,
} from '../models/events.calendar.model';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create.event.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(EventsCalendar.name)
    private eventCalendarModel: Model<EventsCalendarDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async createEvent(eventDto: CreateEventDto): Promise<any> {
    const user = await this.usersService.getLoggedInUser();
    if (
      !moment(eventDto.event_start_date, 'YYYY-MM-DDTHH:mm', true).isValid()
    ) {
      throw new BadRequestException(
        `Event start date time is not in correct format! (YYYY-MM-DDTHH:mm)`,
      );
    }
    if (!moment(eventDto.event_end_date, 'YYYY-MM-DDTHH:mm', true).isValid()) {
      throw new BadRequestException(
        `Event end date time is not in correct format! (YYYY-MM-DDTHH:mm)`,
      );
    }
    if (
      moment(eventDto.event_start_date) < moment() &&
      moment(eventDto.event_end_date) < moment()
    ) {
      throw new BadRequestException(
        'Start and End Date & Time must be select in future!',
      );
    }
    return new this.eventCalendarModel({ ...eventDto, user }).save();
  }

  async getAllEvents(): Promise<EventsCalendar[]> {
    const user = await this.usersService.getLoggedInUser();
    return this.eventCalendarModel.find({ user: user }).exec();
  }
}
