import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseService } from './modules/firebase/firebase.service';
import { AuthGuard } from './global/guards/auth.guard';
import * as bodyParser from 'body-parser';

export async function registerGlobals(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const reflector = app.get(Reflector);
  await FirebaseService.initApp();
  app.useGlobalGuards(new AuthGuard(reflector));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
}
