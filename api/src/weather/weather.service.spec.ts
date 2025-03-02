import { Test, TestingModule } from "@nestjs/testing";
import { UpdateService } from "./update.service";
import { PrismaService } from "../prisma.service";
import { CacheService } from "../redis.service";
import { ConfigModule } from "@nestjs/config";
import { WeatherService } from "./weather.service";

describe("WeatherService", () => {
    let service: WeatherService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot()], // загрузка .env файла
            providers: [WeatherService, UpdateService, PrismaService, CacheService],
        }).compile();
    
        service = module.get<WeatherService>(WeatherService);
    });
        
    it("should return coords for a city", async () => {
        const city = "Istanbul";
        const coords = await service.geoCode(city);
        expect(coords).toEqual([41.0091982, 28.9662187]);
    });
    
    it("should return weather for a city", async () => {
        const lat = 41.0082;
        const lon = 28.9784;
        const weather = await service.getWeather(lat, lon);
        expect(typeof weather).toBe("object");
    });
    
    it("should return weather data from api", async () => {
        const city = "Istanbul";
        const weather = await service.fetchWeatherFromApi(city);
        expect(typeof weather).toBe("object");
    });
});