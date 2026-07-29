export interface Project {
  id: string;
  title: string;
  category: 'Mobile Apps' | 'Web Apps' | 'UI/UX' | 'E-Commerce' | 'Dashboards' | string;
  description: string;
  longDescription: string;
  image: string;
  fallbackImage?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
  features?: string[];
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  tools: string[];
  timeline: string;
}

export interface TechSkill {
  name: string;
  category: 'Frontend' | 'Mobile' | 'Backend' | 'Database' | 'BaaS' | 'Tools' | 'Design' | string;
  icon: string;
  color: string;
  level: number; // percentage
  yearsExp: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url?: string;
  featured?: boolean;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}
