import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [WeatherController],
  providers: [WeatherService, PrismaService],
})
export class WeatherModule {}
