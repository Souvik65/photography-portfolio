-- =========================================
-- PORTFOLIO / GALLERY
-- =========================================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  category    TEXT        NOT NULL,
  src         TEXT        NOT NULL,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- PRICING
-- =========================================
CREATE TABLE IF NOT EXISTS pricing_packages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  price       TEXT        NOT NULL,
  description TEXT,
  features    TEXT[]      NOT NULL DEFAULT '{}',
  popular     BOOLEAN     NOT NULL DEFAULT FALSE,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- TESTIMONIALS
-- =========================================
CREATE TABLE IF NOT EXISTS testimonials (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  role        TEXT,
  image       TEXT,
  body        TEXT        NOT NULL,
  rating      SMALLINT    NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- SKILLS
-- =========================================
CREATE TABLE IF NOT EXISTS skills (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  level       SMALLINT    NOT NULL CHECK (level BETWEEN 0 AND 100),
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- EQUIPMENT
-- =========================================
CREATE TABLE IF NOT EXISTS equipment (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  description TEXT,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- AWARDS
-- =========================================
CREATE TABLE IF NOT EXISTS awards (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  year        TEXT        NOT NULL,
  title       TEXT        NOT NULL,
  category    TEXT,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- SITE SETTINGS (key-value store)
-- =========================================
CREATE TABLE IF NOT EXISTS site_settings (
  key         TEXT        PRIMARY KEY,
  value       JSONB       NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- BOOKING SUBMISSIONS
-- =========================================
CREATE TABLE IF NOT EXISTS booking_submissions (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  phone          TEXT,
  event_type     TEXT,
  preferred_date DATE,
  message        TEXT,
  status         TEXT        NOT NULL DEFAULT 'new'
                             CHECK (status IN ('new','read','replied','archived')),
  admin_notes    TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- CONTACT SUBMISSIONS
-- =========================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  subject     TEXT,
  message     TEXT        NOT NULL,
  status      TEXT        NOT NULL DEFAULT 'new'
                          CHECK (status IN ('new','read','replied','archived')),
  admin_notes TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_pricing_updated_at
  BEFORE UPDATE ON pricing_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =========================================
-- DISABLE RLS (service role key used server-side)
-- =========================================
ALTER TABLE portfolio_items     DISABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages    DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials        DISABLE ROW LEVEL SECURITY;
ALTER TABLE skills              DISABLE ROW LEVEL SECURITY;
ALTER TABLE equipment           DISABLE ROW LEVEL SECURITY;
ALTER TABLE awards              DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings       DISABLE ROW LEVEL SECURITY;
ALTER TABLE booking_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
