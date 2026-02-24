import { z } from 'zod';

// =========================================
// Portfolio
// =========================================
export const PortfolioItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  src: z.string().min(1, 'Image source is required'),
  sort_order: z.number().int().default(0),
});

export const PortfolioItemUpdateSchema = PortfolioItemSchema.partial();

// =========================================
// Pricing
// =========================================
export const PricingPackageSchema = z.object({
  name: z.string().min(1, 'Package name is required'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().default(''),
  features: z.array(z.string()).default([]),
  popular: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

export const PricingPackageUpdateSchema = PricingPackageSchema.partial();

// =========================================
// Testimonials
// =========================================
export const TestimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().default(''),
  image: z.string().default(''),
  body: z.string().min(1, 'Testimonial text is required'),
  rating: z.number().int().min(1).max(5).default(5),
  sort_order: z.number().int().default(0),
});

export const TestimonialUpdateSchema = TestimonialSchema.partial();

// =========================================
// Skills
// =========================================
export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.number().int().min(0).max(100),
  sort_order: z.number().int().default(0),
});

export const SkillUpdateSchema = SkillSchema.partial();

// =========================================
// Equipment
// =========================================
export const EquipmentSchema = z.object({
  name: z.string().min(1, 'Equipment name is required'),
  description: z.string().default(''),
  sort_order: z.number().int().default(0),
});

export const EquipmentUpdateSchema = EquipmentSchema.partial();

// =========================================
// Awards
// =========================================
export const AwardSchema = z.object({
  year: z.string().min(1, 'Year is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().default(''),
  sort_order: z.number().int().default(0),
});

export const AwardUpdateSchema = AwardSchema.partial();

// =========================================
// Site Settings
// =========================================
export const HeroSettingsSchema = z.object({
  tagline: z.string().default(''),
  heading: z.string().default(''),
  subheading: z.string().default(''),
  bg_image: z.string().default(''),
  cta_primary: z.string().default(''),
  cta_secondary: z.string().default(''),
});

export const AboutSpecialtySchema = z.object({
  icon: z.string(),
  title: z.string(),
  desc: z.string(),
});

export const AboutSettingsSchema = z.object({
  name: z.string().default(''),
  subtitle: z.string().default(''),
  bio_1: z.string().default(''),
  bio_2: z.string().default(''),
  profile_image: z.string().default(''),
  specialties: z.array(AboutSpecialtySchema).default([]),
});

export const FooterSettingsSchema = z.object({
  brand_name: z.string().default(''),
  tagline: z.string().default(''),
  address: z.string().default(''),
  phone: z.string().default(''),
  email: z.string().default(''),
  instagram_url: z.string().default(''),
  twitter_url: z.string().default(''),
  facebook_url: z.string().default(''),
});

// =========================================
// Form Submissions
// =========================================
export const BookingSubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().default(''),
  event_type: z.string().default(''),
  preferred_date: z.string().optional(),
  message: z.string().default(''),
});

export const ContactSubmissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().default(''),
  message: z.string().min(1, 'Message is required'),
});

export const SubmissionUpdateSchema = z.object({
  status: z.enum(['new', 'read', 'replied', 'archived']).optional(),
  admin_notes: z.string().optional(),
});
