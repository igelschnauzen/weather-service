import { 
  Controller, 
  Get, 
  Param, 
  UseInterceptors 
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { WeatherService } from './weather.service';
import { PrismaService } from '../prisma.service';
import { ToponimicNamePipe } from '../pipes/lowercase-query-param.pipe';

@Controller()
export class WeatherController {
  constructor(private readonly WeatherService: WeatherService, private prisma: PrismaService) {}

  @UseInterceptors(CacheInterceptor)
  @Get("get/:city")
  async getWeather(@Param("city", ToponimicNamePipe) city: string): Promise<any> {
    return this.WeatherService.getWeatherFromDb(city);
  }

  @Get("cleanCache")
  async cleanCache(): Promise<any> {
    return this.WeatherService.cleanCache();
  }

  @Get("cleanDb")
  async cleanDb(): Promise<any> {
    return this.WeatherService.cleanDb();
  }
}
