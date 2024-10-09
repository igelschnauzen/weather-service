import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { PrismaService } from '../prisma.service';
import { ToponimicNamePipe } from '../pipes/lowercase-query-param.pipe';

@Controller()
export class WeatherController {
  constructor(private readonly WeatherService: WeatherService, private prisma: PrismaService) {}

  @Get("get/:city")
  async getWeather(@Param("city", ToponimicNamePipe) city: string): Promise<any> {
    return this.WeatherService.getWeatherFromDb(city);
  }
}
