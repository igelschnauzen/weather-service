import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}

  @Get("get/:city")
  async getWeather(@Param("city") city: string): Promise<any> {
    return this.appService.getWeatherFromDb(city);
  }
}
