import React from "react";

const Contact = () => {
  return (
    <section className="bg-[#f2f6f8] py-16 px-6 md:px-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
          Get in <span className="text-[#ff5a3c]">Touch</span> with <span className="text-[#ff5a3c]">GenzFit</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Have questions about our fitness programs, memberships, or personal training? 
          We’re here to help you crush your goals. Reach out via phone, email, or the form below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-[#ff5a3c] mb-6">
            Send Us a Message
          </h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-[#f9fafb] text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#ff5a3c] transition-all duration-200"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-[#f9fafb] text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#ff5a3c] transition-all duration-200"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-[#f9fafb] text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#ff5a3c] transition-all duration-200"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-[#ff5a3c] hover:bg-[#e04a2d] text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 text-[#1a1a1a]">
          <div>
            <h3 className="text-xl font-semibold text-[#ff5a3c]">🏋️‍♂️ Gym Location</h3>
            <p>Ahmedabad, Gujarat, India</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#ff5a3c]">📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#ff5a3c]">📧 Email</h3>
            <p>support@genzfit.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#ff5a3c]">🕒 Hours</h3>
            <p>Mon - Sun: 6:00 AM – 10:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
