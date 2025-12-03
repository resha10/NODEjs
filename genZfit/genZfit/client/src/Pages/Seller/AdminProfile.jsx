import React from "react";

const AdminProfile = () => {
  const admins = [
    {
      name: "S Patel",
      role: "Founder & CEO",
      image:
        "https://randomuser.me/api/portraits/men/10.jpg",
      email: "s@genzfit.com",
      phone: "+91 98765 43210",
    },
    {
      name: "P Sharma",
      role: "Co-Founder & Operations Head",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      email: "p@genzfit.com",
      phone: "+91 87654 32109",
    },
    {
      name: "R Verma",
      role: "Marketing Head",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      email: "r@genzfit.com",
      phone: "+91 91234 56789",
    },
  ];

  return (
    <section className="bg-[#f5f5f5] py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Meet the <span className="text-[#ef5a2b]">Genz Fit Team</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Our fitness brand is powered by a team of passionate professionals committed to delivering high-quality gym products for your workouts and lifestyle.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {admins.map((admin, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 transform hover:scale-105 transition-all duration-300"
          >
            <div className="mx-auto mb-4 rounded-full p-1 bg-[#ef5a2b] w-36 h-36">
              <img
                src={admin.image}
                alt={`Portrait of ${admin.name}`}
                className="w-full h-full object-cover rounded-full border-4 border-white"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">{admin.name}</h2>
            <p className="text-[#ef5a2b] font-medium">{admin.role}</p>

            <div className="mt-4 text-gray-600 space-y-1">
              <p>📧 {admin.email}</p>
              <p>📞 {admin.phone}</p>
            </div>

            <button className="mt-6 px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#ef5a2b] to-[#fbbf24] hover:from-[#fbbf24] hover:to-[#ef5a2b] transition-all">
              Contact
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminProfile;
