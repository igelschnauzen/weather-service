import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService){}

  async geoCode(city: string): Promise<[number, number]> {
    //fetch the geocoding api, pass the city and get the coords

    /*
    this.prisma.city.findUnique({
      where: {
        name: {
          equals: city,
        }
      }
    });
    */

    const geocodeQueryString: string = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHERAPI_KEY}`;
    console.log(geocodeQueryString);

    try {
      const response = await fetch(geocodeQueryString);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      const lat = json[0]["lat"];
      const lon = json[0]["lon"];
      console.log(lat, lon);
      return [lat, lon];
    } catch (err) {
      console.error(err);
    }
  }

  async getWeather(lat, lon): Promise<string> {
    //get the weather by coords
    const weatherQueryString: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHERAPI_KEY}`;
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

    return ;
  }

}
