import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ResponseDto } from '../global/responseDTO';
import { BypassAuth } from '../decorators/bypass.auth.decorator';

@Controller()
export class AppController {
  @BypassAuth()
  @Get()
  async appStart(): Promise<ResponseDto<any>> {
    const resp = 'An Event Calender App!';
    return new ResponseDto(HttpStatus.OK, 'App run successfully!', resp);
  }
}
