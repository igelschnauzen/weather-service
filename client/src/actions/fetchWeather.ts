interface WeatherData {
    name: string;
    current_temp: number;
    current_feels_like: number;
    lat: string;
    lon: string;
    createdAt: string;
    updatedAt: string;
}

//server action
export async function fetchWeather(city: string):Promise<any> {
    const response = await fetch(`http://localhost:3000/get/${city}`);

    return response;
}