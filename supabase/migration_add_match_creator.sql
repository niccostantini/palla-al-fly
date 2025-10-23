-- Add created_by column to matches table
ALTER TABLE matches ADD COLUMN created_by TEXT;

-- Update existing matches (set to first admin if exists, or empty string)
UPDATE matches SET created_by = (SELECT email FROM admins LIMIT 1) WHERE created_by IS NULL;

-- Make created_by NOT NULL after populating
ALTER TABLE matches ALTER COLUMN created_by SET NOT NULL;

-- Create index for performance
CREATE INDEX idx_matches_created_by ON matches(created_by);

-- Drop old DELETE policy for players
DROP POLICY IF EXISTS "Users can delete their own players or admins can delete any" ON players;

-- Create new DELETE policy: creator of player OR creator of match OR admin can delete
CREATE POLICY "Users can delete players they created, match creator can delete any, or admin"
  ON players FOR DELETE
  USING (
    auth.role() = 'authenticated' AND (
      -- User created this player
      auth.jwt() ->> 'email' = created_by OR
      -- User created the match
      auth.jwt() ->> 'email' IN (
        SELECT m.created_by FROM matches m WHERE m.id = match_id
      ) OR
      -- User is admin
      auth.jwt() ->> 'email' IN (SELECT email FROM admins)
    )
  );

-- Update INSERT policy for matches to set created_by
DROP POLICY IF EXISTS "Authenticated users can insert matches" ON matches;

CREATE POLICY "Authenticated users can insert matches"
  ON matches FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    auth.jwt() ->> 'email' = created_by
  );
