require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Create admin client - migrations run with elevated privileges
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  {
    db: { schema: 'public' },
    auth: { persistSession: false }
  }
);

async function forceUpdate() {
  try {
    console.log('Loading translations from JSON files...');
    const slContent = JSON.parse(fs.readFileSync('src/locales/sl.json', 'utf8'));
    const enContent = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));

    console.log('SL keys:', Object.keys(slContent));
    console.log('EN keys:', Object.keys(enContent));

    // Delete and recreate
    console.log('\nDeleting existing records...');
    const { error: deleteError } = await supabase
      .from('site_locales')
      .delete()
      .in('lang', ['sl', 'en']);

    if (deleteError && deleteError.code !== 'PGRST116') {
      console.error('Delete error:', deleteError);
    }

    console.log('Inserting SL...');
    const { data: slData, error: slError } = await supabase
      .from('site_locales')
      .insert({
        lang: 'sl',
        content: slContent,
        updated_at: new Date().toISOString()
      })
      .select();

    if (slError) {
      console.error('SL Error:', slError);
      return;
    }
    console.log('SL inserted:', slData);

    console.log('Inserting EN...');
    const { data: enData, error: enError } = await supabase
      .from('site_locales')
      .insert({
        lang: 'en',
        content: enContent,
        updated_at: new Date().toISOString()
      })
      .select();

    if (enError) {
      console.error('EN Error:', enError);
      return;
    }
    console.log('EN inserted:', enData);

    // Verify
    console.log('\nVerifying...');
    const { data: verify } = await supabase
      .from('site_locales')
      .select('lang, content')
      .in('lang', ['sl', 'en']);

    if (verify) {
      verify.forEach(row => {
        const keys = Object.keys(row.content);
        console.log(`${row.lang}: ${keys.join(', ')}`);
      });
    }

    console.log('\n✓ Translations updated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

forceUpdate();
