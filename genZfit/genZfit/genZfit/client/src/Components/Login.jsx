import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { SetShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [mode, setMode] = useState("login"); // 'login' or 'register'
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
        toast.success(mode === "login" ? "Welcome back!" : "Account created!");
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
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-80 sm:w-[360px] p-8 rounded-2xl shadow-2xl border border-[#e0d7ca] bg-[#fffaf0] text-[#3a3a3a]"
      >
        <h2 className="text-2xl font-semibold text-center text-[#3a3a3a]">
          <span className="text-[#b5835a]">User</span> {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        {mode === "register" && (
          <div className="w-full">
            <label className="mb-1 text-[#5a5a5a] block">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 rounded-lg border border-[#d6c8b8] bg-[#fffaf0] text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#b5835a]"
            />
          </div>
        )}

        <div className="w-full">
          <label className="mb-1 text-[#5a5a5a] block">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded-lg border border-[#d6c8b8] bg-[#fffaf0] text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#b5835a]"
          />
        </div>

        <div className="w-full">
          <label className="mb-1 text-[#5a5a5a] block">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded-lg border border-[#d6c8b8] bg-[#fffaf0] text-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#b5835a]"
          />
        </div>

        <p className="text-sm text-[#6b6b6b] text-center">
          {mode === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-[#b5835a] cursor-pointer font-medium hover:underline"
          >
            Click here
          </span>
        </p>

        <button
          type="submit"
          className="mt-2 w-full py-2 rounded-lg bg-[#b5835a] text-white font-semibold hover:bg-[#a06d47] transition"
        >
          {mode === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
