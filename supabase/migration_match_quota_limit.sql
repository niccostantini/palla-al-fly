-- Function to count matches created by user in last 7 days
CREATE OR REPLACE FUNCTION count_user_matches_last_7_days(user_email TEXT)
RETURNS INTEGER AS $$
DECLARE
  match_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO match_count
  FROM matches
  WHERE created_by = user_email
    AND created_at >= NOW() - INTERVAL '7 days';
  
  RETURN match_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_user_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM admins WHERE email = user_email);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing INSERT policy for matches
DROP POLICY IF EXISTS "Authenticated users can insert matches" ON matches;

-- Create new INSERT policy with quota limit (3 matches per 7 days)
-- Admins are exempt from quota limit
CREATE POLICY "Authenticated users can insert matches with quota limit"
  ON matches FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    auth.jwt() ->> 'email' = created_by AND
    (
      -- User is admin (no quota limit)
      is_user_admin(auth.jwt() ->> 'email') OR
      -- User has less than 3 matches in last 7 days
      count_user_matches_last_7_days(auth.jwt() ->> 'email') < 3
    )
  );

-- Create index on matches.created_at for performance
CREATE INDEX IF NOT EXISTS idx_matches_created_at ON matches(created_at);

-- Grant execute permissions on functions to authenticated users
GRANT EXECUTE ON FUNCTION count_user_matches_last_7_days(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION is_user_admin(TEXT) TO authenticated;
