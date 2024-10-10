import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { UpdateService } from './update.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register({
    ttl: 1000 * 60 * 60 * 24 * 7, //in ms, 1 week
    max: 1000, //max items in cache
  })],
  controllers: [WeatherController],
  providers: [WeatherService, UpdateService,PrismaService],
})
export class WeatherModule {}
