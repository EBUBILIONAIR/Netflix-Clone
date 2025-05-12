import React from 'react';
import youtube_icon from '../assets/youtube_icon.png';
import twitter_icon from '../assets/twitter_icon.png';
import instagram_icon from '../assets/instagram_icon.png';
import facebook_icon from '../assets/facebook_icon.png';

const Footer = () => {
  return (
    <div className="bg-black text-[#757575] px-[4%] py-[30px] max-w-[1000px] mx-auto mt-12">
      {/* Icons */}
      <div className="flex gap-5 my-10">
        <img src={facebook_icon} alt="Facebook" className="w-[30px] sm:w-[25px] cursor-pointer" />
        <img src={instagram_icon} alt="Instagram" className="w-[30px] sm:w-[25px] cursor-pointer" />
        <img src={twitter_icon} alt="Twitter" className="w-[30px] sm:w-[25px] cursor-pointer" />
        <img src={youtube_icon} alt="YouTube" className="w-[30px] sm:w-[25px] cursor-pointer" />
      </div>

      {/* Links */}
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4 mb-8 text-sm sm:text-[14px] list-none">
        {[
          'Audio Description', 'Help Centre', 'Gift Cards', 'Media Centre',
          'Investor Relations', 'Jobs', 'Terms of Use', 'Privacy',
          'Legal Notices', 'Cookie Preferences', 'Corporate Information', 'Contact Us'
        ].map((item) => (
          <li key={item} className="cursor-pointer hover:underline">{item}</li>
        ))}
      </ul>

      {/* Copyright */}
      <p className="text-gray-500 text-sm">© 1997-2023 Netflix, Inc.</p>
    </div>
  );
};

export default Footer;
