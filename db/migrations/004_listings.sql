-- Migration 004: Organization listings

CREATE TABLE listings (
  id                SERIAL            PRIMARY KEY,
  slug              TEXT              NOT NULL UNIQUE,
  name              TEXT              NOT NULL,
  org_type          org_type          NOT NULL DEFAULT 'nonprofit_501c3',
  tier              listing_tier      NOT NULL DEFAULT 'free',

  -- Location
  city_id           INT               REFERENCES cities(id),
  region_code       nm_region,
  address_line1     TEXT,
  address_line2     TEXT,
  city_name         TEXT,
  zip_code          TEXT,
  latitude          NUMERIC(9,6),
  longitude         NUMERIC(9,6),
  serves_statewide  BOOLEAN           NOT NULL DEFAULT false,

  -- Identity & mission
  ein               TEXT,
  year_founded      INT,
  mission           TEXT,
  full_description  TEXT,
  website_url       TEXT,
  phone             TEXT,
  email             TEXT,
  executive_director TEXT,

  -- Financial transparency (public record for 501c3s)
  annual_revenue    NUMERIC(14,2),
  fiscal_year_end   TEXT,
  form_990_url      TEXT,

  -- Media
  hero_image_url    TEXT,
  logo_url          TEXT,

  -- SEO
  meta_title        TEXT,
  meta_description  TEXT,

  -- Verification & moderation
  status            submission_status NOT NULL DEFAULT 'pending',
  is_verified       BOOLEAN           NOT NULL DEFAULT false,
  irs_verified      BOOLEAN           NOT NULL DEFAULT false,
  verified_at       TIMESTAMPTZ,
  verified_by       INT,

  -- Timestamps & soft delete
  created_at        TIMESTAMPTZ       NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ       NOT NULL DEFAULT now(),
  deleted_at        TIMESTAMPTZ,

  -- Full-text search vector
  search_vector     TSVECTOR
);

CREATE INDEX idx_listings_search   ON listings USING GIN(search_vector);
CREATE INDEX idx_listings_city     ON listings(city_id);
CREATE INDEX idx_listings_region   ON listings(region_code);
CREATE INDEX idx_listings_type     ON listings(org_type);
CREATE INDEX idx_listings_tier     ON listings(tier);
CREATE INDEX idx_listings_status   ON listings(status);
CREATE INDEX idx_listings_geo      ON listings(latitude, longitude);
CREATE INDEX idx_listings_ein      ON listings(ein);

-- Many-to-many: listings <-> sectors
CREATE TABLE listing_sectors (
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  sector_id   INT NOT NULL REFERENCES sectors(id)  ON DELETE CASCADE,
  is_primary  BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (listing_id, sector_id)
);

CREATE INDEX idx_listing_sectors_sector ON listing_sectors(sector_id);

-- Full-text search trigger
CREATE OR REPLACE FUNCTION update_listing_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.mission, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.full_description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.city_name, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_listing_search_vector
  BEFORE INSERT OR UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_listing_search_vector();

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
