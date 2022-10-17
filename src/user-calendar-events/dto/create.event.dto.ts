import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  event_title: string;

  @IsString()
  event_description: string;

  @IsDefined()
  @IsNotEmpty()
  event_start_date: string;

  @IsDefined()
  @IsNotEmpty()
  event_end_date: string;
}
