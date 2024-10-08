import {IsInt, isNumber, IsNumber, IsString} from "class-validator";

export class createCityDto {
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
}