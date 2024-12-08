'use client';
import loupe from '@/assets/loupe.png';
import Image from 'next/image';
import { space_grotesk } from '@/assets/fonts';
import { fetchWeather } from '@/actions/fetchWeather';
import { ChangeEvent, useState } from 'react';
import React from 'react';
import { FC } from 'react';
import { useTheme } from '@/context/ThemeContext';

const Weather: FC = () => {
  const { theme } = useTheme();

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
      <div className={`${space_grotesk.className} antialiased rounded-xl shadow-lg p-6 w-11/12 max-w-md text-center 
      ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}
      `}>
        <input
          type='text'
          placeholder='City name'
          value={city} onChange={handleChange}
          onKeyUp={handleKeyPress}
          className={`border-2 rounded-md m-1 w-48 p-1 ${theme === 'light' ? 'bg-white text-black border-gray-200' : 'bg-gray-800 text-white border-gray-500'}`}
        />
        
        <button 
          className={`border-2 rounded-md p-1 inline-block ${loading ? 'bg-gray-200 cursor-default' : ''}
          ${theme === 'light' ? 'bg-white text-black border-gray-200' : 'bg-gray-800 text-white border-gray-500'}
          `}
          onClick={() => handleSearch(city)}
          disabled={loading}
        >
          <Image className={`inline-block ${loading ? "opacity-50" : ""}`} src={loupe} width={17} alt='Find'/> 
        </button>

        <div className={ `h-px my-4 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-600'}` }></div>

        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} text-lg`}>Temperature: {temp}</p>
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} text-lg`}>Feels Like: {feelsLike}</p>
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} text-lg`}>Humidity: {humidity}</p>
        <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} text-sm`}>Last Updated: {lastUpdated}</p>
      </div>
    );
}

export default Weather;