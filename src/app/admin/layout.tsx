'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (storedToken) setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0d0d0e] text-zinc-900 dark:text-zinc-100 flex flex-col">
      <header className="bg-white dark:bg-[#111111] border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link href="/admin/dashboard" className="text-xl font-bold tracking-tight text-[#111111] dark:text-white">
          Digitory <span className="text-[#FF4F18]">Admin</span>
        </Link>
        {token && (
          <button 
            onClick={handleLogout}
            className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-[#FF4F18] transition-colors"
          >
            Logout
          </button>
        )}
      </header>
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
