import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { UpdateService } from './update.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [WeatherController],
  providers: [WeatherService, UpdateService,PrismaService],
})
export class WeatherModule {}
