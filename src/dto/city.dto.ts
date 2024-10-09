import {IsInt, isNumber, IsNumber, IsString} from "class-validator";

export class CreateCityDto {
    
    @IsString()
    name: string

    @IsInt()
    current_temp: number

    @IsInt()
    current_feels_like: number

    @IsInt()
    current_humidity: number

    @IsNumber()
    lat: number

    @IsNumber()
    lon: number

    constructor(name, current_temp, current_feels_like, current_humidity, lat, lon) {
        this.name = name;
        this.current_temp = current_temp;
        this.current_feels_like = current_feels_like;
        this.current_humidity = current_humidity;
        this.lat = lat;
        this.lon = lon;
    }
}