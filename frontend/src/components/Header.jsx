import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>

            <div className='md-1/2 flex flex-col justify-center items-start gap-4 py-10 md:py-[-10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Appointment <br/> with the best doctors
                </p>

                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img  className='w-28' src={assets.group_profiles} alt="Logo" />
                    <p>
                        Browse through the profiles of our top doctors, <br className='hidden sm:block'/> and book your appointment today!
                    </p>
                </div>
                <a href="#speciality" className="flex items-center gap-2 bg-white text-grey-600 py-3 px-8 rounded-full text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">
                    Book Appointment
                    <img className='w-3' src={assets.arrow_icon} alt="Arrow Right" />
                </a>
            </div>
        
            <div className='md:w-1/2 relative flex items-center justify-center'>
                <img className='w-full max-w-full h-auto rounded-lg object-contain' src={assets.header_img} alt="Header" />
            </div>
        </div>
    );
}
export default Header;