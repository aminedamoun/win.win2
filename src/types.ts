export interface Job {
  id: string;
  title: string;
  type: 'field-sales' | 'call-center' | 'team-leader';
  location: string;
  shortDescription: string;
  salaryRange?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  featured_image_url?: string;
  is_featured: boolean;
  author: string;
  read_time: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  views: number;
}
