-- Migration 005: Funder profiles

CREATE TABLE funders (
  id                    SERIAL            PRIMARY KEY,
  slug                  TEXT              NOT NULL UNIQUE,
  name                  TEXT              NOT NULL,
  funder_type           funder_type       NOT NULL,
  tier                  listing_tier      NOT NULL DEFAULT 'free',

  -- Location
  city_id               INT               REFERENCES cities(id),
  region_code           nm_region,
  funds_statewide       BOOLEAN           NOT NULL DEFAULT true,
  funds_national        BOOLEAN           NOT NULL DEFAULT false,

  -- Profile
  ein                   TEXT,
  year_founded          INT,
  description           TEXT,
  full_description      TEXT,
  website_url           TEXT,
  grants_page_url       TEXT,
  phone                 TEXT,
  email                 TEXT,
  contact_name          TEXT,

  -- Grant-making info
  annual_giving         NUMERIC(14,2),
  avg_grant_size        NUMERIC(14,2),
  min_grant             NUMERIC(14,2),
  max_grant             NUMERIC(14,2),
  accepts_unsolicited   BOOLEAN,
  application_process   TEXT,

  -- Media
  logo_url              TEXT,
  hero_image_url        TEXT,

  -- SEO
  meta_title            TEXT,
  meta_description      TEXT,

  -- Moderation
  status                submission_status NOT NULL DEFAULT 'pending',
  is_verified           BOOLEAN           NOT NULL DEFAULT false,

  created_at            TIMESTAMPTZ       NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ       NOT NULL DEFAULT now(),
  deleted_at            TIMESTAMPTZ,

  search_vector         TSVECTOR
);

CREATE INDEX idx_funders_search  ON funders USING GIN(search_vector);
CREATE INDEX idx_funders_type    ON funders(funder_type);
CREATE INDEX idx_funders_region  ON funders(region_code);
CREATE INDEX idx_funders_status  ON funders(status);

CREATE OR REPLACE FUNCTION update_funder_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.full_description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_funder_search_vector
  BEFORE INSERT OR UPDATE ON funders
  FOR EACH ROW EXECUTE FUNCTION update_funder_search_vector();

CREATE TRIGGER trig_funders_updated_at
  BEFORE UPDATE ON funders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Many-to-many: funders <-> sectors they fund
CREATE TABLE funder_sectors (
  funder_id   INT NOT NULL REFERENCES funders(id) ON DELETE CASCADE,
  sector_id   INT NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  PRIMARY KEY (funder_id, sector_id)
);
