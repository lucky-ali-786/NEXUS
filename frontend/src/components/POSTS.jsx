import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import RTE from "./RTE.jsx";
import Select from "./Select.jsx";
import { useForm } from "react-hook-form";
// Removed the local gemini.js import and added generateBlog
import { createPost, updatePost, scheduledpost, generateBlog } from "../../appwrite/config.js"; 

const POSTS = ({ posts }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [imagePreview, setImagePreview] = React.useState(posts?.featuredImage || null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: posts?.title || "",
        content: posts?.content || "",
        slug: posts?.slug || "",
        status: posts?.status || "active",
      },
    });

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submit = async (data) => {
    if (!userData || !userData._id) {
      console.error("User not logged in");
      return;
    }
    const payload = {
      title: data.title,
      content: data.content,
      slug: data.slug,
      status: data.status,
      userId: userData._id,
      featuredImage: data.image?.[0] || null,
    };

    let response;

    if (posts) {
      response = await updatePost(posts._id, payload);
    } else {
      response = await createPost(payload);
    }

    if (response.success) {
      const postId = response.data._id;
      navigate(`/post/${postId}`);
    } else {
      console.log(response.message);
    }
  };

  const generateAIContent = async () => {
    const title = getValues("title");
    if (!title) {
      alert("Please enter a title first");
      return;
    }

    setLoadingAI(true);
    try {
      // Call your new secure backend API
      const aiResponse = await generateBlog(title); 
      
      if (aiResponse.success && aiResponse.data) {
        setValue("content", aiResponse.data, { shouldValidate: true });
      } else {
        alert(aiResponse.message || "Failed to generate content. Please try again.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Error generating content. Please try again.");
    } finally {
      setLoadingAI(false);
    }
  };

  const schedulePostHandler = async () => {
    if (!userData || !userData._id) {
      alert("User not logged in");
      return;
    }
    if (!scheduledTime) {
      alert("Please select a date and time");
      return;
    }
    const title = getValues("title");
    const content = getValues("content");
    const status = getValues("status");

    if (!title || !content || !status) {
      alert("Please fill in all required fields");
      return;
    }

    setIsScheduling(true);
    try {
      const payload = {
        title,
        content,
        status,
        userId: userData._id,
        time: scheduledTime,
        featuredImage: getValues("image")?.[0] || null,
      };

      const result = await scheduledpost(payload);
      if (result.success) {
        alert("Post scheduled successfully!");
        setScheduledTime("");
        navigate("/");
      } else {
        alert(result.message || "Failed to schedule post");
      }
    } catch (error) {
      console.error("Error scheduling post:", error);
      alert("Error scheduling post. Please try again.");
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={posts ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
            {posts ? "✏️ Edit Post" : "✍️ Create New Post"}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {posts ? "Update your blog post with new content and improvements" : "Share your thoughts and ideas with the world"}
        </p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Input */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                <label className="text-lg font-semibold text-gray-900 dark:text-white">Post Title</label>
              </div>
              <Input
                placeholder="Enter an engaging title for your post..."
                className="text-lg"
                {...register("title", { required: "Title is required" })}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Make it catchy and descriptive</p>
            </div>

            {/* Slug Input */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <label className="text-lg font-semibold text-gray-900 dark:text-white">Slug (URL)</label>
              </div>
              <Input
                placeholder="auto-generated-from-title"
                className="text-sm font-mono"
                {...register("slug", { required: "Slug is required" })}
                onInput={(e) =>
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  })
                }
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Automatically generated from title</p>
            </div>

            {/* Content Editor */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">Content</label>
                </div>
                <button
                  type="button"
                  onClick={generateAIContent}
                  disabled={loadingAI}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loadingAI ? (
                    <>
                      <span className="animate-spin">⌛</span>
                      Generating...
                    </>
                  ) : (
                    <>
                      ✨ Generate with AI
                    </>
                  )}
                </button>
              </div>
              <RTE
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Write your amazing content here</p>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Featured Image */}
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">Featured Image</label>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4 relative group overflow-hidden rounded-xl">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-white text-sm font-medium">Change Image</span>
                    </div>
                  </div>
                )}

                {/* File Input */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !posts })}
                    onChange={(e) => {
                      handleImageChange(e);
                      register("image").onChange(e);
                    }}
                    className="hidden"
                    id="image-input"
                  />
                  <label
                    htmlFor="image-input"
                    className="block w-full px-4 py-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-xl cursor-pointer hover:bg-orange-500/20 transition-colors text-center font-medium text-gray-700 dark:text-gray-300"
                  >
                    📤 Click to upload image
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG, GIF up to 10MB</p>
              </div>

              {/* Status Select - Advanced */}
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  <label className="text-lg font-semibold text-gray-900 dark:text-white">Post Status</label>
                </div>
                
                <div className="space-y-3">
                  {/* Active Status */}
                  <label className="relative flex items-center p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200/50 dark:border-green-800/50 rounded-xl cursor-pointer hover:border-green-400 dark:hover:border-green-600 transition-all group">
                    <input
                      type="radio"
                      value="active"
                      {...register("status", { required: true })}
                      className="w-5 h-5 text-green-500 cursor-pointer accent-green-500"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🚀</span>
                        <span className="font-semibold text-gray-900 dark:text-white">Publish Now</span>
                        <span className="px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">LIVE</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your post will be visible to everyone immediately</p>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </label>

                  {/* Inactive Status */}
                  <label className="relative flex items-center p-4 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200/50 dark:border-yellow-800/50 rounded-xl cursor-pointer hover:border-yellow-400 dark:hover:border-yellow-600 transition-all group">
                    <input
                      type="radio"
                      value="inactive"
                      {...register("status", { required: true })}
                      className="w-5 h-5 text-yellow-500 cursor-pointer accent-yellow-500"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📝</span>
                        <span className="font-semibold text-gray-900 dark:text-white">Save as Draft</span>
                        <span className="px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">DRAFT</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Keep this private for now, edit anytime before publishing</p>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </label>
                </div>

                <div className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                  <p className="text-xs text-blue-900 dark:text-blue-200">
                    <strong>💡 Tip:</strong> You can always change the status later by editing your post
                  </p>
                </div>
              </div>

              {/* Schedule Post Section */}
              {!posts && (
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                    <label className="text-lg font-semibold text-gray-900 dark:text-white">Schedule Post (Optional)</label>
                  </div>
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Select date and time to schedule post publication</p>
                  <Button
                    type="button"
                    onClick={schedulePostHandler}
                    disabled={isScheduling}
                    bgcolor="bg-gradient-to-r from-indigo-500 to-purple-500"
                    className="w-full py-3 text-lg font-semibold shadow-lg hover:shadow-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isScheduling ? "⏳ Scheduling..." : "📅 Schedule Post"}
                  </Button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                bgcolor={posts ? "bg-green-500" : "bg-gradient-to-r from-orange-500 to-red-500"}
                className="w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                {posts ? "🔄 Update Post" : "📤 Publish Post"}
              </Button>

              {/* Info Box */}
              <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  💡 <strong>Tip:</strong> Make sure your title and content are engaging. Add a featured image for better visibility!
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default POSTS;