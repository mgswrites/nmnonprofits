-- Migration 006: Grant opportunities

CREATE TABLE grants (
  id                    SERIAL        PRIMARY KEY,
  slug                  TEXT          NOT NULL UNIQUE,
  funder_id             INT           REFERENCES funders(id) ON DELETE SET NULL,
  title                 TEXT          NOT NULL,
  description           TEXT,
  full_description      TEXT,

  -- Eligibility
  eligible_org_types    TEXT[],
  eligible_regions      nm_region[],
  serves_statewide      BOOLEAN       NOT NULL DEFAULT false,

  -- Amounts
  min_amount            NUMERIC(14,2),
  max_amount            NUMERIC(14,2),
  is_amount_disclosed   BOOLEAN       NOT NULL DEFAULT true,

  -- Deadlines
  status                grant_status  NOT NULL DEFAULT 'open',
  deadline_date         DATE,
  open_date             DATE,
  is_rolling            BOOLEAN       NOT NULL DEFAULT false,

  -- Application
  apply_url             TEXT,
  rfp_url               TEXT,
  contact_email         TEXT,

  -- SEO
  meta_title            TEXT,
  meta_description      TEXT,

  created_at            TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ   NOT NULL DEFAULT now(),
  deleted_at            TIMESTAMPTZ
);

CREATE INDEX idx_grants_funder   ON grants(funder_id);
CREATE INDEX idx_grants_status   ON grants(status);
CREATE INDEX idx_grants_deadline ON grants(deadline_date);

CREATE TRIGGER trig_grants_updated_at
  BEFORE UPDATE ON grants
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Many-to-many: grants <-> sectors
CREATE TABLE grant_sectors (
  grant_id    INT NOT NULL REFERENCES grants(id) ON DELETE CASCADE,
  sector_id   INT NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  PRIMARY KEY (grant_id, sector_id)
);
