import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ToponimicNamePipe } from './pipes/lowercase-query-param.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}

  @Get("get/:city")
  async getWeather(@Param("city", ToponimicNamePipe) city: string): Promise<any> {
    return this.appService.getWeatherFromDb(city);
  }
}
