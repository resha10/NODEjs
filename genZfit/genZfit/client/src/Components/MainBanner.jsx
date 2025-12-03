import React from "react";
import { useNavigate } from "react-router-dom";

const MainBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-[#f3e7db] to-[#e8dfd6] flex flex-col md:flex-row items-center justify-between md:px-20 px-6 py-16 md:py-24 border-b border-[#d9cfc3]">
      
      {/* Left Section - Text Content */}
      <div className="md:w-1/2 text-center md:text-left text-[#3b352e] space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide leading-tight">
          Elevate Your <span className="text-[#c08b65]">Home Aesthetic</span>
        </h1>

        <p className="text-[#6b6259] text-lg md:text-xl">
          Explore premium décor pieces crafted to bring warmth, elegance, 
          and personality to every corner of your home — where style meets comfort.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#c08b65] hover:bg-[#a97757] transition-all text-white font-semibold px-8 py-3 rounded-md shadow-md"
          >
            Shop Décor
          </button>

          <button
            onClick={() => navigate("/collections")}
            className="border border-[#c08b65] hover:bg-[#c08b65] hover:text-white text-[#c08b65] font-semibold px-8 py-3 rounded-md transition-all"
          >
            View Collections
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <div className="relative w-[85%] md:w-[70%] h-[420px] bg-gradient-to-br from-[#c08b65]/15 to-[#d9c1a9]/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">

          {/* Background overlay image */}
          <div className="absolute inset-0 bg-[url('/src/assets/home_decor_bg.jpg')] bg-cover bg-center opacity-60"></div>

          {/* Foreground Text */}
          <div className="relative z-10 text-center p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3b352e] mb-4 drop-shadow-sm">
              Style Your Space
            </h2>
            <p className="text-[#5a524b] font-medium">
              From wall décor to cozy accents — create a home that feels truly yours.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default MainBanner;
