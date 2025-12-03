import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-4 py-3 border border-gray-700 rounded-lg outline-none bg-gray-900 text-white placeholder-gray-400 focus:border-red-600 transition-all duration-200"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name] || ""}
    required
  />
);

const AddAddress = () => {
  const { axios, navigate, user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      const { data } = await axios.post("/api/address/add", {
        address,
        userId: user._id,
      });

      if (data.success) {
        toast.success(data.message || "Address saved successfully");
        navigate("/cart");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user]);

  if (!user) return null;

  return (
    <section className="bg-gray-800 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-2xl shadow-lg border border-red-600">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Add Shipping <span className="text-red-600">Address</span>
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <InputField
            handleChange={handleChange}
            address={address}
            name="email"
            type="email"
            placeholder="Email Address"
          />

          <InputField
            handleChange={handleChange}
            address={address}
            name="street"
            type="text"
            placeholder="Street Address"
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              name="city"
              type="text"
              placeholder="City"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="country"
              type="text"
              placeholder="Country"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              handleChange={handleChange}
              address={address}
              name="zipcode"
              type="number"
              placeholder="Zip Code"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="state"
              type="text"
              placeholder="State"
            />
          </div>

          <InputField
            handleChange={handleChange}
            address={address}
            name="phone"
            type="text"
            placeholder="Phone Number"
          />

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg transition-all duration-200"
          >
            Save Address
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
