'use client';

import loupe from '@/assets/loupe.png';
import Image from 'next/image'
import { space_grotesk } from '@/assets/fonts';
import { fetchWeather } from '@/actions/fetchWeather';
import { ChangeEvent, useState } from 'react';
import React from 'react';

export default function Weather() {
  const [city, setCity] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }

    return (
      <div className={`${space_grotesk.className} antialiased bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md text-center`}>
        <input type='text' placeholder='City name' value={city} onChange={handleChange} className='border-2 rounded'></input>
        <button className='border-2 rounded m-1' onClick={() => fetchWeather(city)}> <Image className="inline-block" src={loupe} width={20} height={20} alt='Find'/> </button>

        <div className="h-px bg-gray-200 my-4"></div>

        <p className="text-lg text-gray-600">Temperature: 25°C</p>
        <p className="text-lg text-gray-600">Feels Like: 27°C</p>
        <p className="text-lg text-gray-600">Humidity: 60%</p>
        <p className="text-sm text-gray-500">Last Updated: 2024-12-04 12:00</p>
      </div>
    );
}