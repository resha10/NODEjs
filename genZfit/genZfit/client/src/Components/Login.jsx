import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { SetShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [mode, setMode] = useState("login"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${mode}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
        toast.success(mode === "login" ? "Welcome back!" : "Welcome to our décor family!");
        navigate("/");
        SetShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div
      onClick={() => SetShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 w-80 sm:w-[380px] p-8 rounded-2xl shadow-xl 
        border border-[#e8dfd6] bg-[#f9f5ef]"
      >
        <h2 className="text-2xl font-semibold text-center text-[#3f3a37] tracking-wide">
          {mode === "login" ? (
            <>
              Welcome to <span className="text-[#c08b65] font-semibold">Home Décor</span>
            </>
          ) : (
            <>
              Join <span className="text-[#c08b65] font-semibold">Home Décor Living</span>
            </>
          )}
        </h2>

        {mode === "register" && (
          <div className="w-full">
            <label className="mb-1 block text-[#6d655e]">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-[#d8cfc6] bg-[#fff] 
              text-[#3d3835] focus:outline-none focus:ring-2 focus:ring-[#c08b65]"
            />
          </div>
        )}

        <div className="w-full">
          <label className="mb-1 block text-[#6d655e]">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-[#d8cfc6] bg-[#fff] 
            text-[#3d3835] focus:outline-none focus:ring-2 focus:ring-[#c08b65]"
          />
        </div>

        <div className="w-full">
          <label className="mb-1 block text-[#6d655e]">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-[#d8cfc6] bg-[#fff] 
            text-[#3d3835] focus:outline-none focus:ring-2 focus:ring-[#c08b65]"
          />
        </div>

        <p className="text-sm text-center text-[#7a726d]">
          {mode === "register" ? "Already part of our décor family?" : "New to our décor store?"}{" "}
          <span
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-[#c08b65] cursor-pointer font-medium hover:underline"
          >
            Click here
          </span>
        </p>

        <button
          type="submit"
          className="mt-2 w-full py-3 rounded-lg bg-[#c08b65] text-white 
          font-semibold hover:bg-[#a97757] transition"
        >
          {mode === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
