-- Migration 008: Listing ownership, submissions queue, and analytics

-- ----------------------------------------------------------------
-- LISTING CLAIMS & OWNERSHIP
-- ----------------------------------------------------------------

CREATE TABLE listing_owners (
  id                      SERIAL        PRIMARY KEY,
  listing_id              INT           NOT NULL REFERENCES listings(id),
  email                   TEXT          NOT NULL,
  name                    TEXT          NOT NULL,
  tier                    listing_tier  NOT NULL DEFAULT 'basic',
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT,
  subscription_start      TIMESTAMPTZ,
  subscription_end        TIMESTAMPTZ,
  created_at              TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_owners_listing ON listing_owners(listing_id);
CREATE INDEX idx_owners_email   ON listing_owners(email);

-- ----------------------------------------------------------------
-- SUBMISSION QUEUE
-- ----------------------------------------------------------------

CREATE TABLE listing_submissions (
  id                  SERIAL            PRIMARY KEY,
  name                TEXT              NOT NULL,
  org_type            org_type          NOT NULL,
  region_code         nm_region,
  city_name           TEXT              NOT NULL,
  address             TEXT,
  website_url         TEXT,
  phone               TEXT,
  email               TEXT,
  ein                 TEXT,
  mission             TEXT,
  sectors             TEXT[],
  submitter_name      TEXT,
  submitter_email     TEXT              NOT NULL,
  submitter_note      TEXT,
  status              submission_status NOT NULL DEFAULT 'pending',
  reviewed_at         TIMESTAMPTZ,
  created_listing_id  INT               REFERENCES listings(id),
  created_at          TIMESTAMPTZ       NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------
-- ANALYTICS
-- ----------------------------------------------------------------

CREATE TABLE listing_views (
  listing_id  INT  NOT NULL REFERENCES listings(id),
  view_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  view_count  INT  NOT NULL DEFAULT 1,
  PRIMARY KEY (listing_id, view_date)
);

CREATE TABLE grant_views (
  grant_id    INT  NOT NULL REFERENCES grants(id),
  view_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  view_count  INT  NOT NULL DEFAULT 1,
  PRIMARY KEY (grant_id, view_date)
);

-- ----------------------------------------------------------------
-- VIEWS
-- ----------------------------------------------------------------

CREATE VIEW sector_summary AS
SELECT
  s.id,
  s.name,
  s.slug,
  s.icon_name,
  COUNT(DISTINCT ls.listing_id)                                           AS org_count,
  COUNT(DISTINCT gs.grant_id) FILTER (
    WHERE gr.status IN ('open', 'rolling')
  )                                                                        AS active_grant_count
FROM sectors s
LEFT JOIN listing_sectors ls ON ls.sector_id = s.id
LEFT JOIN grant_sectors gs   ON gs.sector_id = s.id
LEFT JOIN grants gr           ON gr.id = gs.grant_id
GROUP BY s.id, s.name, s.slug, s.icon_name;

CREATE VIEW open_grants_summary AS
SELECT
  g.id,
  g.slug,
  g.title,
  g.deadline_date,
  g.min_amount,
  g.max_amount,
  g.status,
  f.name  AS funder_name,
  f.slug  AS funder_slug
FROM grants g
LEFT JOIN funders f ON f.id = g.funder_id
WHERE g.status IN ('open', 'rolling')
  AND g.deleted_at IS NULL
ORDER BY g.deadline_date ASC NULLS LAST;
