import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { PrismaService } from '../prisma.service';
import { UpdateService } from './update.service';
import { CacheService } from '../redis.service';

describe('WeatherController', () => {
  let controller: WeatherController;
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService, UpdateService, PrismaService, CacheService],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return coords for a city', async () => {
    const city = "Istanbul";
    const coords = await service.geoCode(city);
    expect(coords).toEqual([41.0091982, 28.9662187]);
  });

  it('should return weather for a city', async () => {
    const lat = 41.0082;
    const lon = 28.9784;
    const weather = await service.getWeather(lat, lon);
    expect(weather).toBeDefined()
  });

  it('should return weather data from api', async () => {
    const city = "Istanbul";
    const weather = await service.fetchWeatherFromApi(city);
    expect(weather).toBeDefined();
  });

  it('should return weather data from db', async () => {
    const city = "Istanbul";    
    const weather = await service.getWeatherFromDb(city);
    expect(weather).toBeDefined();
  });
});