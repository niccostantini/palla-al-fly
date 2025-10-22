-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Venues table
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'full', 'cancelled')),
  setter_req INT NOT NULL DEFAULT 1,
  oh_req INT NOT NULL DEFAULT 2,
  oph_req INT NOT NULL DEFAULT 2,
  mb_req INT NOT NULL DEFAULT 1,
  l_req INT NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Players table
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('setter', 'oh', 'oph', 'mb', 'l')),
  phone_number TEXT,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admins table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for venues
-- Everyone can read venues
CREATE POLICY "Public read access for venues"
  ON venues FOR SELECT
  USING (true);

-- Only admins can insert/update venues
CREATE POLICY "Admins can insert venues"
  ON venues FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'email' IN (SELECT email FROM admins)
  );

CREATE POLICY "Admins can update venues"
  ON venues FOR UPDATE
  USING (
    auth.jwt() ->> 'email' IN (SELECT email FROM admins)
  );

-- RLS Policies for matches
-- Everyone can read matches (public dashboard)
CREATE POLICY "Public read access for matches"
  ON matches FOR SELECT
  USING (true);

-- Authenticated users can insert matches
CREATE POLICY "Authenticated users can insert matches"
  ON matches FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update their own matches or admins can update any
CREATE POLICY "Users can update matches"
  ON matches FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only admins can delete matches
CREATE POLICY "Admins can delete matches"
  ON matches FOR DELETE
  USING (
    auth.jwt() ->> 'email' IN (SELECT email FROM admins)
  );

-- RLS Policies for players
-- Only authenticated users can read players
CREATE POLICY "Authenticated read access for players"
  ON players FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can insert players (must set created_by to their email)
CREATE POLICY "Authenticated users can insert players"
  ON players FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    auth.jwt() ->> 'email' = created_by
  );

-- Users can delete their own players OR admins can delete any
CREATE POLICY "Users can delete their own players or admins can delete any"
  ON players FOR DELETE
  USING (
    auth.role() = 'authenticated' AND (
      auth.jwt() ->> 'email' = created_by OR
      auth.jwt() ->> 'email' IN (SELECT email FROM admins)
    )
  );

-- RLS Policies for admins
-- Authenticated users can read admins (to check permissions)
CREATE POLICY "Authenticated read access for admins"
  ON admins FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_venue_id ON matches(venue_id);
CREATE INDEX idx_players_match_id ON players(match_id);
CREATE INDEX idx_players_created_by ON players(created_by);
CREATE INDEX idx_admins_email ON admins(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
