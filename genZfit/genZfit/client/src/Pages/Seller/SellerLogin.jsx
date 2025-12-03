import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../Context/AppContext";
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, sellerProfile, setSellerProfile, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/seller/login', { email, password });
      if (data.success) {
        setIsSeller(true);
        if (data.profile) setSellerProfile(data.profile);
        navigate('/seller/dashboard');
        toast.success("Welcome back, Seller!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isSeller) navigate("/seller/dashboard");
  }, [isSeller]);

  return (
    <div
      onClick={() => navigate('/')}  // Close modal by navigating away or adjust as needed
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside form
        className="flex flex-col gap-4 w-80 sm:w-[360px] p-8 rounded-2xl shadow-2xl border border-[#d6c8b8] bg-[#fffaf0] text-[#3a3a3a]"
      >
        <h2 className="text-2xl font-semibold m-auto text-[#3a3a3a]">
          <span className="text-[#b5835a]">Seller</span> Login
        </h2>

        <div className="w-full">
          <label className="mb-1 text-[#5a5a5a]" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 rounded-lg border border-[#d6c8b8] bg-[#fffaf0] text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#b5835a]"
          />
        </div>

        <div className="w-full">
          <label className="mb-1 text-[#5a5a5a]" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-2 rounded-lg border border-[#d6c8b8] bg-[#fffaf0] text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#b5835a]"
          />
        </div>

        <button
          type="submit"
          className="btn w-full py-2 mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
