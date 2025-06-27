import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-3 sm:px-6 md:px-10 lg:px-20'>

            <div className='md:w-1/2 flex flex-col justify-center items-start gap-2 md:gap-4 py-8 md:py-10 md:mb-[-30px]'>
                <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Appointment <br/> with the best doctors
                </p>

                <div className='flex flex-col md:flex-row items-center gap-2 md:gap-3 text-white text-sm font-light'>
                    <img  className='w-20 sm:w-28' src={assets.group_profiles} alt="Logo" />
                    <p>
                        Browse through the profiles of our top doctors, <br className='hidden sm:block'/> and book your appointment today!
                    </p>
                </div>
                <a href="#speciality" className="flex items-center gap-2 bg-white text-grey-600 py-2 px-6 sm:py-3 sm:px-8 rounded-full text-xs sm:text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">
                    Book Appointment
                    <img className='w-3' src={assets.arrow_icon} alt="Arrow Right" />
                </a>
            </div>
        
            <div className='md:w-1/2 relative flex items-center justify-center mt-6 md:mt-0'>
                <img className='w-full max-w-xs sm:max-w-full h-auto rounded-lg object-contain' src={assets.header_img} alt="Header" />
            </div>
        </div>
    );
}
export default Header;