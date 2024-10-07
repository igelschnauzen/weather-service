import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("get/:city")
  async getWeather(@Param("city") city: string): Promise<any> {
    let geoCode = await this.appService.geoCode(city);
    let weather = await this.appService.getWeather(geoCode[0], geoCode[1]);
    return weather;
  }
}
