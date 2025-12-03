import React from "react";

const About = () => {
  return (
    <section className="bg-[#f2f6f8] py-16 px-6 md:px-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
          About <span className="text-[#ff5a3c]">GenzFit</span> Gym
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-10">
          Welcome to GenzFit — where passion meets performance. We’re dedicated to helping you reach your fitness goals with personalized programs, top-notch equipment, and a motivating environment.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-[#ff5a3c] mb-4">
            Why Choose Us?
          </h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li>💪 Expert personal trainers & fitness coaches</li>
            <li>🏋️‍♂️ State-of-the-art gym equipment & facilities</li>
            <li>🌱 Wellness-focused programs for all fitness levels</li>
            <li>🎯 Goal-oriented training plans & support</li>
          </ul>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gradient-to-br from-[#ff5a3c]/20 to-[#ff9470]/10 hover:scale-105 transition-transform duration-300">
          <div className="w-full h-80 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Approach</h3>
              <p className="text-gray-600">Where discipline meets motivation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto mt-16 text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-[#ff5a3c] mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At GenzFit, our mission is to empower individuals to lead healthier, stronger lives. We combine expert coaching, cutting-edge equipment, and a motivating environment so you can push your limits and achieve your personal best.
        </p>
      </div>

      {/* Contact */}
      <div className="max-w-5xl mx-auto mt-16 text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-[#ff5a3c] mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 text-lg space-y-2">
          📞 +91 98765 43210 <br />
          📧 support@genzfit.com <br />
          📍 Ahmedabad, Gujarat, India
        </p>
      </div>
    </section>
  );
};

export default About;
