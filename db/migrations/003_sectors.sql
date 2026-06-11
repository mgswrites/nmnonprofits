-- Migration 003: Sector taxonomy

CREATE TABLE sectors (
  id                SERIAL  PRIMARY KEY,
  name              TEXT    NOT NULL UNIQUE,
  slug              TEXT    NOT NULL UNIQUE,
  description       TEXT,
  icon_name         TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  org_count         INT     NOT NULL DEFAULT 0
);

INSERT INTO sectors (name, slug, description, icon_name) VALUES
  ('Arts & Culture',               'arts-culture',            'Visual and performing arts, museums, cultural preservation', 'palette'),
  ('Education & Youth',            'education-youth',         'Schools, after-school programs, youth development', 'book-open'),
  ('Health & Human Services',      'health-human-services',   'Healthcare access, mental health, social services', 'heart'),
  ('Housing & Homelessness',        'housing-homelessness',    'Affordable housing, shelter, transitional housing', 'home'),
  ('Environment & Conservation',   'environment-conservation','Land conservation, water rights, climate, outdoor access', 'leaf'),
  ('Food & Agriculture',           'food-agriculture',        'Food banks, food sovereignty, agricultural support', 'wheat'),
  ('Economic Development',         'economic-development',    'Small business, workforce, financial literacy', 'trending-up'),
  ('Civic Engagement',             'civic-engagement',        'Voting rights, advocacy, community organizing', 'megaphone'),
  ('Indigenous Communities',       'indigenous-communities',  'Tribal organizations, language preservation, sovereignty', 'sun'),
  ('Immigration & Refugee Services','immigration-refugee',    'Legal aid, resettlement, integration support', 'compass'),
  ('Animal Welfare',               'animal-welfare',          'Shelters, rescue, wildlife conservation', 'paw-print'),
  ('Substance Use & Recovery',     'substance-use-recovery',  'Prevention, treatment, harm reduction', 'shield');
