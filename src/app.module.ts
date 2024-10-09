import { Module } from "@nestjs/common";
import { WeatherModule } from "./weather/weather.module";

@Module({
    imports: [WeatherModule],
    providers: []
})
export class AppModule{};