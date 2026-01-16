require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Function to flatten nested JSON into page.section format
function flattenContent(obj, page = '', result = []) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursive call for nested objects
      flattenContent(value, page ? `${page}.${key}` : key, result);
    } else {
      // Leaf node - add to result
      const parts = page.split('.');
      const pageName = parts[0];
      const section = parts.slice(1).concat(key).join('.');

      result.push({
        page: pageName,
        section: section,
        content: value
      });
    }
  }
  return result;
}

async function populateTranslations() {
  try {
    // Read JSON files
    const slContent = JSON.parse(fs.readFileSync('./src/locales/sl.json', 'utf8'));
    const enContent = JSON.parse(fs.readFileSync('./src/locales/en.json', 'utf8'));

    // Flatten the content
    const slFlat = flattenContent(slContent);
    const enFlat = flattenContent(enContent);

    console.log(`Found ${slFlat.length} SL entries and ${enFlat.length} EN entries`);

    // Delete existing content
    console.log('\nDeleting existing content...');
    const { error: deleteError } = await supabase
      .from('website_content')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError && deleteError.code !== 'PGRST116') {
      console.error('Error deleting:', deleteError);
    }

    // Insert SL content
    console.log('\nInserting Slovenian content...');
    for (let i = 0; i < slFlat.length; i += 100) {
      const batch = slFlat.slice(i, i + 100).map(item => ({
        ...item,
        language: 'sl'
      }));

      const { error } = await supabase
        .from('website_content')
        .insert(batch);

      if (error) {
        console.error(`Error inserting SL batch ${i}:`, error);
        return;
      }
      console.log(`  Inserted ${i + batch.length}/${slFlat.length}`);
    }

    // Insert EN content
    console.log('\nInserting English content...');
    for (let i = 0; i < enFlat.length; i += 100) {
      const batch = enFlat.slice(i, i + 100).map(item => ({
        ...item,
        language: 'en'
      }));

      const { error } = await supabase
        .from('website_content')
        .insert(batch);

      if (error) {
        console.error(`Error inserting EN batch ${i}:`, error);
        return;
      }
      console.log(`  Inserted ${i + batch.length}/${enFlat.length}`);
    }

    console.log('\n✓ All content populated successfully!');
    console.log('\nNow calling rebuild-locales...');

    // Call rebuild-locales
    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/rebuild-locales`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    console.log('Rebuild result:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error:', error);
  }
}

populateTranslations();
