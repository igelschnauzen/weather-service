import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { PrismaService } from '../prisma.service';
import { ToponimicNamePipe } from '../pipes/lowercase-query-param.pipe';
import { UnauthorizedException } from '@nestjs/common';

@Controller()
export class WeatherController {
  constructor(private readonly WeatherService: WeatherService, private prisma: PrismaService) {}

  @Get("get/:city")
  async getWeather(@Param("city", ToponimicNamePipe) city: string): Promise<any> {
    return this.WeatherService.getWeatherFromDb(city);
  }

  @Get('cleanCache/:password')
  async cleanCache(@Param('password') password: string): Promise<any> {
    if (!this.WeatherService.validatePassword(password)) {
      throw new UnauthorizedException('Invalid password!');
    }
    return this.WeatherService.cleanCache();
  }

  @Get('cleanDb/:password')
  async cleanDb(@Param('password') password: string): Promise<any> {
    if (!this.WeatherService.validatePassword(password)) {
      throw new UnauthorizedException('Invalid password!');
    }
    return this.WeatherService.cleanDb();
  }
}
