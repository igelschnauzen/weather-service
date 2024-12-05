import { NestFactory } from '@nestjs/core';
import { WeatherModule } from './weather/weather.module';

async function bootstrap() {
  const app = await NestFactory.create(WeatherModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
