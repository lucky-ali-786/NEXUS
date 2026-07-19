import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../src/components/Button.jsx";
import Container from "../src/components/container/Container.jsx";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { getPost, deletePost } from "../appwrite/config.js";
import { getUser } from "../appwrite/auth.js";
import { togglelike } from "../appwrite/likes.js";
import Comment from "../src/components/Comment.jsx";
import SafeHTML from "../src/utils/Safehtml.jsx";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user,setuser]=useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { _id } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData._id || userData.role === 'admin' : false;
    const fn=async (userId)=>{
      try { const b= await getUser(userId);
        if(b.success) {setuser(b.data.name);}
      }
        catch(err){console.log(err);
            return err;
        }
    }
    useEffect(() => {
        if (_id) {
            setLoading(true);
            getPost(_id)
                .then((res) => {
                    if (res.success) {
                        setPost(res.data);
                        fn(res.data.userId);
                    } else {
                        navigate("/");
                    }
                })
                .catch(() => navigate("/"))
                .finally(() => setLoading(false));
        } else {
            navigate("/");
        }
    }, [_id, navigate]);

    const deleteHandler = async () => {
        const res = await deletePost(_id);
        if (res.success) {
            navigate("/");
        }
    };

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
    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">Post not found</p>
                    <Link
                        to="/"
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 pb-12 bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 min-h-screen">
            <Container>
                {/* Breadcrumb Navigation */}
                <div className="mb-8 flex items-center gap-2 text-sm">
                    <Link
                        to="/"
                        className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                        Home
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link
                        to="/all-posts"
                        className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                        All Posts
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 dark:text-white font-medium truncate">{post.title}</span>
                </div>

                {/* Featured Image Section */}
                <div className="relative group mb-12 overflow-hidden rounded-2xl shadow-2xl max-w-4xl mx-auto">
                    <div
                        style={{
                            width: "100%",
                            aspectRatio: "16 / 9",
                            background: "#111",
                            overflow: "hidden",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        <img
                            src={post.featuredImage}
                            alt="test"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                        
                    </div>

                </div>

                {/* Post Header */}
                <div className="mb-12 max-w-4xl mx-auto">
                    {/* Category Badge and Like Count */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                                Blog Post
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">•</span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'No date'}
                            </span>
                        </div>
    
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                         <SafeHTML htmlContent={post.title} />
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                                {user?.[0]?.toUpperCase() || 'B'}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {user || 'Anonymous'}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Author</p>
                            </div>
                        </div>
                        <div className="sm:ml-auto text-sm text-gray-600 dark:text-gray-400">
                            <p className="font-medium">{post.status === 'active' ? '📤 Published' : '📋 Draft'}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-10 lg:p-12 mb-12 border border-gray-200/50 dark:border-gray-800/50 shadow-lg">
                    <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-full mb-10"></div>

                    <article className="prose prose-lg dark:prose-invert max-w-none text-gray-900 dark:text-gray-100">
                      <SafeHTML htmlContent={post.content} />
                    </article>
                </div>

                {/* Comments Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <Comment postId={_id} />
                </div>

                {/* Footer Actions */}
                {isAuthor && (
                    <div className="max-w-4xl mx-auto flex gap-4 justify-center md:justify-end mb-8">
                        <Link to={`/edit-post/${post._id}`}>
                            <Button
                                bgcolor="bg-green-500"
                                size="lg"
                                className="shadow-lg hover:shadow-green-500/50"
                            >
                                ✏️ Edit Post
                            </Button>
                        </Link>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 shadow-lg hover:shadow-red-500/50 transition-all duration-300 active:scale-95"
                        >
                            🗑️ Delete Post
                        </button>
                    </div>
                )}

                {/* Back to Posts Link */}
                <div className="flex justify-center">
                    <Link
                        to="/all-posts"
                        className="px-6 py-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-lg border border-gray-200/50 dark:border-gray-800/50 text-gray-900 dark:text-white font-medium hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 shadow-md"
                    >
                        ← Back to All Posts
                    </Link>
                </div>
            </Container>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-gray-200 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Post?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            This action cannot be undone. Are you sure you want to delete this post?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    deleteHandler();
                                }}
                                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
