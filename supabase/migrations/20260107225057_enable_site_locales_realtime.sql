/*
  # Enable Realtime for site_locales

  Enable Supabase Realtime replication for the site_locales table
  so that translation updates are broadcast immediately to all connected clients.
*/

-- Enable realtime for site_locales table
ALTER PUBLICATION supabase_realtime ADD TABLE site_locales;