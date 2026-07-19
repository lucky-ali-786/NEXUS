import React, { useEffect, useState } from 'react'
import { trendingposts } from '../appwrite/likes.js'
import Card from '../src/components/Card.jsx'
import Container from '../src/components/container/Container.jsx'
import { Link } from 'react-router-dom'
const Trendingposts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true)
        const response = await trendingposts()
        if (response.success) {
           
          setPosts(response.data.data)
          setError(null)
        } else {
          setError('Failed to load trending posts')
          setPosts([])
        }
      } catch (err) {
        console.error('Error fetching trending posts:', err)
        setError('An error occurred while loading posts')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchTrendingPosts()
  }, [])

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
            Loading trending posts...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-12 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 min-h-screen">
      <Container>
        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full">
              🔥 Trending Now
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Most Loved
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Posts
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Discover the most engaging and loved posts from our community. These are the stories that resonated with readers the most.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <Card
                key={post._id}
                _id={post._id}
                title={post.title}
                featuredImage={post.featuredImage}
                likes={post.likes || 0}
                userId={post.userId}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No Trending Posts Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Check back later for the most popular posts from our community.
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">
                  Unable to Load Posts
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Section */}
        {posts.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have Something to Share?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join our community and publish your own stories. Get likes, engage with readers, and build your audience.
            </p>
              <Link to={`/add-post`}>
               <button className="px-8 py-3 bg-white text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold rounded-lg hover:shadow-lg transition-shadow duration-300">
              Start Writing
                </button>
              </Link>
           
          </div>
        )}
      </Container>
    </div>
  )
}

export default Trendingposts
