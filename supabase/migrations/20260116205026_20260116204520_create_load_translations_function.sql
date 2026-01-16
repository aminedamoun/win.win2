/*
  # Create function to load translations with elevated privileges
*/

-- Create a function that can update translations bypassing RLS
CREATE OR REPLACE FUNCTION load_site_translations(
  p_lang TEXT,
  p_content JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete existing
  DELETE FROM site_locales WHERE lang = p_lang;
  
  -- Insert new
  INSERT INTO site_locales (lang, content, updated_at)
  VALUES (p_lang, p_content, now());
END;
$$;

-- Grant execute to anon and authenticated
GRANT EXECUTE ON FUNCTION load_site_translations(TEXT, JSONB) TO anon;
GRANT EXECUTE ON FUNCTION load_site_translations(TEXT, JSONB) TO authenticated;
