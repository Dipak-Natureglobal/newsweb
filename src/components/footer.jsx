import dayjs from 'dayjs';
import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
    return (
        <footer className="bg-[#0d1114] text-white/70 py-6 mt-10">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-6">

                {/* Left Section - Developer Info */}
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-4 sm:mb-0">
                    <p className="text-gray-400">Developed by 
                        <a href="https://dipakdev.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-500 font-bold ml-1">
                            Dipak
                        </a>
                    </p>
                </div>

                {/* Center Section - Copyright and Contact */}
                <div className="text-center mb-4 sm:mb-0">
                    <p className="text-sm my-1">
                        Copyright © {dayjs().year()} InsightPress
                    </p>
                    <a href="mailto:dipakmourya2000@gmail.com">
                        <p className="text-sm hover:text-white flex items-center justify-center">
                            <MailIcon className="mr-2" /> dipakmourya2000@gmail.com
                        </p>
                    </a>
                    <a href="tel:+918910171611">
                        <p className="text-sm my-1 hover:text-white flex items-center justify-center">
                            <CallIcon className="mr-2" /> +91 8910171611
                        </p>
                    </a>
                </div>

                {/* Right Section - Contact Links */}
                <div className="flex flex-col sm:flex-row space-x-4 justify-center items-center sm:justify-end sm:mt-0 mt-4">
                <ul className="flex items-center gap-5 xl:my-0 mt-3">
                <li>
                <a href="https://github.com/Dipak-Mourya" target="_blank" rel="noopener noreferrer">
                   <GitHubIcon fontSize="medium" className="hover:text-white"/>
                </a>

                </li>
               
                <li>
                  <a href="https://www.linkedin.com/in/dipak-mourya-429204210" rel="noopener noreferrer" target="_blank">
                   <LinkedInIcon fontSize="medium" className="hover:text-blue-600"/>
                  </a>
                </li>
                <li>
                <a href="https://wa.me/+918910171611?text=Hi!" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon fontSize="medium" className="hover:text-green-500"/>
                </a>
                </li>
               
               
              </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
