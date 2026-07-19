import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Turnstile } from "@marsidev/react-turnstile";
import { sendotp } from "../../appwrite/auth.js";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Logo from "./Logo.jsx";

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const turnstileRef = useRef();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const signup = async (data) => {
    setError("");
    
    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification");
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Send OTP request with captcha token
      const otpResponse = await sendotp({
       name: data.name,
       email: data.email,
       password: data.password,
       captchaToken: captchaToken,
      });
      if (!otpResponse.success) {
        setError(otpResponse.message);
        turnstileRef.current?.reset();
        setCaptchaToken(null);
        setIsLoading(false);
        return;
      }
      // Step 2: Store verification token and user data in session storage
      sessionStorage.setItem(
        "verificationToken",otpResponse.verificationToken.data);
      // Step 3: Redirect to OTP verification page
      setIsLoading(false);
      navigate("/verify-otp");
    } catch (err) {
      setError("An error occurred. Please try again.");
      turnstileRef.current?.reset();
      setCaptchaToken(null);
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
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Join our community and start sharing your stories
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(signup)}>
            <div className="space-y-5">
              {/* Full Name Input */}
              <div>
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...register("name", { 
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                  error={errors.name?.message}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18.101 12.93a.75.75 0 00-1.025-1.09l-3.857 3.143-1.993-1.679a.75.75 0 10-1.06 1.061l2.378 2.004a.75.75 0 001.025-.073l4.532-3.266z" clipRule="evenodd" />
                    </svg>
                    {errors.name?.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Invalid email address",
                    },
                  })}
                  error={errors.email?.message}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18.101 12.93a.75.75 0 00-1.025-1.09l-3.857 3.143-1.993-1.679a.75.75 0 10-1.06 1.061l2.378 2.004a.75.75 0 001.025-.073l4.532-3.266z" clipRule="evenodd" />
                    </svg>
                    {errors.email?.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  error={errors.password?.message}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18.101 12.93a.75.75 0 00-1.025-1.09l-3.857 3.143-1.993-1.679a.75.75 0 10-1.06 1.061l2.378 2.004a.75.75 0 001.025-.073l4.532-3.266z" clipRule="evenodd" />
                    </svg>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              {/* Turnstile CAPTCHA */}
              <div className="flex justify-center my-4">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={"0x4AAAAAAC6V-Oo7L_S5siey"}
                  onSuccess={(token) => setCaptchaToken(token)}
                  onError={() => {
                    setError("CAPTCHA verification failed. Please try again.");
                    setCaptchaToken(null);
                  }}
                  theme="light"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 mt-6"
                bgcolor="bg-gradient-to-r from-orange-500 to-red-500"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </span>
                ) : (
                  "🎉 Create Account"
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
            >
              Sign In
            </Link>
          </p>

          {/* Privacy Notice */}
          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
            By signing up, you agree to our{" "}
            <Link to="#" className="text-orange-600 dark:text-orange-400 hover:underline">
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link to="#" className="text-orange-600 dark:text-orange-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>✨ Join thousands of bloggers sharing their stories</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
