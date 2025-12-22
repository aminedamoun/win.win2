import Butter from 'buttercms';

const BUTTER_API_KEY = import.meta.env.VITE_BUTTER_API_KEY || '261afe6fdd0847bfc97a9a4f96ec74c76a7db896';

export const butter = Butter(BUTTER_API_KEY);

export interface ButterCategory {
  name: string;
  slug: string;
}

export interface ButterAuthor {
  first_name: string;
  last_name: string;
  email: string;
  slug: string;
  bio: string;
  title: string;
  linkedin_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  pinterest_url?: string;
  twitter_handle?: string;
  profile_image?: string;
}

export interface ButterPost {
  url: string;
  created: string;
  published: string;
  author: ButterAuthor;
  categories: ButterCategory[];
  featured_image: string;
  featured_image_alt: string;
  title: string;
  slug: string;
  body: string;
  summary: string;
  seo_title: string;
  meta_description: string;
  status: string;
  tags?: Array<{ name: string; slug: string }>;
}

export interface ButterPostsResponse {
  meta: {
    count: number;
    next_page: number | null;
    previous_page: number | null;
  };
  data: ButterPost[];
}

export async function getAllPosts(page: number = 1, pageSize: number = 10): Promise<ButterPostsResponse> {
  try {
    const response = await butter.post.list({ page, page_size: pageSize });
    return response.data as ButterPostsResponse;
  } catch (error) {
    console.error('Error fetching posts from ButterCMS:', error);
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<ButterPost> {
  try {
    const response = await butter.post.retrieve(slug);
    return response.data?.data as ButterPost;
  } catch (error) {
    console.error('Error fetching post from ButterCMS:', error);
    throw error;
  }
}

export async function getFeaturedPosts(): Promise<ButterPost[]> {
  try {
    const response = await butter.post.list({ page_size: 100 });
    const allPosts = response.data?.data as ButterPost[] || [];
    return allPosts.slice(0, 1);
  } catch (error) {
    console.error('Error fetching featured posts from ButterCMS:', error);
    throw error;
  }
}

export async function getPostsByCategory(categorySlug: string, page: number = 1, pageSize: number = 10): Promise<ButterPostsResponse> {
  try {
    const response = await butter.post.list({
      page,
      page_size: pageSize,
      category_slug: categorySlug
    });
    return response.data as ButterPostsResponse;
  } catch (error) {
    console.error('Error fetching posts by category from ButterCMS:', error);
    throw error;
  }
}

export async function getAllCategories(): Promise<ButterCategory[]> {
  try {
    const response = await butter.category.list();
    return (response.data?.data as ButterCategory[]) || [];
  } catch (error) {
    console.error('Error fetching categories from ButterCMS:', error);
    return [];
  }
}

export function calculateReadTime(htmlContent: string): number {
  const text = htmlContent.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  return readTime || 1;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
