import React from "react";

const services = [
  {
    title: "Fast & Safe Delivery",
    description:
      "Your décor items are packed with care and delivered safely to your home.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/van.png",
  },
  {
    title: "Handpicked Premium Quality",
    description:
      "Every décor product is curated for durability, craftsmanship, and timeless elegance.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/ok.png",
  },
  {
    title: "24/7 Customer Assistance",
    description:
      "Need help choosing décor or tracking your order? We're always here for you.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/customer-support.png",
  },
  {
    title: "Easy Returns & Exchanges",
    description:
      "Changed your mind? Enjoy smooth and flexible returns within 7 days.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/replace.png",
  },
  {
    title: "Secure Checkout",
    description:
      "Your payments are fully protected with secure and trusted payment gateways.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/lock-2.png",
  },
  {
    title: "Exclusive Member Offers",
    description:
      "Become part of our décor family to unlock early collections and special deals.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/sale.png",
  },
];

const BottomBanner = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#4b3f33] to-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 uppercase tracking-wide">
          Why Shop With <span className="text-[#c49b63]">HomeAura</span>?
        </h2>

        <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mb-16">
          At <span className="text-[#c49b63] font-semibold">HomeAura</span>, we help you create warm, stylish, 
          and comfortable living spaces that truly feel like home.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#3a332c] border border-[#5a5145] p-8 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left"
            >
              <div className="w-14 h-14 mb-5 flex items-center justify-center bg-gradient-to-tr from-[#c49b63] to-[#a67d41] rounded-2xl">
                <img src={service.icon} alt={service.title} className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
