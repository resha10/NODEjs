import React from "react";

const services = [
  {
    title: "Fast & Reliable Shipping",
    description:
      "Get your gym gear delivered quickly and safely — straight to your doorstep anywhere in the country.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/delivery.png",
  },
  {
    title: "Premium Quality Products",
    description:
      "We offer top-tier fitness wear and accessories tested for durability, comfort, and performance.",
    icon: "https://img.icons8.com/ios/50/ffffff/checkmark.png",
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our team is here for you anytime — from sizing help to order tracking, we’ve got your back.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/customer-support.png",
  },
  {
    title: "Easy Returns & Exchanges",
    description:
      "Not the perfect fit? No worries — enjoy hassle-free returns and exchanges within 7 days.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/return.png",
  },
  {
    title: "Secure Payments",
    description:
      "Shop confidently with encrypted payments and multiple trusted payment options.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/lock.png",
  },
  {
    title: "Exclusive Member Discounts",
    description:
      "Join the GenZ Fit Club and unlock early access to drops, discounts, and special promotions.",
    icon: "https://img.icons8.com/ios-filled/50/ffffff/discount.png",
  },
];

const BottomBanner = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 to-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 uppercase tracking-wide">
          Why Choose <span className="text-[#ff4500]">GenZ Fit</span>?
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-16">
          At <span className="text-[#ff4500] font-semibold">GenZ Fit</span>, we’re not just selling gear — 
          we’re helping you build confidence, strength, and style.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 p-8 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-left"
            >
              <div className="w-14 h-14 mb-5 flex items-center justify-center bg-gradient-to-tr from-[#ff4500] to-[#e03e00] rounded-2xl">
                <img src={service.icon} alt={service.title} className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
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
