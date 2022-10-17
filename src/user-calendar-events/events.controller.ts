import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ResponseDto } from '../global/responseDTO';
import { CreateEventDto } from './dto/create.event.dto';
import { EventsService } from './events.service';
import { EventsCalendar } from '../models/events.calendar.model';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<ResponseDto<any>> {
    const resp = await this.eventsService.createEvent(createEventDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Event has been created',
      data: resp,
    };
  }

  @Get()
  async getAllEvents(): Promise<ResponseDto<EventsCalendar[]>> {
    const resp = await this.eventsService.getAllEvents();
    return {
      statusCode: HttpStatus.OK,
      message: 'All events has been shown!',
      data: resp,
    };
  }
}
