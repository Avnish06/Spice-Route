import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDetails } from "../context/UserContext.jsx";
import { motion } from "framer-motion";

const NUM_LOGOS = 6;

const random = (min, max) => Math.random() * (max - min) + min;

const SignupForm = () => {
  const navigate = useNavigate();
  const [hidepass, setHidePass] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useDetails();
  const [role, setRole] = useState()

  const [logos, setLogos] = useState(
    Array.from({ length: NUM_LOGOS }).map(() => ({
      x: random(-40, 60),
      y: random(-30, 80),
      size: random(120, 520),
      rotate: random(-20, 20),
      duration: random(18, 36),
      delay: random(0, 6),
      opacity: random(0.06, 0.14),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLogos((prev) =>
        prev.map((l) => ({
          ...l,
          x: random(-40, 60),
          y: random(-30, 80),
          rotate: random(-20, 20),
          duration: random(18, 36),
          opacity: random(0.06, 0.14),
        }))
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handlesignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/v1/auth/signup",
        { username, email, password, role }, 
        { withCredentials: true }
      );

      console.log(result.data);
      setUser(result.data.user);
      toast.success("Signup Successfully");
      console.log(user);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("error while signup");
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Background animated logos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 w-full h-full overflow-hidden">
        {logos.map((logo, idx) => {
          const xStr = `${logo.x}vw`;
          const yStr = `${logo.y}vh`;
          const sizePx = `${Math.round(logo.size)}px`;

          return (
            <motion.div
              key={idx}
              initial={{ x: xStr, y: yStr, rotate: logo.rotate, opacity: 0, scale: 1 }}
              animate={{
                x: xStr,
                y: yStr,
                rotate: logo.rotate,
                opacity: logo.opacity,
                scale: [0.98, 1.02, 0.99],
              }}
              transition={{
                duration: logo.duration,
                delay: logo.delay,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                position: "absolute",
                width: sizePx,
                height: sizePx,
                left: 0,
                top: 0,
                backgroundImage: "url(Santtushti.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 12,
                filter: "saturate(0.4) contrast(0.9)",
                zIndex: -1,
                pointerEvents: "none",
                willChange: "transform, opacity",
              }}
            />
          );
        })}
      </div>

      {/* Main card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-400 rounded-sm flex items-center justify-center text-white font-bold shadow-sm">
              A
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Santtushti</h1>
              <p className="text-xs text-gray-500 -mt-1">Best of Nutrition's</p>
            </div>
          </div>
          <div className="text-sm text-blue-600 font-medium">Secure Signup</div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create your account
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900
              focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900
              focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={hidepass ? "password" : "text"}
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900
                focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="ml-3 text-gray-500 hover:text-gray-700 p-2 rounded"
                onClick={() => setHidePass(!hidepass)}
              >
                {hidepass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

         {/* ROLE UI ONLY */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Select Role
  </label>

  <div className="flex items-center gap-4">

    <button
      type="button"
      className="px-4 py-2 rounded-lg border border-gray-300 bg-white 
      text-gray-700 hover:bg-gray-100 hover:border-blue-400 transition 
      text-sm font-medium"
      value={"purchaser"}
     onClick={(e) => setRole(e.target.value)}

    >
      Buyer
    </button>

    <button
      type="button"
      className="px-4 py-2 rounded-lg border border-gray-300 bg-white 
      text-gray-700 hover:bg-gray-100 hover:border-blue-400 transition 
      text-sm font-medium"
      value={"seller"}
       onClick={(e) => setRole(e.target.value)}
    >
      Seller
    </button>

  </div>
</div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-400 border border-orange-400 text-black font-semibold rounded-lg
            hover:bg-orange-500 hover:shadow-md transition transform hover:-translate-y-0.5 
            flex items-center justify-center gap-3"
            onClick={handlesignup}
          >
            {loading ? <ClipLoader size={22} color="black" /> : "Create account"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4 flex flex-col items-center gap-2">
            <span
              className="cursor-pointer text-blue-600 underline"
              onClick={() => navigate("/login")}
            >
              Already have an account? Log in
            </span>
            <span className="cursor-pointer text-gray-500">Forgot Password?</span>
          </div>
        </form>

        <div className="mt-6 text-xs text-gray-400 text-center">
          By continuing you agree to our Terms of Service & Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
