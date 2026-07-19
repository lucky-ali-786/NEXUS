import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../appwrite/config.js';
import Card from '../src/components/Card.jsx';
import Container from '../src/components/container/Container.jsx';

const Allposts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllPosts().then((res) => {
      if (res.success && Array.isArray(res.data)) {
        setPosts(res.data);
        setFilteredPosts(res.data);
      } else {
        setPosts([]);
        setFilteredPosts([]);
      }
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="pt-20 pb-12 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 min-h-screen">
      <Container>
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 mb-2">
                📚 All Blog Posts
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Discover amazing stories and articles from our community
              </p>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold text-sm flex items-center justify-center">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full px-6 py-4 pl-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 shadow-lg"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-spin"></div>
                <div className="absolute inset-1 bg-white dark:bg-gray-950 rounded-full"></div>
                <div className="absolute inset-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-75 animate-pulse"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">
                Loading posts...
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center">
              <span className="text-5xl">📭</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No posts found</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              {searchQuery 
                ? `We couldn't find any posts matching "${searchQuery}". Try a different search term!`
                : "There are no posts yet. Be the first to share your story!"}
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <div 
                key={post._id} 
                className="group transform transition-all duration-300 hover:scale-[1.02]"
              >
                <Card {...post} />
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {!loading && filteredPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                  {filteredPosts.length}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Total Posts</p>
              </div>
              
              <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {new Set(filteredPosts.map(p => p.userName)).size}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Active Authors</p>
              </div>
              
              <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                  {filteredPosts.filter(p => p.status === 'active').length}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Published</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Allposts;
