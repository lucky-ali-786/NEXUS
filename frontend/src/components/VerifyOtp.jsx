import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, getCurrentUser } from "../../appwrite/auth.js";
import { login as loginAction } from "../store/authSlice";
import Button from "./Button.jsx";
import Logo from "./Logo.jsx";
const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = pastedData.split("").concat(["", "", "", "", "", ""]).slice(0, 6);
    setOtp(newOtp);
    // Focus on last filled input
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };
  const verifyOtp = async () => {
    setError("");
    setIsLoading(true);
    // Validate OTP is complete
    if (otp.some((digit) => !digit)) {
      setError("Please enter all 6 digits");
      setIsLoading(false);
      return;
    }
    try {
      // Get stored data from session storage
      const verificationToken = sessionStorage.getItem("verificationToken");
      if (!verificationToken) {
        setError("Session expired. Please sign up again.");
        setIsLoading(false);
        navigate("/signup");
        return;
      }
      const otpCode = otp.join("");
      // Call registerUser with verification token and OTP
      const payload = {
        verificationToken: verificationToken,
        otp: otpCode,
      };
      const result = await registerUser(payload);
      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }
      // Get current user and login
      const user = await getCurrentUser();
      if (user) {
        dispatch(loginAction(user.data));
         sessionStorage.removeItem("verificationToken");
        navigate("/");
          setIsLoading(false);
      }
      else {
        setError("Failed to retrieve user data. try logging in. manually");
        setIsLoading(false);
      }   
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-20 pb-12 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-300/10 rounded-full blur-3xl"></div>
        </div>

        {/* Main Card */}
        <div className="relative z-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-gray-200/50 dark:border-gray-800/50 shadow-2xl">
          {/* Logo Section */}
          <div className="mb-6 flex justify-center">
            <Link to="/" className="group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                <Logo width="50px" />
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 mb-2">
              Verify OTP
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                {error}
              </p>
            </div>
          )}
          {/* OTP Input Section */}
          <div className="mb-8">
            <div className="flex gap-3 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-orange-500 dark:focus:border-orange-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  inputMode="numeric"
                  autoComplete="off"
                />
              ))}
            </div>
            {/* Verify Button */}
            <Button
              type="button"
              onClick={verifyOtp}
              disabled={isLoading || otp.some((digit) => !digit)}
              className="w-full py-3"
              bgcolor="bg-gradient-to-r from-orange-500 to-red-500"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>
          {/* Back to Login */}
          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
        {/* Bottom Info */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>🔐 Your account is being secured</p>
        </div>
      </div>
    </div>
  );
};
export default VerifyOtp;
