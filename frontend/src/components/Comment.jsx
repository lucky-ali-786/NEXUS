import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createcomment, updatecomment, deletecomment, getcommentsbypostid } from '../../appwrite/comment.js';
import Toast from './Toast';
import ConfirmModal from './ConfirmModal';

function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, commentId: null, isLoading: false });

  const userData = useSelector((state) => state.auth.userData);

  // Fetch comments when the component mounts or postId changes
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await getcommentsbypostid(postId);
      if (response.success) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!userData) {
      setToast({ message: 'Please login to comment', type: 'warning' });
      return;
    }

    if (!commentText.trim()) {
      setToast({ message: 'Please write a comment', type: 'warning' });
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        postId,
        content: commentText,
      };

      const response = await createcomment(payload);

      if (response.success) {
        setCommentText('');
        setToast({ message: 'Comment posted successfully!', type: 'success' });
        fetchComments(); // Re-fetch to update the UI
      } else {
        setToast({ message: response.message || 'Failed to add comment', type: 'error' });
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setToast({ message: 'Failed to add comment', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editText.trim()) {
      setToast({ message: 'Please write a comment', type: 'warning' });
      return;
    }
    try {
      const payload = {
        commentId,
        content: editText
      };

      const response = await updatecomment(payload);
      if (response.success) {
        setEditingId(null);
        setEditText('');
        setToast({ message: 'Comment updated successfully!', type: 'success' });
        fetchComments(); // Re-fetch to update the UI
      } else {
        setToast({ message: response.message || 'Failed to update comment', type: 'error' });
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      setToast({ message: 'Failed to update comment', type: 'error' });
    }
  };

  const handleDeleteComment = async (commentId) => {
    setConfirmModal({ isOpen: true, commentId, isLoading: false });
  };

  const confirmDelete = async () => {
    setConfirmModal(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await deletecomment(confirmModal.commentId);
      if (response.success) {
        fetchComments(); // Re-fetch to update the UI
        setToast({ message: 'Comment deleted successfully!', type: 'success' });
        setConfirmModal({ isOpen: false, commentId: null, isLoading: false });
      } else {
        setToast({ message: response.message || 'Failed to delete comment', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setToast({ message: 'Failed to delete comment', type: 'error' });
    } finally {
      setConfirmModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAuthorName = (userDetails) => {
    return userDetails && userDetails.length > 0 ? userDetails[0].name : 'Anonymous';
  };

  const getAuthorInitial = (userDetails) => {
    const name = getAuthorName(userDetails);
    return name[0]?.toUpperCase() || 'U';
  };

  return (
    <div className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-lg">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, commentId: null, isLoading: false })}
        isLoading={confirmModal.isLoading}
      />
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Comments
        </h3>
        <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-full w-20"></div>
      </div>

      {/* Comment Form */}
      {userData ? (
        <form onSubmit={handleAddComment} className="mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Add your comment
              </label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <p className="text-orange-800 dark:text-orange-200">
            Please <span className="font-semibold">login</span> to leave a comment.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-colors duration-300"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                    {getAuthorInitial(comment.userDetails)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {getAuthorName(comment.userDetails)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Edit/Delete buttons */}
                {userData && comment.userDetails && comment.userDetails.length > 0 && (userData._id === comment.userDetails[0]._id || userData.role === 'admin') && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(comment)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
                      title="Edit comment"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
                      title="Delete comment"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Comment Content */}
              {editingId === comment._id ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows="3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditComment(comment._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {comment.content}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2l-4 4z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      {/* Comment Count */}
      {comments.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">{comments.length}</span> {comments.length === 1 ? 'comment' : 'comments'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Comment;