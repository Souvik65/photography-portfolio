-- =========================================
-- PORTFOLIO ITEMS (from Gallery.tsx)
-- =========================================
INSERT INTO portfolio_items (title, category, src, sort_order) VALUES
  ('Summer Vows',    'Weddings',   'https://picsum.photos/800/1200?random=11',  1),
  ('Urban Faces',    'Portraits',  'https://picsum.photos/800/800?random=12',   2),
  ('Mountain Peaks', 'Nature',     'https://picsum.photos/1200/800?random=13',  3),
  ('Product Shoot',  'Commercial', 'https://picsum.photos/800/1000?random=14',  4),
  ('First Dance',    'Weddings',   'https://picsum.photos/1000/800?random=15',  5),
  ('Studio Session', 'Portraits',  'https://picsum.photos/800/1200?random=16',  6),
  ('Forest Path',    'Nature',     'https://picsum.photos/800/800?random=17',   7),
  ('Brand Campaign', 'Commercial', 'https://picsum.photos/1200/1000?random=18', 8),
  ('Golden Hour',    'Weddings',   'https://picsum.photos/800/1000?random=19',  9);

-- =========================================
-- PRICING PACKAGES (from Pricing.tsx)
-- =========================================
INSERT INTO pricing_packages (name, price, description, features, popular, sort_order) VALUES
  ('Essential Portrait', '$299',
   'Perfect for individuals, couples, or small families.',
   ARRAY['1 Hour Session','1 Location','20 Edited High-Res Photos','Online Gallery Delivery','Print Release'],
   false, 1),
  ('The Wedding Story', '$1,899',
   'Comprehensive coverage of your special day.',
   ARRAY['8 Hours Coverage','2 Photographers','Engagement Session Included','400+ Edited High-Res Photos','Custom Online Gallery','USB Keepsake'],
   true, 2),
  ('Commercial & Brand', '$850',
   'Professional imagery for your business or brand.',
   ARRAY['Half-Day Shoot (4 Hours)','Multiple Locations/Setups','Commercial Usage Rights','50 Edited High-Res Photos','Fast Turnaround (48h)'],
   false, 3);

-- =========================================
-- TESTIMONIALS (from Testimonials.tsx)
-- =========================================
INSERT INTO testimonials (name, role, image, body, rating, sort_order) VALUES
  ('Sarah & James', 'Wedding Clients', 'https://picsum.photos/150/150?random=21',
   'Alex captured our wedding day perfectly. The photos are absolutely stunning and bring back every emotion of the day. Highly recommended!',
   5, 1),
  ('Emily Chen', 'Fashion Model', 'https://picsum.photos/150/150?random=22',
   'Working with Alex was a dream. The studio session was relaxed, and the final portraits exceeded all my expectations. True professional.',
   5, 2),
  ('Michael Roberts', 'Corporate Event Manager', 'https://picsum.photos/150/150?random=23',
   'We hired Alex for our annual corporate gala. The photos perfectly captured the energy and scale of the event. Will definitely hire again.',
   4, 3);

-- =========================================
-- SKILLS (from Skills.tsx)
-- =========================================
INSERT INTO skills (name, level, sort_order) VALUES
  ('Portrait Photography', 95, 1),
  ('Wedding Photography', 90, 2),
  ('Photo Editing (Lightroom/Photoshop)', 98, 3),
  ('Lighting & Composition', 92, 4),
  ('Commercial & Product', 85, 5);

-- =========================================
-- EQUIPMENT (from Skills.tsx)
-- =========================================
INSERT INTO equipment (name, description, sort_order) VALUES
  ('Sony A7R IV', 'Primary Body', 1),
  ('Sony 24-70mm f/2.8 GM', 'Versatile Zoom', 2),
  ('Sony 85mm f/1.4 GM', 'Portrait Lens', 3),
  ('Profoto B10X Plus', 'Lighting System', 4);

-- =========================================
-- AWARDS (from Skills.tsx)
-- =========================================
INSERT INTO awards (year, title, category, sort_order) VALUES
  ('2025', 'National Geographic Photo of the Year', 'Nature', 1),
  ('2024', 'International Wedding Photographer', '1st Place', 2),
  ('2023', 'Sony World Photography Awards', 'Shortlist', 3);

-- =========================================
-- SITE SETTINGS
-- =========================================
INSERT INTO site_settings (key, value) VALUES
  ('hero', '{
    "tagline": "Professional Photographer",
    "heading": "Capturing Moments That Last Forever",
    "subheading": "Specializing in weddings, portraits, and editorial photography. Turning fleeting moments into timeless visual stories.",
    "bg_image": "https://picsum.photos/1920/1080?random=1",
    "cta_primary": "View Portfolio",
    "cta_secondary": "Book a Session"
  }'::jsonb),
  ('about', '{
    "name": "Alex",
    "subtitle": "Visual Storyteller.",
    "bio_1": "With over a decade of experience behind the lens, I specialize in capturing authentic moments that tell a compelling story. My approach is unobtrusive, allowing natural emotions to unfold while I document the beauty of the world and the people in it.",
    "bio_2": "Whether it''s the intimate exchange of vows, the raw power of wildlife, or the vibrant energy of a live event, my goal is to create images that resonate and endure.",
    "profile_image": "https://picsum.photos/800/1200?random=2",
    "specialties": [
      {"icon": "Heart", "title": "Weddings", "desc": "Capturing the magic of your special day."},
      {"icon": "Users", "title": "Portraits", "desc": "Professional and creative portrait sessions."},
      {"icon": "Globe", "title": "Wildlife", "desc": "Exploring nature through the lens."},
      {"icon": "Camera", "title": "Events", "desc": "Documenting corporate and private events."}
    ]
  }'::jsonb),
  ('footer', '{
    "brand_name": "Lens & Light",
    "tagline": "Capturing life''s most beautiful moments with passion, precision, and a creative eye. Based in New York, available worldwide.",
    "address": "123 Studio Lane, Suite 400\nNew York, NY 10001",
    "phone": "+1 (555) 123-4567",
    "email": "hello@lensandlight.com",
    "instagram_url": "#",
    "twitter_url": "#",
    "facebook_url": "#"
  }'::jsonb);
