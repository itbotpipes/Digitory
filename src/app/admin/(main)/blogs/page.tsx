import { Button } from "@/components/ui/button";
import BlogList from "@/features/Admin/Blog/Table/BlogList";
import Link from "next/link";
import React from "react";

function BlogsPage() {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold">Blogs</h1>

      <div className="space-y-10">
        <div>
          <Button className="cursor-pointer" asChild>
            <Link href={"/admin/blogs/add"}>Add Blog</Link>
          </Button>
        </div>

        <BlogList />
      </div>
    </div>
  );
}

export default BlogsPage;
