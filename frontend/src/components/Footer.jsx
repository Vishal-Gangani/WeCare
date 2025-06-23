import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';

const Footer = () => {
    return (
        <div className="py-10 px-4 mt-10 bg-white border-gray-200">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                
                {/* Column 1: Logo and tagline (takes 2 columns) */}
                <div className="md:col-span-2 flex flex-col items-start space-y-2">
                    <img src={assets.logo} alt="WeCare Logo" className="w-32 mb-2" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                        Your trusted healthcare companion. Book appointments with top doctors anytime, anywhere.
                        WeCare is dedicated to simplifying healthcare access by connecting patients with certified professionals and providing tools for seamless care management.
                    </p>
                </div>

                {/* Column 2: Company info */}
                <div className="flex flex-col items-start space-y-2 pl-10">
                    <p className="font-semibold text-gray-800">Company</p>
                    <ul className="text-gray-600 text-sm space-y-1 pt-2">
                        <li className="hover:text-green-600 cursor-pointer">Home</li>
                        <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
                        <li className="hover:text-green-600 cursor-pointer">About Us</li>
                        <li className="hover:text-green-600 cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Column 3: Contact info */}
                <div className="flex flex-col items-start space-y-2">
                    <p className="font-semibold text-gray-800">Get in Touch</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                        <li>📞 +1 234 567 890</li>
                        <li>📧 support@wecare.com</li>
                        <li>📍 123 Health Ave, Wellness City</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-300">
                <p className="text-center text-gray-500 text-xs">
                    &copy; {new Date().getFullYear()} WeCare. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
