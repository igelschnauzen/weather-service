"use client";
import { FC } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import darkmode from '@/assets/darkmode.png';
import lightmode from '@/assets/lightmode.png';

const ThemeSwitcher: FC = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button 
            onClick={toggleTheme} 
            className={`absolute top-2 left-2 p-1 flex rounded-xl cursor-pointer shadow-lg ${
                theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'
            }`}
        >
            {theme === 'light' ? 
                <Image src={darkmode} alt="Dark" className='inline-block' width={20}/> :
                <Image src={lightmode} alt="Light" className='inline-block' width={20}/>
            }
        </button>
    );
};

export default ThemeSwitcher;