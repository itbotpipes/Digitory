import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { ARTICLES_DATA } from '../../data/blogData';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/posts/${resolvedParams.slug}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (res.ok) {
      const data = await res.json();
      const post = data.data;
      
      return {
        title: post.seo?.metaTitle || post.title || 'Digitory Blog',
        description: post.seo?.metaDescription || post.excerpt || '',
        openGraph: {
          title: post.seo?.metaTitle || post.title,
          description: post.seo?.metaDescription || post.excerpt,
          images: post.featuredImage ? [{ url: post.featuredImage }] : [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  // Fallback to static data if API fails
  const staticArticle = ARTICLES_DATA[resolvedParams.slug];
  if (staticArticle) {
    return {
      title: staticArticle.title,
      description: staticArticle.introText?.substring(0, 160),
      openGraph: {
        title: staticArticle.title,
        description: staticArticle.introText?.substring(0, 160),
        images: [{ url: staticArticle.image }],
      },
    };
  }

  return {
    title: 'Article Not Found | Digitory',
    description: 'The requested article could not be found.',
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let article = null;
  let similarArticles = [];

  try {
    // 1. Fetch main article
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/posts/${resolvedParams.slug}`, {
      next: { revalidate: 60 }
    });
    
    if (res.ok) {
      const data = await res.json();
      article = data.data;
      
      // Format date for the client component
      if (article) {
        article.date = new Date(article.createdAt || article.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Add fake TOC since our rich text might not have it structured
        if (!article.tableOfContents) {
          article.tableOfContents = [];
        }
      }
    }
    
    // 2. Fetch similar articles (just latest 4 for now)
    const simRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/posts?limit=4`, {
      next: { revalidate: 60 }
    });
    
    if (simRes.ok) {
      const simData = await simRes.json();
      const results = simData.data?.docs || simData.data?.results || simData.data || [];
      // Filter out the current article
      similarArticles = results.filter((p: any) => p.slug !== resolvedParams.slug).slice(0, 4);
    }
    
  } catch (error) {
    console.error('Error fetching article data:', error);
  }

  // Fallback to static data if not found in DB
  if (!article) {
    article = ARTICLES_DATA[resolvedParams.slug];
    if (article) {
      similarArticles = (article.similarSlugs || [])
        .map((slug: string) => ARTICLES_DATA[slug])
        .filter(Boolean)
        .slice(0, 4);
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0d0d0e]">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">Article not found</h1>
      </div>
    );
  }

  return <ClientPage article={article} similarArticles={similarArticles} />;
}
