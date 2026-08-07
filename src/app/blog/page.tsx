import BlogList from "@/features/Blog/BlogList";
import { api } from "@/lib/api";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function Blog() {
  let blogs = [];
  try {
    const res = await api.get('/posts');
    if (res.docs) {
      blogs = res.docs;
    }
  } catch (err) {
    console.error("Failed to fetch blogs", err);
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Knowledge Hub</h1>
        <p className="text-gray-600 mb-12">Discover our latest articles and insights.</p>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}

export default Blog;