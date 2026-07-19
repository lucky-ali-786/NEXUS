import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { togglelike, mylikes, getlikes } from "../../appwrite/likes.js";
import { getUser } from "../../appwrite/auth.js";
const Card = ({ _id, title, featuredImage, likes,userId }) => {
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setuser]=useState("");
  
     const fn=async (userId)=>{
      try { const b= await getUser(userId);
        if(b.success) {setuser(b.data.name);}
      }
        catch(err){console.log(err);
            return err;
        }
    }
    
    // Fetch likes count for this post
    const fetchLikesCount = async () => {
      try {
        const res = await getlikes(_id);
        if (res.success) {
          setLikeCount(res.data.data || 0);
        }
      } catch (err) {
        console.log("Error fetching likes:", err);
      }
    };

    // Check if current user has liked this post
    const checkUserLikes = async () => {
      try {
        const res = await mylikes();
        if (res.success) {
          const userLikedPosts = res.data.data || [];
          let isPostLiked = false;
          for(let i=0;i<userLikedPosts.length;i++){
           if(userLikedPosts[i].postId===_id){
            isPostLiked=true;
            break;
           }
          }
          setIsLiked(isPostLiked);
        }
      } catch (err) {
        console.log("Error checking user likes:", err);
      }
    };

    // Handle like toggle
    const handleLike = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (isLoading) return;
      
      setIsLoading(true);
      try {
        const payload = { postId: _id };
        const res = await togglelike(payload);
        
        if (res.success) {
          setIsLiked(!isLiked);
          // Refresh likes count after toggle
          await fetchLikesCount();
        } else {
          console.log("Error toggling like:", res.message);
        }
      } catch (err) {
        console.log("Error in handleLike:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    useEffect(()=>{
      fn(userId);
    },[userId])

    // Fetch likes count and check if user has liked on component mount
    useEffect(() => {
      fetchLikesCount();
      checkUserLikes();
    }, [_id]);


  return (
    <Link to={`/post/${_id}`}>
      <div className="group relative w-full h-full">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
        {/* Main card */}
        <div className="w-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02] group-hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
          {/* Image container */}
          <div className="relative w-full mb-4 overflow-hidden rounded-xl">
            {featuredImage ? (
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={featuredImage}
                  alt={title}
                  className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-xl animate-pulse" />
            )}
          
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              {title}
            </h2>
              {/* Author name */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">by </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user || "Anonymous"}
              </span>
            </div>
            {/* Read more indicator and likes */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                <span className="font-medium">Read Article</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Like count */}
              <button
                onClick={handleLike}
                disabled={isLoading}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 overflow-hidden group ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white shadow-lg shadow-red-400/50 dark:shadow-red-600/50' 
                    : 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/70'
                } hover:scale-105 active:scale-95`}
              >
                {/* Ripple effect background */}
                {isLiked && (
                  <span className="absolute inset-0 bg-white/20 rounded-full animate-ping"></span>
                )}
                
                {/* Heart icon with animation */}
                <svg 
                  className={`w-5 h-5 transition-all duration-500 relative z-10 ${isLiked ? 'fill-current' : 'fill-none'}`} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={isLiked ? {
                    animation: 'likeHeartBurst 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                  } : {}}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                
                {/* Like count with animation */}
                <span className={`text-sm font-bold transition-all duration-300 relative z-10 ${isLiked ? 'scale-110' : 'scale-100'}`}>
                  {likeCount}
                </span>
                
                {/* Floating particles effect (decorative) */}
                {isLiked && (
                  <>
                    <span className="absolute top-1 left-2 w-1.5 h-1.5 bg-white rounded-full animate-float" style={{animationDelay: '0s'}}></span>
                    <span className="absolute top-2 right-1 w-1.5 h-1.5 bg-white rounded-full animate-float" style={{animationDelay: '0.1s'}}></span>
                    <span className="absolute bottom-1 left-3 w-1 h-1 bg-white/80 rounded-full animate-float" style={{animationDelay: '0.2s'}}></span>
                  </>
                )}
              </button>
              
              <style>{`
                @keyframes likeHeartBurst {
                  0% {
                    transform: scale(1);
                    opacity: 1;
                  }
                  50% {
                    transform: scale(1.4);
                  }
                  100% {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
                
                @keyframes float {
                  0% {
                    opacity: 1;
                    transform: translateY(0) translateX(0);
                  }
                  100% {
                    opacity: 0;
                    transform: translateY(-20px) translateX(10px);
                  }
                }
                
                .animate-float {
                  animation: float 0.8s ease-out forwards;
                }
                
                .animate-ping {
                  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                
                @keyframes ping {
                  75%, 100% {
                    transform: scale(2);
                    opacity: 0;
                  }
                }
              `}</style>
            </div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-300">
            Featured
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
