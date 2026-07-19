import React, { useState, useEffect } from 'react'
import { myposts } from '../appwrite/config'
import { getmycomments } from '../appwrite/comment'
import { getCurrentUser } from '../appwrite/auth'
import Card from '../src/components/Card'

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingComments, setLoadingComments] = useState(true)
  const [loadingUser, setLoadingUser] = useState(true)
  const [errorPosts, setErrorPosts] = useState(null)
  const [errorComments, setErrorComments] = useState(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoadingUser(true)
        const res = await getCurrentUser()
        if (res.success) {
          setCurrentUser(res.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoadingUser(false)
      }
    }
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true)
        const res = await myposts()
        if (res.success) {
          setPosts(res.data || [])
        } else {
          setErrorPosts(res.message)
        }
      } catch (err) {
        setErrorPosts('Failed to fetch posts')
        console.log(err)
      } finally {
        setLoadingPosts(false)
      }
    }
    fetchPosts()
  }, [])
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true)
        const res = await getmycomments()
        console.log(res);
        if (res.success) {
          setComments(res.data.data || [])
        } else {
          setErrorComments(res.message)
        }
      } catch (err) {
        setErrorComments('Failed to fetch comments')
        console.log(err)
      } finally {
        setLoadingComments(false)
      }
    }
    fetchComments()
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Modern Profile Section */}
        <div className="mb-16">
          {/* Profile Background */}
          <div className="relative">
            {/* Decorative gradient background */}
            <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-t-3xl"></div>
            
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-b-3xl shadow-xl p-8 relative">
              {/* Avatar positioned over the background */}
              <div className="flex flex-col items-center -mt-20 mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 p-0.5 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400">
                      {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentUser?.name || 'User'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {currentUser?.email || 'email@example.com'}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Posts Section */}
        <div className="mb-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-white text-xl">
                📝
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Posts
              </h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
          </div>

          {loadingPosts && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}

          {errorPosts && !loadingPosts && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-600 dark:text-red-400">
                {errorPosts}
              </p>
            </div>
          )}

          {!loadingPosts && posts.length === 0 && !errorPosts && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">
                You haven't created any posts yet
              </p>
            </div>
          )}

          {!loadingPosts && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          )}
        </div>

        {/* My Comments Section */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg text-white text-xl">
                💬
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Comments
              </h2>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></div>
          </div>

          {loadingComments && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
          )}

          {errorComments && !loadingComments && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-600 dark:text-red-400">
                {errorComments}
              </p>
            </div>
          )}

          {!loadingComments && comments.length === 0 && !errorComments && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">
                You haven't made any comments yet
              </p>
            </div>
          )}

          {!loadingComments && comments.length > 0 && (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-cyan-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  
                  {/* Comment content */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {comment.userDetails?.[0]?.name?.charAt(0).toUpperCase() || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                           {comment.userDetails?.[0]?.name || 'Anonymous'}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed break-words">
                        {comment.content || comment.text || comment.comment || ''}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Post Title: {comment.postDetails?.[0]?.title || 'Unknown'}
                      </p>
                    </div>
                  </div>

                  {/* Post indicator */}
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
