import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  const footerLinks = [
    {
      title: "Information",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Our Craftsmanship", url: "/our-story" },
        { text: "Privacy Policy", url: "/privacy" },
        { text: "Terms & Conditions", url: "/terms" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { text: "Shipping Policy", url: "/shipping" },
        { text: "Returns & Exchanges", url: "/returns" },
        { text: "FAQs", url: "/faqs" },
        { text: "Track Order", url: "/track-order" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Email: support@homeaura.com", url: "mailto:support@homeaura.com" },
        { text: "Phone: +1 (800) 555-HOME", url: "tel:+18005554663" },
        { text: "Location: 27 Willow Street, New York, USA", url: "#" },
      ],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-24 mt-24 bg-[#2c2520] text-gray-300">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-gray-700">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Home<span className="text-[#c49b63]">Aura</span>
          </h2>

          <p className="max-w-[460px] mt-6 text-gray-400">
            Transform your home with elegant décor pieces designed to add warmth,
            personality, and timeless beauty to every corner of your space.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c49b63] text-white p-2 rounded-full hover:bg-[#a67d41] transition"
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-full border border-black hover:bg-gray-100 transition"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c49b63] text-white p-2 rounded-full hover:bg-[#a67d41] transition"
            >
              <FaTwitter size={16} />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-full border border-black hover:bg-gray-100 transition"
            >
              <FaTiktok size={16} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-white md:mb-5 mb-2">
                {section.title}
              </h3>

              <ul className="text-sm space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <p className="py-5 text-center text-sm md:text-base text-gray-500">
        © {new Date().getFullYear()} HomeAura · All rights reserved
      </p>
    </div>
  );
};

export default Footer;
