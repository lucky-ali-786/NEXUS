import React, { useState } from 'react';
import Logoutbtn from './Logoutbtn.jsx';
import Container from './container/Container.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from './Logo.jsx';

const Headers = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const loggedIn = useSelector((state) => state.auth?.status);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navitems = [
    { name: 'Home', slug: '/', active: true, },
    { name: 'Login', slug: '/login', active: !loggedIn },
    { name: 'Signup', slug: '/signup', active: !loggedIn },
    { name: 'All Posts', slug: '/all-posts', active: loggedIn },
    { name: 'Add Post', slug: '/add-post', active: loggedIn },
    { name: 'Trending', slug: '/trendingposts', active: loggedIn },
    { name: 'Dashboard', slug: '/dashboard', active: loggedIn },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-posts?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchFocus(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/80 dark:bg-gray-950/90 shadow-lg shadow-purple-500/10'
        : 'bg-white/60 dark:bg-gray-900/60 shadow-md'
      } backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50`}>
      <Container>
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo & Brand */}
          <Link to="/" className="group flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
            <div className="rounded-xl p-1.5 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
              <Logo width="40px" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
                Blogger
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Share Your Stories</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navitems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      setOpen(false);
                      navigate(item.slug);
                    }}
                    className="group relative px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base transition-transform duration-300 group-hover:scale-125">{item.icon}</span>
                      {item.name}
                    </span>

                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />

                    {/* Hover background */}
                    <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </button>
                )
            )}

            {loggedIn && (
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <Logoutbtn />
              </div>
            )}
          </nav>

  

          {/* Mobile Menu Button & Logout */}
          <div className="flex items-center gap-3 lg:hidden">
            {loggedIn && (
              <div>
                <Logoutbtn />
              </div>
            )}

            <button
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
              className="relative group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
            >
              <svg
                className={`h-5 w-5 text-gray-700 dark:text-gray-100 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 7h18M3 12h18M3 17h18" />
                )}
              </svg>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel with Search */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${open
              ? 'max-h-96 opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
            } overflow-hidden`}
        >
          <div className="mt-4 pb-4 space-y-3 bg-gradient-to-b from-white/50 to-white/30 dark:from-gray-900/50 dark:to-gray-900/30 rounded-xl p-4 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative group mb-2">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>

            {navitems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      setOpen(false);
                      navigate(item.slug);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300 group"
                  >
                    <span className="text-lg group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    <svg className="ml-auto w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Headers;
