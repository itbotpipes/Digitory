'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import FooterPage from '../../components/Footer';
import { api } from '@/lib/api';

function LoginContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const requiredReason = searchParams.get('required');
  const redirectTo = searchParams.get('redirect') || '/blog';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post('/auth/login', { email, password });
        if (res.data?.token) {
          localStorage.setItem('user_token', res.data.token);
          localStorage.setItem('user_name', res.data.user.name);
          router.push(redirectTo);
        }
      } else {
        const res = await api.post('/auth/signup', { name, email, password });
        if (res.data?.token) {
          localStorage.setItem('user_token', res.data.token);
          localStorage.setItem('user_name', res.data.user.name);
          router.push(redirectTo);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Optional: implement real google login here
    localStorage.setItem('user_name', 'Google User');
    router.push(redirectTo);
  };

  return (
    <div className="relative z-10">
      {/* Alert Message for Comments */}
      {requiredReason === 'comment' && (
        <div className="mb-6 bg-[#FFF3EF] dark:bg-[#FF4F18]/10 border border-[#FF4F18]/20 rounded-xl p-4 flex items-start gap-3">
          <div className="text-[#FF4F18] mt-0.5 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#FF4F18]">Login Required</h4>
            <p className="text-[12px] font-medium text-[#FF4F18]/80 mt-0.5">You must be signed in to post a comment on the blog.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10">
        <Link href="/" className="inline-block mb-6 relative w-16 h-16 rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-300">
          <Image
            src="/demologo.png"
            alt="Digitory Logo"
            fill
            className="object-contain p-2 bg-white"
            priority
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-[850] tracking-tight text-zinc-900 dark:text-white mb-2">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-[15px] text-zinc-500 dark:text-zinc-400 font-medium">
          {isLogin ? 'Enter your details to sign in.' : 'Join Digitory to join the conversation.'}
        </p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex bg-zinc-100 dark:bg-[#1a1a1e] p-1 rounded-xl mb-8">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 text-[13px] font-semibold py-2.5 rounded-lg transition-all duration-200 ${
            isLogin
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 text-[13px] font-semibold py-2.5 rounded-lg transition-all duration-200 ${
            !isLogin
              ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {!isLogin && (
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]/50 focus:border-[#FF4F18] transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]/50 focus:border-[#FF4F18] transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            {isLogin && (
              <a href="#" className="text-[12px] font-semibold text-[#FF4F18] hover:text-[#E03F0D] transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF4F18]/50 focus:border-[#FF4F18] transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF4F18] hover:bg-[#E03F0D] text-white text-[15px] font-bold py-4 rounded-xl shadow-[0_8px_20px_rgba(255,79,24,0.25)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.35)] transition-all active:scale-[0.98] mt-2 disabled:opacity-70"
        >
          {loading ? 'Processing...' : (isLogin ? 'Sign In to Account' : 'Create Account')}
        </button>
      </form>

      {/* Social Auth */}
      <div className="mt-8">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
          </div>
          <span className="relative bg-white dark:bg-[#121214] px-4 text-[12px] font-semibold text-zinc-400 uppercase tracking-wider">
            Or continue with
          </span>
        </div>
        
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1a1a1e] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[14px] font-bold py-3.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors active:scale-[0.98] cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090b] flex flex-col font-sans transition-colors duration-300">
      <Header />

      <main className="flex-1 flex items-center justify-center p-6 md:p-12 mt-20">
        <div className="w-full max-w-[440px] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.2)] relative overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-[#FF4F18]/20 dark:bg-[#FF4F18]/10 blur-[50px] rounded-full pointer-events-none" />

          <Suspense fallback={<div className="relative z-10 h-[400px] flex items-center justify-center text-[#FF4F18]">Loading...</div>}>
            <LoginContent />
          </Suspense>

        </div>
      </main>

      <FooterPage />
    </div>
  );
}
