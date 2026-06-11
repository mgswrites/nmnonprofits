-- Migration 007: Events, resources, and editorial posts

-- ----------------------------------------------------------------
-- EVENTS
-- ----------------------------------------------------------------

CREATE TABLE events (
  id                SERIAL      PRIMARY KEY,
  listing_id        INT         REFERENCES listings(id) ON DELETE SET NULL,
  funder_id         INT         REFERENCES funders(id)  ON DELETE SET NULL,
  city_id           INT         REFERENCES cities(id),
  region_code       nm_region,
  title             TEXT        NOT NULL,
  slug              TEXT        NOT NULL UNIQUE,
  description       TEXT,
  event_type        TEXT,
  event_date        DATE        NOT NULL,
  event_end_date    DATE,
  start_time        TIME,
  end_time          TIME,
  is_virtual        BOOLEAN     NOT NULL DEFAULT false,
  is_recurring      BOOLEAN     NOT NULL DEFAULT false,
  recurrence_rule   TEXT,
  website_url       TEXT,
  registration_url  TEXT,
  image_url         TEXT,
  is_free           BOOLEAN,
  cost              NUMERIC(8,2),
  meta_title        TEXT,
  meta_description  TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_date  ON events(event_date);
CREATE INDEX idx_events_city  ON events(city_id);
CREATE INDEX idx_events_type  ON events(event_type);

-- ----------------------------------------------------------------
-- RESOURCES
-- ----------------------------------------------------------------

CREATE TABLE resources (
  id              SERIAL      PRIMARY KEY,
  slug            TEXT        NOT NULL UNIQUE,
  title           TEXT        NOT NULL,
  description     TEXT,
  resource_type   TEXT,
  url             TEXT,
  file_url        TEXT,
  is_free         BOOLEAN     NOT NULL DEFAULT true,
  author_name     TEXT,
  published_at    TIMESTAMPTZ,
  is_published    BOOLEAN     NOT NULL DEFAULT false,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE resource_sectors (
  resource_id INT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  sector_id   INT NOT NULL REFERENCES sectors(id)   ON DELETE CASCADE,
  PRIMARY KEY (resource_id, sector_id)
);

-- ----------------------------------------------------------------
-- EDITORIAL POSTS / GUIDES
-- ----------------------------------------------------------------

CREATE TABLE posts (
  id                SERIAL      PRIMARY KEY,
  slug              TEXT        NOT NULL UNIQUE,
  title             TEXT        NOT NULL,
  excerpt           TEXT,
  content           TEXT,
  hero_image_url    TEXT,
  author_name       TEXT        NOT NULL DEFAULT 'NM Nonprofits Editorial',
  published_at      TIMESTAMPTZ,
  is_published      BOOLEAN     NOT NULL DEFAULT false,
  region_code       nm_region,
  city_id           INT         REFERENCES cities(id),
  meta_title        TEXT,
  meta_description  TEXT,
  canonical_url     TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_posts_published ON posts(published_at) WHERE is_published = true;
CREATE INDEX idx_posts_region    ON posts(region_code);

CREATE TABLE post_listings (
  post_id     INT NOT NULL REFERENCES posts(id)    ON DELETE CASCADE,
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  sort_order  INT NOT NULL DEFAULT 0,
  PRIMARY KEY (post_id, listing_id)
);
