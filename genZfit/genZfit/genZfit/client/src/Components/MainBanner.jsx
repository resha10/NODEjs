import React from "react";
import { useNavigate } from "react-router-dom";

const MainBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black flex flex-col md:flex-row items-center justify-between md:px-20 px-6 py-16 md:py-24 border-b border-gray-800">
      {/* Left Section - Text Content */}
      <div className="md:w-1/2 text-center md:text-left text-white space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight">
          Gear Up With <span className="text-[#ff4500]">GenZ Fit</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Discover premium gym wear & accessories designed for ultimate
          performance, comfort, and style — made for the modern athlete.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#ff4500] hover:bg-[#e03e00] transition-all text-white font-semibold px-8 py-3 rounded-md shadow-lg"
          >
            Shop Now
          </button>

          <button
            onClick={() => navigate("/collections")}
            className="border border-[#ff4500] hover:bg-[#ff4500] hover:text-white text-[#ff4500] font-semibold px-8 py-3 rounded-md transition-all"
          >
            View Collections
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <div className="relative w-[85%] md:w-[70%] h-[420px] bg-gradient-to-br from-[#ff4500]/20 to-[#ff8c00]/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
          {/* Background overlay image */}
          <div className="absolute inset-0 bg-[url('/src/assets/gym_banner_bg.png')] bg-cover bg-center opacity-50"></div>

          {/* Foreground Text */}
          <div className="relative z-10 text-center p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase drop-shadow-md">
              Strength Meets Style
            </h2>
            <p className="text-gray-200 font-medium">
              From gym bags to performance wear — level up your training game.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
