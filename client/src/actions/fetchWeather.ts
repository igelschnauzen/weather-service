interface WeatherData {
    name: string;
    current_temp: number;
    current_feels_like: number;
    current_humidity: number;
    lat: string;
    lon: string;
    createdAt: string;
    updatedAt: string;
}

export async function fetchWeather(city: string):Promise<WeatherData> {
    const response = await fetch(`http://localhost:3000/get/${city}`);

    if(!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const data: WeatherData = await response.json();
    return data;

}