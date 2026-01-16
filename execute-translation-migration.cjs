require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function executeMigration() {
  try {
    const sql = fs.readFileSync('supabase/migrations/20260116204400_load_all_translations.sql', 'utf8');

    console.log('Executing migration...');
    console.log('SQL length:', sql.length, 'bytes');

    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error('Error executing SQL:', error);

      // Try direct update using JS
      console.log('\nTrying direct update using JS...');
      const slContent = JSON.parse(fs.readFileSync('src/locales/sl.json', 'utf8'));
      const enContent = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));

      console.log('Updating SL...');
      const { error: slError } = await supabase
        .from('site_locales')
        .update({ content: slContent })
        .eq('lang', 'sl');

      if (slError) {
        console.error('Error updating SL:', slError);
        return;
      }
      console.log('✓ SL updated');

      console.log('Updating EN...');
      const { error: enError } = await supabase
        .from('site_locales')
        .update({ content: enContent })
        .eq('lang', 'en');

      if (enError) {
        console.error('Error updating EN:', enError);
        return;
      }
      console.log('✓ EN updated');
    } else {
      console.log('✓ Migration executed successfully');
    }

    // Verify
    console.log('\nVerifying translations...');
    const { data: locales, error: verifyError } = await supabase
      .from('site_locales')
      .select('lang, content')
      .in('lang', ['en', 'sl']);

    if (verifyError) {
      console.error('Error verifying:', verifyError);
      return;
    }

    for (const locale of locales) {
      const keys = Object.keys(locale.content);
      console.log(`${locale.lang.toUpperCase()}: ${keys.join(', ')}`);
    }

    console.log('\n✓ All translations loaded successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

executeMigration();
