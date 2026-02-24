// =========================================
// Entity Types (matching Supabase tables)
// =========================================

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  src: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  body: string;
  rating: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  sort_order: number;
  created_at: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface Award {
  id: string;
  year: string;
  title: string;
  category: string;
  sort_order: number;
  created_at: string;
}

// =========================================
// Site Settings Shapes
// =========================================

export interface HeroSettings {
  tagline: string;
  heading: string;
  subheading: string;
  bg_image: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface AboutSpecialty {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutSettings {
  name: string;
  subtitle: string;
  bio_1: string;
  bio_2: string;
  profile_image: string;
  specialties: AboutSpecialty[];
}

export interface FooterSettings {
  brand_name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  instagram_url: string;
  twitter_url: string;
  facebook_url: string;
}

export interface SiteSettings {
  hero: HeroSettings;
  about: AboutSettings;
  footer: FooterSettings;
}

// =========================================
// Form Submissions
// =========================================

export type SubmissionStatus = 'new' | 'read' | 'replied' | 'archived';

export interface BookingSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  preferred_date: string | null;
  message: string;
  status: SubmissionStatus;
  admin_notes: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  admin_notes: string | null;
  created_at: string;
}
