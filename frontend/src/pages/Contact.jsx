import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[400px]' src={assets.contact_image} alt="Contact Us" />

        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-600'>123 Main Street <br />Cityville, ST 12345</p>
          <p className='text-gray-600'>Phone: (123) 456-7890 <br />Email: contact@wecare.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at WeCare</p>
          <p className='text-gray-600'>Learn more about our job openings and how you can join our team.</p>
          <button className=' border border-gray-300 px-4 py-2 rounded hover:bg-primary hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact