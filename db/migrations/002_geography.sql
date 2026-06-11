-- Migration 002: Geography tables

CREATE TABLE regions (
  code              nm_region     PRIMARY KEY,
  name              TEXT          NOT NULL,
  slug              TEXT          NOT NULL UNIQUE,
  description       TEXT,
  hero_image_url    TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  org_count         INT           NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT now()
);

INSERT INTO regions (code, name, slug, description) VALUES
  ('albuquerque_metro', 'Albuquerque Metro', 'albuquerque-metro', 'Albuquerque, Rio Rancho, Bernalillo, and surrounding communities'),
  ('northern_nm',       'Northern New Mexico', 'northern-nm',       'Santa Fe, Taos, Los Alamos, Espanola, and the high-desert corridor'),
  ('southern_nm',       'Southern New Mexico', 'southern-nm',       'Las Cruces, Roswell, Alamogordo, and the southern borderlands'),
  ('eastern_nm',        'Eastern New Mexico',  'eastern-nm',        'Clovis, Portales, Carlsbad, and the eastern plains'),
  ('four_corners',      'Four Corners',        'four-corners',      'Farmington, Gallup, and the northwestern Four Corners region'),
  ('statewide',         'Statewide',           'statewide',         'Organizations serving all of New Mexico');

CREATE TABLE cities (
  id                SERIAL        PRIMARY KEY,
  region_code       nm_region     NOT NULL REFERENCES regions(code),
  name              TEXT          NOT NULL,
  slug              TEXT          NOT NULL,
  description       TEXT,
  hero_image_url    TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  latitude          NUMERIC(9,6),
  longitude         NUMERIC(9,6),
  org_count         INT           NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),
  UNIQUE (region_code, slug)
);

CREATE INDEX idx_cities_region ON cities(region_code);

INSERT INTO cities (region_code, name, slug, latitude, longitude) VALUES
  ('albuquerque_metro', 'Albuquerque',  'albuquerque',  35.085334, -106.605553),
  ('albuquerque_metro', 'Rio Rancho',   'rio-rancho',   35.232960, -106.664841),
  ('albuquerque_metro', 'Bernalillo',   'bernalillo',   35.301441, -106.554230),
  ('northern_nm',       'Santa Fe',     'santa-fe',     35.686975, -105.937799),
  ('northern_nm',       'Taos',         'taos',         36.407353, -105.572987),
  ('northern_nm',       'Los Alamos',   'los-alamos',   35.881496, -106.295845),
  ('northern_nm',       'Española',     'espanola',     36.004139, -106.080841),
  ('northern_nm',       'Las Vegas',    'las-vegas',    35.594206, -105.223137),
  ('southern_nm',       'Las Cruces',   'las-cruces',   32.312818, -106.778259),
  ('southern_nm',       'Roswell',      'roswell',      33.394498, -104.523229),
  ('southern_nm',       'Alamogordo',   'alamogordo',   32.899580, -105.960282),
  ('southern_nm',       'Silver City',  'silver-city',  32.769440, -108.280792),
  ('eastern_nm',        'Clovis',       'clovis',       34.404849, -103.205063),
  ('eastern_nm',        'Carlsbad',     'carlsbad',     32.420709, -104.228971),
  ('eastern_nm',        'Portales',     'portales',     34.185604, -103.330895),
  ('four_corners',      'Farmington',   'farmington',   36.728281, -108.188927),
  ('four_corners',      'Gallup',       'gallup',       35.527963, -108.741395),
  ('four_corners',      'Aztec',        'aztec',        36.820282, -107.992187);
