'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import FooterPage from '../../../components/Footer';
import { api } from '@/lib/api';

interface ClientPageProps {
  article: any;
  similarArticles?: any[];
}

export default function ClientPage({ article, similarArticles: initialSimilar = [] }: ClientPageProps) {
  const [copied, setCopied] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Dynamic comments and similar posts from database
  const [comments, setComments] = useState<any[]>([]);
  const [similarPosts, setSimilarPosts] = useState<any[]>(initialSimilar);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Threaded replies, edits, and reports states
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyCommentText, setReplyCommentText] = useState('');
  const [reportedCommentIds, setReportedCommentIds] = useState<string[]>([]);

  // Login gate state
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in via localStorage
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      setLoggedInUser(savedName);
      setNewCommentName(savedName);
    }
  }, []);

  // Fetch comments and similar posts on mount
  useEffect(() => {
    if (article._id) {
      // 1. Comments
      api.get(`/comments/post/${article._id}`)
        .then((res) => {
          if (res.data) setComments(res.data);
        })
        .catch(console.error);

      // 2. Similar posts in same category
      const categoryId = typeof article.category === 'object' ? article.category?._id : article.category;
      if (categoryId) {
        api.get(`/posts?limit=5&category=${categoryId}`)
          .then((res) => {
            const docs = res.data?.docs || (Array.isArray(res.data) ? res.data : []);
            // Filter out current post
            const filtered = docs.filter((p: any) => p._id !== article._id).slice(0, 4);
            setSimilarPosts(filtered);
          })
          .catch(console.error);
      }
    }
  }, [article._id, article.category]);

  const getLoggedInUserId = () => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('user_token');
    if (!token) return null;
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = JSON.parse(atob(payloadBase64));
      return decodedJson.id || decodedJson._id || null;
    } catch (e) {
      return null;
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editingCommentText.trim()) return;
    try {
      const token = localStorage.getItem('user_token') || '';
      const res = await api.put(`/comments/${commentId}`, { text: editingCommentText }, token);
      if (res.data) {
        setComments((prev) => prev.map((c) => (c._id === commentId ? res.data : c)));
        setEditingCommentId(null);
        setEditingCommentText('');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to edit comment');
    }
  };

  const handleReplyComment = async (parentCommentId: string) => {
    if (!replyCommentText.trim()) return;

    // If not logged in, redirect to login page
    const savedUser = localStorage.getItem('user_name');
    if (!savedUser) {
      window.location.href = `/login?required=comment&redirect=/blog/${article.slug}`;
      return;
    }

    try {
      const token = localStorage.getItem('user_token') || '';
      const res = await api.post('/comments', {
        post: article._id,
        name: savedUser,
        text: replyCommentText,
        parentId: parentCommentId
      }, token);
      if (res.data) {
        setComments((prev) => [res.data, ...prev]);
        setReplyingCommentId(null);
        setReplyCommentText('');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to post reply');
    }
  };

  const handleReportComment = async (commentId: string) => {
    if (reportedCommentIds.includes(commentId)) return;
    try {
      await api.post(`/comments/${commentId}/report`);
      setReportedCommentIds((prev) => [...prev, commentId]);
    } catch (err) {
      console.error(err);
      alert('Failed to report comment');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    // If not logged in, redirect to login page
    const savedUser = localStorage.getItem('user_name');
    if (!savedUser) {
      window.location.href = `/login?required=comment&redirect=/blog/${article.slug}`;
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('user_token') || '';
      const res = await api.post('/comments', {
        post: article._id,
        name: newCommentName,
        text: newCommentText,
      }, token);
      if (res.data) {
        setComments((prev) => [res.data, ...prev]);
        setNewCommentName(savedUser); // keep name filled
        setNewCommentText('');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInstagramShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    }
  };

  // Format dynamic dates
  const formattedDate = useMemo(() => {
    if (article.date) return article.date;
    if (article.createdAt) {
      return new Date(article.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return '';
  }, [article.date, article.createdAt]);

  // Dynamically parse Table of Contents from HTML h2 headings
  const tableOfContents = useMemo(() => {
    if (article.tableOfContents && article.tableOfContents.length > 0) {
      return article.tableOfContents;
    }
    if (!article.content) return [];

    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    const toc = [];
    let match;
    while ((match = h2Regex.exec(article.content)) !== null) {
      const text = match[1].replace(/<[^>]*>/g, ''); // strip inline tags
      const id = text.replace(/\s+/g, '-').toLowerCase().replace(/[^\w-]/g, '');
      toc.push({ id, title: text });
    }
    return toc;
  }, [article.content, article.tableOfContents]);

  // Inject heading IDs into the content dynamically for TOC links
  const renderedContent = useMemo(() => {
    if (!article.content) return '';

    return article.content.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match: string, attrs: string, contentText: string) => {
      const text = contentText.replace(/<[^>]*>/g, '');
      const id = text.replace(/\s+/g, '-').toLowerCase().replace(/[^\w-]/g, '');
      
      if (attrs.includes('id=')) {
        return `<h2${attrs}>${contentText}</h2>`;
      }
      return `<h2 id="${id}"${attrs}>${contentText}</h2>`;
    });
  }, [article.content]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0e] transition-colors duration-300 flex flex-col font-sans">
      {/* Header */}
      <Header />

      <main className="flex-1 w-full text-zinc-900 dark:text-zinc-100">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24">
          {/* Top Date */}
          <div className="text-xs sm:text-sm font-medium text-zinc-400 dark:text-zinc-500 mb-4">
            {formattedDate}
          </div>

          {/* Title & Introduction Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-8">
            {/* Left 7 columns: Main Title */}
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-[850] leading-[1.15] text-[#111111] dark:text-white tracking-tight">
                {article.title}
              </h1>
            </div>

            {/* Right 5 columns: Intro Text */}
            <div className="lg:col-span-5 text-base md:text-lg text-zinc-650 dark:text-zinc-300 space-y-4 leading-relaxed font-normal">
              <p>{article.introText || article.excerpt}</p>
              {article.secondaryIntro && <p>{article.secondaryIntro}</p>}
            </div>
          </div>

          {/* Main Cover Image */}
          {(article.featuredImage || article.image) && (
            <div className="relative w-full aspect-16/9 max-h-[520px] rounded-2xl md:rounded-3xl overflow-hidden my-6 md:my-10 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={encodeURI(article.featuredImage || article.image)}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Grid: Left TOC | Middle Content | Right CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-6">
            {/* Left Sidebar: Table of Contents & Social Links */}
            <aside className="lg:col-span-3 hidden lg:block sticky top-28 self-start space-y-8">
              {tableOfContents.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
                    TABLE OF CONTENTS
                  </h3>
                  <nav className="space-y-3">
                    {tableOfContents.map((toc: any) => (
                      <a
                        key={toc.id}
                        href={`#${toc.id}`}
                        className="block text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors leading-snug"
                      >
                        {toc.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share Article */}
              <div className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                  Share this article
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    type="button"
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    title="Copy Link"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + (mounted ? window.location.href : ''))}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center"
                    aria-label="Share on WhatsApp"
                    title="Share on WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.49-3.921c1.653.98 3.279 1.503 5.467 1.505 5.568 0 10.106-4.537 10.11-10.109.002-2.698-1.046-5.234-2.953-7.14C17.26 2.43 14.74 1.38 12.008 1.38c-5.574 0-10.11 4.537-10.114 10.111-.002 1.95.507 3.85 1.48 5.522l-.974 3.559 3.657-.96zM17.07 14.37c-.274-.137-1.62-.799-1.87-.891-.25-.092-.432-.137-.614.137-.182.274-.705.891-.864 1.074-.159.182-.318.205-.592.068-.274-.137-1.157-.426-2.203-1.36-.814-.726-1.363-1.624-1.523-1.898-.16-.274-.017-.422.12-.559.123-.123.274-.32.411-.479.137-.16.182-.274.274-.457.092-.182.046-.342-.023-.479-.068-.137-.614-1.483-.841-2.03-.22-.53-.444-.457-.61-.465-.157-.008-.339-.009-.52-.009s-.477.068-.727.342c-.25.274-.954.933-.954 2.277 0 1.344.978 2.64 1.085 2.784.109.144 1.925 2.94 4.664 4.122.651.28 1.159.447 1.554.573.654.207 1.25.178 1.722.107.526-.078 1.62-.662 1.849-1.299.227-.638.227-1.187.16-1.299-.068-.112-.25-.183-.524-.32z"/>
                    </svg>
                  </a>
                  <a
                    href={mounted ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` : `https://www.linkedin.com/sharing/share-offsite/?url=`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center"
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                  <button
                    onClick={handleInstagramShare}
                    type="button"
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Share on Instagram"
                    title="Copy link and open Instagram to share"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </button>
                </div>
              </div>
            </aside>

            {/* Middle Main Content */}
            <div className="lg:col-span-9 space-y-10 text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal text-base md:text-[17px]">
              {/* Media Block / Video Preview if available */}
              {article.mediaBlock && (
                <div className="my-6">
                  {article.mediaBlock.type === 'video' ? (
                    <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
                      {isPlayingVideo ? (
                        <video
                          src={article.mediaBlock.src}
                          controls
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          onClick={() => setIsPlayingVideo(true)}
                          className="relative w-full h-full cursor-pointer group flex items-center justify-center bg-zinc-900"
                        >
                          <Image
                            src={encodeURI(article.featuredImage || article.image)}
                            alt="Video Thumbnail"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                          />
                          {/* Play Button Overlay */}
                          <div className="relative z-10 w-16 h-16 rounded-full bg-[#FF4F18] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <p className="p-3 text-center text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200/50 dark:border-zinc-800/50">
                        {article.mediaBlock.caption}
                      </p>
                    </div>
                  ) : (
                    <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
                      <Image
                        src={encodeURI(article.mediaBlock.src)}
                        alt={article.mediaBlock.caption}
                        fill
                        className="object-cover"
                      />
                      <p className="p-3 text-center text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200/50 dark:border-zinc-800/50">
                        {article.mediaBlock.caption}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Dynamic Content Rendering */}
              {renderedContent ? (
                <div 
                  className="prose prose-lg prose-orange dark:prose-invert max-w-none text-zinc-850 dark:text-zinc-200
                    [&_h2]:scroll-mt-28 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-[850] [&_h2]:text-[#111111] dark:[&_h2]:text-white [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-4
                    [&_p]:text-zinc-650 dark:[&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: renderedContent }} 
                />
              ) : (
                (article.sections || []).map((section: any) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                    <h2 className="text-xl sm:text-2xl font-[850] text-[#111111] dark:text-white tracking-tight">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((para: string, idx: number) => (
                      <p key={idx} className="text-zinc-650 dark:text-zinc-300 leading-relaxed">
                        {para}
                      </p>
                    ))}
                    {section.bulletPoints && (
                      <ul className="list-disc pl-5 space-y-2 text-zinc-650 dark:text-zinc-300 pt-2">
                        {section.bulletPoints.map((item: string, bIdx: number) => (
                          <li key={bIdx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))
              )}

              {/* Discussion / Comments Section */}
              <div className="pt-10 mt-12 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-6">
                <h3 className="text-xl font-[850] text-[#111111] dark:text-white tracking-tight">
                  Discussion ({comments.length})
                </h3>

                 {/* Comments List */}
                <div className="space-y-6">
                  {(() => {
                    const rootComments = comments.filter((c) => !c.parentId);
                    const loggedInUserId = getLoggedInUserId();

                    const renderCommentCard = (comment: any, isReply = false) => {
                      const isOwner = comment.user?._id === loggedInUserId || comment.user === loggedInUserId;
                      const isEditingThis = editingCommentId === comment._id;
                      const isReplyingThis = replyingCommentId === comment._id;
                      const isReported = reportedCommentIds.includes(comment._id) || comment.isReported;

                      return (
                        <div
                          key={comment._id}
                          className={`bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 p-5 rounded-2xl flex flex-col gap-3 transition-all ${
                            isReply ? "ml-8 sm:ml-12 border-l-2 border-l-[#FF4F18]/50" : ""
                          }`}
                        >
                          {/* Top Row: Avatar & Info */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full shrink-0 bg-gradient-to-br from-[#FF4F18] to-[#ff7a4d] flex items-center justify-center font-extrabold text-white text-sm">
                              {comment.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-[#111111] dark:text-white">
                                  {comment.name}
                                </h4>
                                {comment.isEdited && (
                                  <span className="text-[10px] text-zinc-400 dark:text-zinc-550 italic font-medium">(edited)</span>
                                )}
                              </div>
                              <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {/* Middle Row: Text or Edit Input */}
                          {isEditingThis ? (
                            <div className="space-y-2 mt-1">
                              <textarea
                                value={editingCommentText}
                                onChange={(e) => setEditingCommentText(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18]"
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditComment(comment._id)}
                                  className="px-3 py-1 bg-[#FF4F18] text-white rounded-lg text-xs font-bold hover:bg-[#E03F0D]"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingCommentId(null)}
                                  className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg text-xs font-bold"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal mt-1">
                              {comment.text}
                            </p>
                          )}

                          {/* Bottom Row: Actions */}
                          {!isEditingThis && (
                            <div className="flex items-center gap-4 text-[11px] font-bold mt-1 text-zinc-400 dark:text-zinc-500">
                              <button
                                onClick={() => {
                                  setReplyingCommentId(isReplyingThis ? null : comment._id);
                                  setReplyCommentText("");
                                }}
                                className="hover:text-[#FF4F18] transition-colors cursor-pointer"
                              >
                                Reply
                              </button>
                              {isOwner && (
                                <button
                                  onClick={() => {
                                    setEditingCommentId(comment._id);
                                    setEditingCommentText(comment.text);
                                  }}
                                  className="hover:text-[#FF4F18] transition-colors cursor-pointer"
                                >
                                  Edit
                                </button>
                              )}
                              <button
                                onClick={() => handleReportComment(comment._id)}
                                className={`transition-colors cursor-pointer ${
                                  isReported ? "text-red-500 cursor-default" : "hover:text-red-500"
                                }`}
                                disabled={isReported}
                              >
                                {isReported ? "⚠️ Reported" : "Report"}
                              </button>
                            </div>
                          )}

                          {/* Reply Input Box */}
                          {isReplyingThis && (
                            <div className="space-y-2 mt-2 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40">
                              <textarea
                                value={replyCommentText}
                                onChange={(e) => setReplyCommentText(e.target.value)}
                                placeholder={`Reply to ${comment.name}...`}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18]"
                                rows={2}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleReplyComment(comment._id)}
                                  className="px-3 py-1 bg-[#FF4F18] text-white rounded-lg text-xs font-bold hover:bg-[#E03F0D]"
                                >
                                  Post Reply
                                </button>
                                <button
                                  onClick={() => setReplyingCommentId(null)}
                                  className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg text-xs font-bold"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    };

                    return (
                      <div className="space-y-6">
                        {rootComments.map((rootComment) => {
                          const childReplies = comments
                            .filter((c) => c.parentId === rootComment._id)
                            .reverse();

                          return (
                            <div key={rootComment._id} className="space-y-4">
                              {renderCommentCard(rootComment, false)}
                              {childReplies.map((reply) => renderCommentCard(reply, true))}
                            </div>
                          );
                        })}
                        {rootComments.length === 0 && (
                          <p className="text-zinc-400 dark:text-zinc-500 italic text-sm">
                            No comments yet. Be the first to share your thoughts!
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Add Comment Form — always visible, login check on submit */}
                <form onSubmit={handleAddComment} className="flex flex-col gap-4 pt-4">
                  <h4 className="text-xs font-extrabold text-[#FF4F18] uppercase tracking-widest">
                    Add a comment
                  </h4>

                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      placeholder="Your Name"
                      required
                      className="w-full max-w-sm px-4 py-3 text-xs font-medium rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-[#111111] dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] shadow-2xs"
                    />

                    <textarea
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Share your thoughts..."
                      required
                      rows={4}
                      className="w-full px-4 py-3 text-xs font-medium rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-[#111111] dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] shadow-2xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] hover:bg-[#E03F0D] text-white text-xs font-bold px-6 py-3 cursor-pointer self-start shadow-[0_8px_20px_rgba(255,79,24,0.35)] transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Similar Articles Section */}
          {similarPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <h2 className="text-3xl sm:text-4xl font-[850] tracking-tight text-[#111111] dark:text-white mb-8">
                Similar <span className="text-[#FF4F18]">Articles</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarPosts.map((simArticle) => (
                  <Link
                    key={simArticle.slug}
                    href={`/blog/${simArticle.slug}`}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-[24px] bg-zinc-100 dark:bg-zinc-900 mb-3.5 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs">
                      <Image
                        src={encodeURI(simArticle.featuredImage || simArticle.image || '/Kitchen Automation.jpg')}
                        alt={simArticle.title}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#FFF3EF] dark:bg-zinc-900/90 text-[10px] font-extrabold text-[#FF4F18] border border-orange-100 dark:border-transparent">
                        {simArticle.category?.name || 'Articles'}
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold leading-snug text-[#111111] dark:text-white group-hover:text-[#FF4F18] transition-colors mb-2 line-clamp-2">
                      {simArticle.title}
                    </h3>
                    <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-auto">
                      {simArticle.createdAt ? new Date(simArticle.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : simArticle.date}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
