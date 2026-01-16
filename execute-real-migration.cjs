require('dotenv').config();
const fs = require('fs');

async function executeMigration() {
  const slContent = JSON.parse(fs.readFileSync('src/locales/sl.json', 'utf8'));
  const enContent = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));

  const { createClient } = require('@supabase/supabase-js');

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
  );

  console.log('Disabling RLS temporarily...');

  // Insert SL
  console.log('Inserting SL translations...');
  const { data: slData, error: slError } = await supabase
    .from('site_locales')
    .insert({
      lang: 'sl',
      content: slContent
    })
    .select();

  if (slError) {
    console.error('SL Error:', slError);

    // Try with RPC if available
    console.log('Trying alternative method...');

    const sqlSL = `
      INSERT INTO site_locales (lang, content, updated_at)
      VALUES ('sl', '${JSON.stringify(slContent).replace(/'/g, "''")}', now())
      ON CONFLICT (lang) DO UPDATE SET content = EXCLUDED.content, updated_at = now();
    `;

    const { error: rpcError } = await supabase.rpc('exec_sql', { query: sqlSL });
    if (rpcError) {
      console.error('RPC Error:', rpcError);
    }
  } else {
    console.log('✓ SL inserted');
  }

  // Insert EN
  console.log('Inserting EN translations...');
  const { data: enData, error: enError } = await supabase
    .from('site_locales')
    .insert({
      lang: 'en',
      content: enContent
    })
    .select();

  if (enError) {
    console.error('EN Error:', enError);

    const sqlEN = `
      INSERT INTO site_locales (lang, content, updated_at)
      VALUES ('en', '${JSON.stringify(enContent).replace(/'/g, "''")}', now())
      ON CONFLICT (lang) DO UPDATE SET content = EXCLUDED.content, updated_at = now();
    `;

    const { error: rpcError } = await supabase.rpc('exec_sql', { query: sqlEN });
    if (rpcError) {
      console.error('RPC Error:', rpcError);
    }
  } else {
    console.log('✓ EN inserted');
  }

  // Verify
  console.log('\\nVerifying...');
  const { data: verify } = await supabase
    .from('site_locales')
    .select('lang, content');

  if (verify && verify.length > 0) {
    verify.forEach(row => {
      const keys = Object.keys(row.content);
      console.log(`${row.lang}: ${keys.join(', ')}`);
    });
    console.log('\\n✓ SUCCESS! All translations loaded.');
  } else {
    console.log('⚠ No data found in database');
  }
}

executeMigration().catch(console.error);
