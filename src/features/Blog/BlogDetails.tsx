"use client";

import React, { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Clock, User, Tag, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RichEditor from "@/components/rich-text-editor/RichEditor";
import { api } from "@/lib/api";

interface BlogDetailsProps {
  blog: any;
}

function BlogDetails({ blog }: BlogDetailsProps) {
  const readTime = useMemo(() => {
    return Math.max(1, Math.ceil((blog.content?.length || 0) / 100)); // rough estimation
  }, [blog.content]);

  // Comments State
  const [comments, setComments] = useState<any[]>([]);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blog._id) {
      api.get(`/comments/post/${blog._id}`)
        .then((res) => {
          if (res.data) setComments(res.data);
        })
        .catch(console.error);
    }
  }, [blog._id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post("/comments", {
        post: blog._id,
        name: newCommentName,
        text: newCommentText,
      });
      if (res.data) {
        setComments((prev) => [res.data, ...prev]);
        setNewCommentName("");
        setNewCommentText("");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-10 font-medium">
        <ArrowLeft size={18} className="mr-2" /> Back to all articles
      </Link>
      
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            {blog.category || "Article"}
          </span>
          <span className="text-gray-500 flex items-center">
            <Clock size={16} className="mr-1.5" /> {readTime} min read
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
          {blog.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
              <User size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{blog.author || "Admin"}</p>
              <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium">Share:</span>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-bold text-xs">
              TW
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-bold text-xs">
              FB
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-bold text-xs">
              LI
            </button>
          </div>
        </div>
      </header>

      {blog.featuredImage && (
        <div className="w-full aspect-[21/9] bg-gray-100 rounded-3xl overflow-hidden mb-16 relative">
          <Image 
            src={blog.featuredImage} 
            alt={blog.title} 
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {blog.excerpt && (
        <div className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-12 italic border-l-4 border-blue-500 pl-6">
          {blog.excerpt}
        </div>
      )}

      <div className="prose prose-lg prose-blue max-w-none text-gray-800
        [&_.rich-editorjs]:max-w-none [&_.rich-editorjs]:w-full [&_.ProseMirror]:bg-transparent [&_.ProseMirror]:border-none [&_.ProseMirror]:text-gray-900 [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-0 [&_.ProseMirror]:min-h-0 focus:outline-none select-none
      ">
        <RichEditor 
          defaultValue={blog.content} 
          notionMode={true} 
          editable={false} 
        />
      </div>

      {(blog.tags && blog.tags.length > 0) && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3 flex-wrap">
            <Tag size={20} className="text-gray-400" />
            {blog.tags.map((tag: any, idx: number) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                {tag.tag || tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Discussion / Comments Section */}
      <div className="mt-16 pt-12 border-t border-gray-200 space-y-10">
        <h3 className="text-2xl font-bold text-gray-900">
          Discussion ({comments.length})
        </h3>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment: any) => (
            <div
              key={comment._id}
              className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex flex-col sm:flex-row gap-5"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg">{comment.name}</h4>
                <p className="text-xs text-gray-500 mb-3">{new Date(comment.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-700 leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-8">
          <h4 className="font-bold text-gray-900 mb-6 text-xl">Add a comment</h4>
          <form onSubmit={handleAddComment} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Your Comment</label>
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 self-start bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>
      </div>

    </article>
  );
}

export default BlogDetails;
