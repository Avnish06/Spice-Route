import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoader(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setLoader(false);
      toast.success("User Login successfully");
      navigate("/");
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white px-8 py-10 rounded-lg border border-gray-300 shadow-sm">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign-In
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="flex items-center border border-gray-400 rounded-md px-3">
              <input
                type={hidePass ? "password" : "text"}
                id="password"
                className="w-full py-2 focus:outline-none"
                placeholder="*******"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="ml-2 text-gray-600"
                onClick={() => setHidePass(!hidePass)}
              >
                {hidePass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 border border-yellow-600 rounded-md text-black font-medium transition"
          >
            {loader ? <ClipLoader size={18} color="black" /> : "Sign-In"}
          </button>

          {/* Forgot Password Link */}
          <div
            className="text-xs text-blue-600 mt-2 text-left cursor-pointer hover:underline"
            onClick={() => navigate("/forgetpassword")}
          >
            Forgot your password?
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">New to Kakash Agro?</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Create Account */}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-md text-gray-700 font-medium transition"
          >
            Create your Kakash Agro account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
