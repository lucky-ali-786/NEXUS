import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Container from "../src/components/container/Container.jsx";
import Card from "../src/components/Card.jsx";
import { getAllPosts } from "../appwrite/config.js";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  const displayedPosts = posts.slice(0, 8);

  if (posts.length === 0) {
    return (
      <div className="w-full min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-orange-300 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <Container>
          <div className="text-center space-y-8 animate-fadeIn">
            {/* Icon/Illustration with Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/30 animate-float">
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-orange-300 to-red-400 animate-spinSlow"></div>
                {/* Blog Icon - Document Stack */}
                <svg
                  className="w-16 h-16 text-white relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* First document - tilted */}
                  <rect x="3" y="4" width="14" height="14" rx="2" fill="white" opacity="0.9" className="animate-documentSlide1"/>
                  {/* Second document - center */}
                  <rect x="5" y="7" width="14" height="12" rx="2" fill="white" opacity="0.7" className="animate-documentSlide2"/>
                  {/* Third document - top */}
                  <rect x="7" y="5" width="12" height="12" rx="2" fill="white" className="animate-documentSlide3"/>
                  {/* Lines on top document */}
                  <line x1="9" y1="9" x2="17" y2="9" stroke="#FF6B35" strokeWidth="1" className="animate-documentSlide3"/>
                  <line x1="9" y1="12" x2="15" y2="12" stroke="#FF6B35" strokeWidth="1" className="animate-documentSlide3"/>
                  <line x1="9" y1="15" x2="13" y2="15" stroke="#FF6B35" strokeWidth="1" className="animate-documentSlide3"/>
                </svg>
              </div>
            </div>
            {/* Main Heading with Gradient Animation */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="block mb-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Discover Stories
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              Join our community and explore incredible stories from writers around the world.
            </p>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
              <Link
                to="/login"
                className="group relative px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full overflow-hidden shadow-xl shadow-orange-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Sign In
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/signup"
                className="px-10 py-4 border-2 border-orange-500 text-orange-500 dark:text-orange-400 font-bold rounded-full hover:bg-orange-50 dark:hover:bg-orange-950 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Create Account
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 grid grid-cols-3 gap-6 max-w-md mx-auto animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">10k+</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stories</p>
              </div>
              <div className="text-center border-gray-300 dark:border-gray-600">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">5k+</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Readers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">1k+</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Writers</p>
              </div>
            </div>
          </div>
        </Container>

        {/* Animated CSS */}
        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes documentSlide1 {
            0%, 100% { transform: translateY(0) rotate(2deg); opacity: 0.9; }
            50% { transform: translateY(-2px) rotate(2deg); opacity: 0.95; }
          }
          @keyframes documentSlide2 {
            0%, 100% { transform: translateY(0) rotate(-1deg); opacity: 0.7; }
            50% { transform: translateY(-4px) rotate(-1deg); opacity: 0.8; }
          }
          @keyframes documentSlide3 {
            0%, 100% { transform: translateY(0) rotate(1deg); opacity: 1; }
            50% { transform: translateY(-6px) rotate(1deg); opacity: 1; }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-spinSlow {
            animation: spinSlow 4s linear infinite;
          }
          .animate-documentSlide1 {
            animation: documentSlide1 3s ease-in-out infinite;
          }
          .animate-documentSlide2 {
            animation: documentSlide2 3s ease-in-out infinite 0.2s;
          }
          .animate-documentSlide3 {
            animation: documentSlide3 3s ease-in-out infinite 0.4s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full py-16">
      {/* Background Gradient Animation */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-red-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      <Container>
        {/* Header Section with Animation */}
        <div className="mb-16 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Featured</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Latest Stories
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Dive into fresh content from our community. New stories every day.
          </p>
        </div>

        {/* AUTO BLOG GRID */}
        <div
          className="grid gap-8 mb-16"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {displayedPosts.map((post, index) => (
            <div
              key={post._id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                _id={post._id}
                title={post.title}
                featuredImage={post.featuredImage}
                likes={post.likes}
                userId={post.userId}
              />
            </div>
          ))}
        </div>

        {/* View All Posts Button */}
        {posts.length > 8 && (
          <div className="flex justify-center">
            <Link
              to="/all-posts"
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">
                View All Posts
                <span className="text-lg font-semibold ml-2">({posts.length})</span>
              </span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </Container>

      {/* Animated CSS */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
