// ----------------------------------------------------------------
// Database enum mirrors
// ----------------------------------------------------------------

export type OrgType =
  | 'nonprofit_501c3'
  | 'nonprofit_501c4'
  | 'fiscal_sponsor'
  | 'tribal_organization'
  | 'government_agency'
  | 'community_foundation'
  | 'private_foundation'
  | 'corporate_funder'
  | 'collaborative_fund'
  | 'resource_hub';

export type ListingTier = 'free' | 'basic' | 'featured' | 'premium';

export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'needs_info';

export type NmRegion =
  | 'albuquerque_metro'
  | 'northern_nm'
  | 'southern_nm'
  | 'eastern_nm'
  | 'four_corners'
  | 'statewide';

export type FunderType =
  | 'community_foundation'
  | 'private_foundation'
  | 'family_foundation'
  | 'corporate_foundation'
  | 'government_grant'
  | 'tribal_grant'
  | 'federal_pass_through';

export type GrantStatus = 'open' | 'closed' | 'rolling' | 'upcoming';

// ----------------------------------------------------------------
// Row types — match DB column names exactly
// ----------------------------------------------------------------

export interface Region {
  code: NmRegion;
  name: string;
  slug: string;
  description: string | null;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  org_count: number;
  created_at: string;
}

export interface City {
  id: number;
  region_code: NmRegion;
  name: string;
  slug: string;
  description: string | null;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  latitude: string | null;
  longitude: string | null;
  org_count: number;
  created_at: string;
}

export interface Sector {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string | null;
  meta_title: string | null;
  meta_description: string | null;
  org_count: number;
}

export interface Listing {
  id: number;
  slug: string;
  name: string;
  org_type: OrgType;
  tier: ListingTier;
  city_id: number | null;
  region_code: NmRegion | null;
  address_line1: string | null;
  address_line2: string | null;
  city_name: string | null;
  zip_code: string | null;
  latitude: string | null;
  longitude: string | null;
  serves_statewide: boolean;
  ein: string | null;
  year_founded: number | null;
  mission: string | null;
  full_description: string | null;
  website_url: string | null;
  phone: string | null;
  email: string | null;
  executive_director: string | null;
  annual_revenue: string | null;
  fiscal_year_end: string | null;
  form_990_url: string | null;
  hero_image_url: string | null;
  logo_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: SubmissionStatus;
  is_verified: boolean;
  irs_verified: boolean;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Funder {
  id: number;
  slug: string;
  name: string;
  funder_type: FunderType;
  tier: ListingTier;
  city_id: number | null;
  region_code: NmRegion | null;
  funds_statewide: boolean;
  funds_national: boolean;
  ein: string | null;
  year_founded: number | null;
  description: string | null;
  full_description: string | null;
  website_url: string | null;
  grants_page_url: string | null;
  phone: string | null;
  email: string | null;
  contact_name: string | null;
  annual_giving: string | null;
  avg_grant_size: string | null;
  min_grant: string | null;
  max_grant: string | null;
  accepts_unsolicited: boolean | null;
  application_process: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: SubmissionStatus;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Grant {
  id: number;
  slug: string;
  funder_id: number | null;
  title: string;
  description: string | null;
  full_description: string | null;
  eligible_org_types: string[] | null;
  eligible_regions: NmRegion[] | null;
  serves_statewide: boolean;
  min_amount: string | null;
  max_amount: string | null;
  is_amount_disclosed: boolean;
  status: GrantStatus;
  deadline_date: string | null;
  open_date: string | null;
  is_rolling: boolean;
  apply_url: string | null;
  rfp_url: string | null;
  contact_email: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Event {
  id: number;
  listing_id: number | null;
  funder_id: number | null;
  city_id: number | null;
  region_code: NmRegion | null;
  title: string;
  slug: string;
  description: string | null;
  event_type: string | null;
  event_date: string;
  event_end_date: string | null;
  start_time: string | null;
  end_time: string | null;
  is_virtual: boolean;
  is_recurring: boolean;
  website_url: string | null;
  registration_url: string | null;
  image_url: string | null;
  is_free: boolean | null;
  cost: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  hero_image_url: string | null;
  author_name: string;
  published_at: string | null;
  is_published: boolean;
  region_code: NmRegion | null;
  city_id: number | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  created_at: string;
  updated_at: string;
}

// ----------------------------------------------------------------
// Enriched / joined types used by page components
// ----------------------------------------------------------------

export interface ListingCard {
  id: number;
  slug: string;
  name: string;
  mission: string | null;
  city_name: string | null;
  region_code: NmRegion | null;
  logo_url: string | null;
  tier: ListingTier;
  is_verified: boolean;
  sectors: Pick<Sector, 'id' | 'name' | 'slug'>[];
}

export interface GrantCard {
  id: number;
  slug: string;
  title: string;
  deadline_date: string | null;
  status: GrantStatus;
  min_amount: string | null;
  max_amount: string | null;
  funder_name: string | null;
  funder_slug: string | null;
  sectors: Pick<Sector, 'id' | 'name' | 'slug'>[];
}

export interface SectorSummary {
  id: number;
  name: string;
  slug: string;
  icon_name: string | null;
  org_count: number;
  active_grant_count: number;
}

export type JobType = 'full_time' | 'part_time' | 'contract' | 'volunteer' | 'internship';

export interface JobPosting {
  id: number;
  slug: string;
  title: string;
  org_name: string;
  listing_id: number | null;
  city_name: string | null;
  region_code: NmRegion | null;
  job_type: JobType;
  salary_min: number | null;
  salary_max: number | null;
  salary_note: string | null;
  description: string | null;
  how_to_apply: string | null;
  application_url: string | null;
  contact_email: string | null;
  deadline: string | null;
  status: string;
  submitter_email: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface JobCard {
  id: number;
  slug: string;
  title: string;
  org_name: string;
  listing_slug: string | null;
  city_name: string | null;
  region_code: NmRegion | null;
  job_type: JobType;
  salary_min: number | null;
  salary_max: number | null;
  salary_note: string | null;
  deadline: string | null;
  created_at: string;
}

// ----------------------------------------------------------------
// Form / API payload types
// ----------------------------------------------------------------

export interface ListingSubmissionPayload {
  name: string;
  org_type: OrgType;
  region_code: NmRegion;
  city_name: string;
  address?: string;
  website_url?: string;
  phone?: string;
  email?: string;
  ein?: string;
  mission?: string;
  sectors: string[];
  submitter_name?: string;
  submitter_email: string;
  submitter_note?: string;
}
