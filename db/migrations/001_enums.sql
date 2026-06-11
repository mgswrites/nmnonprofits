-- Migration 001: Enumerations
-- Run before all other migrations

CREATE TYPE org_type AS ENUM (
  'nonprofit_501c3',
  'nonprofit_501c4',
  'fiscal_sponsor',
  'tribal_organization',
  'government_agency',
  'community_foundation',
  'private_foundation',
  'corporate_funder',
  'collaborative_fund',
  'resource_hub'
);

CREATE TYPE listing_tier AS ENUM (
  'free',
  'basic',
  'featured',
  'premium'
);

CREATE TYPE submission_status AS ENUM (
  'pending',
  'approved',
  'rejected',
  'needs_info'
);

CREATE TYPE nm_region AS ENUM (
  'albuquerque_metro',
  'northern_nm',
  'southern_nm',
  'eastern_nm',
  'four_corners',
  'statewide'
);

CREATE TYPE funder_type AS ENUM (
  'community_foundation',
  'private_foundation',
  'family_foundation',
  'corporate_foundation',
  'government_grant',
  'tribal_grant',
  'federal_pass_through'
);

CREATE TYPE grant_status AS ENUM (
  'open',
  'closed',
  'rolling',
  'upcoming'
);
