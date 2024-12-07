'use client';

import loupe from '@/assets/loupe.png';
import Image from 'next/image';
import { space_grotesk } from '@/assets/fonts';
import { fetchWeather } from '@/actions/fetchWeather';
import { ChangeEvent, useState } from 'react';
import React from 'react';
import { FC } from 'react';

const Weather: FC = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }

  const handleSearch = async (city: string) => {
    setLoading(true);
    try {
      const data = await fetchWeather(city);
      setTemp(data.current_temp.toString() + "°C");
      setFeelsLike(data.current_feels_like.toString() + "°C");
      setHumidity(data.current_humidity.toString() + "%");
      setLastUpdated(data.updatedAt);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch(city);
    }
  }

    return (
      <div className={`${space_grotesk.className} antialiased bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md text-center`}>
        <input
          type='text'
          placeholder='City name'
          value={city} onChange={handleChange}
          onKeyUp={handleKeyPress}
          className='border-2 rounded'
        />
        
        <button 
          className={`border-2 rounded m-1 w-6 inline-block ${loading ? 'bg-gray-200 cursor-default' : ''}`}
          onClick={() => handleSearch(city)}
          disabled={loading}
        >
          <Image className={`inline-block ${loading ? "opacity-50" : ""}`} src={loupe} width={15} alt='Find'/> 
        </button>

        <div className="h-px bg-gray-200 my-4"></div>

        <p className="text-lg text-gray-600">Temperature: {temp}</p>
        <p className="text-lg text-gray-600">Feels Like: {feelsLike}</p>
        <p className="text-lg text-gray-600">Humidity: {humidity}</p>
        <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
      </div>
    );
}

export default Weather;