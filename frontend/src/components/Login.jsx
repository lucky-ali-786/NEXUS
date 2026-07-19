import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Turnstile } from "@marsidev/react-turnstile";
import { loginUser, getCurrentUser } from "../../appwrite/auth.js";
import { login as loginAction } from "../store/authSlice";

import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Logo from "./Logo.jsx";
import {GoogleOAuthProvider} from '@react-oauth/google';
import GoogleLogin from "./Google.jsx";
const Googlewrapper=()=>{
  return (<GoogleOAuthProvider clientId="398861674382-2lpmnpq7keapc96ud4qcnjrt9rls1taa.apps.googleusercontent.com">
    <GoogleLogin></GoogleLogin>
  </GoogleOAuthProvider>
)}
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const turnstileRef = useRef();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const loginHandler = async (data) => {
    setError("");
    
    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Try backend login with captcha token
      const result = await loginUser({
        email: data.email,
        password: data.password,
        captchaToken: captchaToken,
      });

      if (!result.success) {
        setError(result.message);
        turnstileRef.current?.reset();
        setCaptchaToken(null);
        setIsLoading(false);
        return;
      }

      // Now get current user
      const me = await getCurrentUser();

      if (me.success) {
        dispatch(loginAction(me.data));
        navigate("/");
      } else {
        setError("Unable to fetch user. Try again.");
        setIsLoading(false);
      }
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
          <div className="mb-8 flex justify-center">
            <Link to="/" className="group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                <Logo width="50px" />
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sign in to continue to your account
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
          <form onSubmit={handleSubmit(loginHandler)}>
            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <Input
                  label="📧 Email Address"
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
              </div>

              {/* Password Input */}
              <div>
                <Input
                  label="🔒 Password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  error={errors.password?.message}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  to="#"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
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
                    Signing In...
                  </span>
                ) : (
                  "🔑 Sign In"
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
                <div>
            <Googlewrapper/>
                </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
            >
              Create one
            </Link>
          </p>
            
          {/* Demo Credentials (Optional) */}
          <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
            <p className="text-xs text-blue-900 dark:text-blue-200 font-medium mb-2">
              💡 Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-blue-800 dark:text-blue-300">
              <p>Email: <code className="bg-blue-100 dark:bg-blue-900/50 px-1.5 py-0.5 rounded font-mono">demo@example.com</code></p>
              <p>Password: <code className="bg-blue-100 dark:bg-blue-900/50 px-1.5 py-0.5 rounded font-mono">password123</code></p>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>🔐 Your data is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export { Login };
