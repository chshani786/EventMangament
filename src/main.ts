import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import { registerGlobals } from './register.globals';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await registerGlobals(app);
  await app.listen(3000);
}
bootstrap();
