import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../appwrite/config.js';
import POSTS from '../src/components/POSTS.jsx';
import Container from '../src/components/container/Container.jsx';

const Editposts = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getPost(slug).then((res) => {
        if (res.success && res.data) {
          setPost(res.data);
        } else {
          navigate("/");
        }
      }).finally(() => setLoading(false));
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-spin"></div>
            <div className="absolute inset-1 bg-white dark:bg-gray-950 rounded-full"></div>
            <div className="absolute inset-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-75 animate-pulse"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">
            Loading post...
          </p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      {/* Header Section */}
      <div className="relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10 dark:from-orange-500/5 dark:via-red-500/5 dark:to-yellow-500/5"></div>
        <Container>
          <div className="relative z-10 py-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
                Edit Post
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Update your blog post with new content and improvements
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container>
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"></div>
          
          <div className="p-6 md:p-8 lg:p-10">
            <POSTS posts={post} />
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-xl border border-orange-200/50 dark:border-orange-900/50 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Quick Tips</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Make your post engaging with a clear title, featured image, and organized content.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-xl border border-red-200/50 dark:border-red-900/50 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Best Practices</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use descriptive slugs, publish when ready, and engage with your readers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Editposts;
