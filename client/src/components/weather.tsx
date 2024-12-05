'use client';

import loupe from '@/assets/loupe.png';
import Image from 'next/image'
import { space_grotesk } from '@/assets/fonts';
import { fetchWeather } from '@/actions/fetchWeather';
import { ChangeEvent, useState } from 'react';
import React from 'react';

export default function Weather() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }

  const handleSearch = (city: string): any => {
    fetchWeather(city).then((data) => {
      setTemp(data.current_temp.toString() + "°C");
      setFeelsLike(data.current_feels_like.toString() + "°C");
      setHumidity(data.current_humidity.toString() + "%");
      setLastUpdated(data.updatedAt);
    }).catch((err) => {
      console.error(err);
    });
  }

    return (
      <div className={`${space_grotesk.className} antialiased bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md text-center`}>
        <input type='text' placeholder='City name' value={city} onChange={handleChange} className='border-2 rounded'></input>
        <button className='border-2 rounded m-1' onClick={() => handleSearch(city)}> <Image className="inline-block" src={loupe} width={20} height={20} alt='Find'/> </button>

        <div className="h-px bg-gray-200 my-4"></div>

        <p className="text-lg text-gray-600">Temperature: {temp}</p>
        <p className="text-lg text-gray-600">Feels Like: {feelsLike}</p>
        <p className="text-lg text-gray-600">Humidity: {humidity}</p>
        <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
      </div>
    );
}