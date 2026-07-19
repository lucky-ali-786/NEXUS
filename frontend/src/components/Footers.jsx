import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footers() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900/50 via-gray-900/80 to-gray-950 dark:from-gray-950 dark:via-gray-900 dark:to-black border-t border-gray-700/50 dark:border-gray-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            {/* Logo & Brand Name */}
            <Link to="/" className="group flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                <Logo width="40px" className="block" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
                  Blogger
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Share Your Stories</p>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500 leading-relaxed max-w-xs">
              A modern blogging platform where writers and readers connect. Create, share, and discover amazing stories from our global community.
            </p>

            {/* Copyright */}
            <p className="mt-6 text-xs text-gray-500 dark:text-gray-600">
              © {currentYear} Blogger. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="mt-4 flex items-center gap-4">
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 transition-all duration-300 group">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20v-7.21H5.5V9.25h2.79V7.31c0-2.87 1.77-4.43 4.3-4.43 1.23 0 2.28.09 2.59.13v3h-1.78c-1.4 0-1.67.66-1.67 1.63v2.14h3.33l-.43 3.54h-2.9V20"/>
                </svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.914 1.186.092-.923.35-1.547.636-1.903-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:grid-cols-3">
            
            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/all-posts" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Browse Posts
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Community</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest posts and updates.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700/50 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-orange-500/50 transition-all duration-300 active:scale-95"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-gray-500">
              No spam, just great content. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-400">
              Made with <span className="text-red-500">❤️</span> by the Blogger team
            </p>
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-500">Status: <span className="text-green-400 font-medium">All Systems Operational</span></p>
              <select className="bg-gray-800/50 border border-gray-700/50 text-gray-300 text-sm rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </footer>
  )
}