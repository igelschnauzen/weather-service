import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCityDto } from './city.dto'; 

@Injectable()
export class WeatherService {
  constructor(private prisma: PrismaService){}

  async geoCode(city: string): Promise<[number, number]> {
    //fetch the geocoding api, pass the city and get the coords

    const geocodeQueryString: string = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=${process.env.WEATHERAPI_KEY}`;
    console.log(geocodeQueryString);

    try {
      const response = await fetch(geocodeQueryString).then(res => res.json());
      console.log(response);
      const lat = response[0]["lat"];
      const lon = response[0]["lon"];
      return [lat, lon];
    } catch (err) {
      console.error(err);
    }
  }

  async getWeather(lat, lon): Promise<string> {
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

    return cityWeather;
  }
}
