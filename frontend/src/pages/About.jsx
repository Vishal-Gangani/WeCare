import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='px-2 sm:px-0'>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-6 md:gap-12'>
        <div className="w-full max-w-xs md:max-w-[400px] aspect-[4/3] mx-auto md:mx-0 flex-shrink-0">
          <img className='w-full h-full object-cover rounded-xl shadow-lg' src={assets.about_image} alt="About Us" />
        </div>
        <div className='flex flex-col justify-center gap-6 md:gap-8 md:w-2/4 text-gray-800 text-base bg-white p-4 md:p-8 rounded-xl shadow-md'>
          <p className='text-lg font-semibold'>Welcome to WeCare, your trusted healthcare platform that connects patients with qualified medical professionals. We understand that finding the right healthcare provider can be challenging, which is why we've created a seamless online experience for all your medical needs.</p>
          <p className='text-base'>We are dedicated to providing the best care for you and your loved ones through our network of experienced doctors across various specialties including General Physicians, Dermatologists, Pediatricians, Gynecologists, Neurologists, and Gastroenterologists. Our platform makes it easy to find the right doctor and book appointments at your convenience.</p>
          <b className='text-primary mt-2 mb-1'>Our Vision</b>
          <p className='text-base'>Our team of professionals is here to support you every step of the way, from finding the right specialist to scheduling appointments and following up on your care. We prioritize your health and well-being by ensuring all our doctors are verified and maintain high standards of medical care.</p>
        </div>
      </div>

      <div className='text-xl text-grey-400 my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4 md:gap-0'>
        <div className='border px-6 py-6 md:px-12 md:py-10 flex flex-col gap-3 md:gap-5 text-[-15px] hover:bg-primary hover:text-white text-gray-600 cursor-pointer duration-300'>
          <b>Comprehensive Care</b>
          <p>We offer a wide range of medical services to meet all your healthcare needs.</p>
        </div>
        <div className='border px-6 py-6 md:px-12 md:py-10 flex flex-col gap-3 md:gap-5 text-[-15px] hover:bg-primary hover:text-white text-gray-600 cursor-pointer duration-300'>
          <b>Personalized Approach</b>
          <p>We believe in a personalized approach to healthcare, ensuring you receive the best possible care.</p>
        </div>
        <div className='border px-6 py-6 md:px-12 md:py-10 flex flex-col gap-3 md:gap-5 text-[-15px] hover:bg-primary hover:text-white text-gray-600 cursor-pointer duration-300'>
          <b>Expert Doctors</b>
          <p>Our platform features a diverse range of qualified medical professionals.</p>
        </div>
      </div>

    </div>
  )
}

export default About