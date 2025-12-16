import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Common error handler
  const handleError = (error) => {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
    setLoading(false);
  };

  // STEP 1: SEND OTP
  const sendOtp = async () => {
    if (!email.trim()) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/v1/auth/sendotp",
        { email: email.trim() },
        { withCredentials: true }
      );

      toast.success(result.data.message);
      setStep(2);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  // STEP 2: VERIFY OTP
  const verifyOtp = async () => {
    if (!otp.trim()) return toast.error("Please enter the OTP");

    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/v1/auth/verifyotp",
        { email: email.trim(), otp: otp.trim() },
        { withCredentials: true }
      );

      toast.success(result.data.message);
      setStep(3);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  // STEP 3: RESET PASSWORD
  const resetPassword = async () => {
    if (!newpassword || !conpassword)
      return toast.error("Please fill all password fields");

    if (newpassword !== conpassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/v1/auth/resetpassword",
        { email: email.trim(), password: newpassword },
        { withCredentials: true }
      );

      toast.success(result.data.message);
      navigate("/login");
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-10">

        {/* STEP 1 UI */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Forget Your Password
            </h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-gray-700 mb-1">Enter your Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                onClick={sendOtp}
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
              </button>
            </form>

            <div
              className="text-sm text-blue-600 text-center mt-4 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </div>
          </div>
        )}

        {/* STEP 2 UI */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Enter the OTP
            </h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-gray-700 mb-1">
                  Please enter the 4-digit code sent to your email
                </label>
                <input
                  type="text"
                  placeholder="****"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
              </button>
            </form>

            <div
              className="text-sm text-blue-600 text-center mt-4 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </div>
          </div>
        )}

        {/* STEP 3 UI */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Reset Your Password
            </h2>

            <p className="text-gray-600 text-sm mb-5 text-center">
              Enter a new password below to regain access to your account.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={conpassword}
                  onChange={(e) => setConPassword(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                onClick={resetPassword}
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color="white" /> : "Reset Password"}
              </button>
            </form>

            <div
              className="text-sm text-blue-600 text-center mt-4 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
