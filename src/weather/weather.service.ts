import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCityDto } from '../dto/city.dto'; 
import { CacheService } from 'src/redis.service';

@Injectable()
export class WeatherService {
  constructor(
    private prisma: PrismaService,
    private readonly cacheService: CacheService
  ){}

  async geoCode(city: string): Promise<[number, number]> {
    //fetch the geocoding api, pass the city and get the coords

    const cachedCoords = await this.cacheService.get("coords:" + city);
    if (cachedCoords) {
      console.log("Cache hit! (coords)");
      return [Number(cachedCoords.split(",")[0]), Number(cachedCoords.split(",")[1])];
    }

    const geocodeQueryString: string = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=${process.env.WEATHERAPI_KEY}`;
    console.log(geocodeQueryString);

    try {
      const response = await fetch(geocodeQueryString).then(res => res.json());
      console.log(response); 

      const lat = response[0]["lat"];
      const lon = response[0]["lon"];

      await this.cacheService.set("coords:" + city, [lat, lon].toString()).then(() => console.log("cached!")); //caching the coords
      return [lat, lon];
    } catch (err) {
      console.error(err);
    }
    
  }

  async getWeather(lat: number, lon: number): Promise<string> {
    //get the weather by coords

    const weatherQueryString: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHERAPI_KEY}`;
    console.log(weatherQueryString);

    try {
      const response = await fetch(weatherQueryString);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch (err) {
      console.error(err);
    }
    return;
  }

  async fetchWeatherFromApi(city: string): Promise<any> {
    let geoCode = await this.geoCode(city);
    let weather: string;
    
    //timeout: 1 query/sec to openweatherapi if no paid subscription
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        weather = await this.getWeather(geoCode[0], geoCode[1]);
        resolve(weather);
      }, 1001);
    }); 
  }

  async getWeatherFromDb(city: string): Promise<object> {
    const cachedWeather = await this.cacheService.get("weather:" + city);
    if (cachedWeather) {
      console.log("Cache hit! (city)");
      return JSON.parse(cachedWeather);
    }

    let cityWeather = await this.prisma.city.findUnique({
      where: {
        name: city
      }
    });

    if(!(await cityWeather)) {
      let fetchedWeather = await this.fetchWeatherFromApi(city);

      let dto: CreateCityDto = new CreateCityDto(
        city, 
        fetchedWeather.main.temp, 
        fetchedWeather.main.feels_like, 
        fetchedWeather.main.humidity, 
        fetchedWeather.coord.lat,
        fetchedWeather.coord.lon 
      );

      cityWeather = await this.prisma.city.create({
        data: dto,
      });
    }
    await this.cacheService.set("weather:" + city, JSON.stringify(cityWeather), 3600); //caching the weather for 1 hour  

    return cityWeather;
  }

  validatePassword(password): boolean {
    return password === process.env.DATABASE_PASSWORD;
  }

  async cleanCache(): Promise<string> {
    console.log("Cache cleaned!");
    await this.cacheService.reset();
    return "Cache cleaned!";
  }

  async cleanDb(): Promise<string> {
    console.log("DB cleaned!");
    await this.prisma.city.deleteMany();
    return "DB cleaned!";
  }
}
