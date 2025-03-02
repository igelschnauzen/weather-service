import { Test, TestingModule } from "@nestjs/testing";
import { UpdateService } from "./update.service";
import { PrismaService } from "../prisma.service";
import { CacheService } from "../redis.service";
import { ConfigModule } from "@nestjs/config";
import { WeatherService } from "./weather.service";
import { WeatherController } from "./weather.controller";
import e from "express";

describe("WeatherController", () => {
    let controller: WeatherController;
    let service: WeatherService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot()], // загрузка .env файла
            controllers: [WeatherController],
            providers: [WeatherService, UpdateService, PrismaService, CacheService],
        }).compile();
    
        service = module.get<WeatherService>(WeatherService);
        controller = module.get<WeatherController>(WeatherController);
    });

    it("should return weather for the city", async () => {
        const city = "Warsaw";
        const weather = await controller.getWeather(city);

        expect(weather.name).toBe("Warsaw");
        expect(typeof weather.current_temp).toBe("number");
        expect(typeof weather.current_feels_like).toBe("number");
        expect(typeof weather.current_humidity).toBe("number");
        expect(typeof weather.lat).toBe("string");
        expect(typeof weather.lon).toBe("string");
        expect(typeof weather.createdAt).toBe("string");
    });
});