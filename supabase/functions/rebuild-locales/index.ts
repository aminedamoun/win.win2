import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results = { en: null, sl: null };

    // Rebuild both languages
    for (const language of ['en', 'sl']) {
      // Fetch all content for this language
      const { data: allContent, error: fetchError } = await supabase
        .from('website_content')
        .select('page, section, content')
        .eq('language', language);

      if (fetchError) throw fetchError;

      // Build nested JSON structure with page as top level
      const localeData: any = {};
      
      for (const item of allContent) {
        const fullPath = `${item.page}.${item.section}`;
        const keys = fullPath.split('.');
        let current = localeData;

        // Navigate/create nested structure
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          if (!current[key]) current[key] = {};
          current = current[key];
        }

        // Set the final value
        const lastKey = keys[keys.length - 1];
        current[lastKey] = item.content;
      }

      // Update site_locales table
      const { error: upsertError } = await supabase
        .from('site_locales')
        .upsert({
          lang: language,
          content: localeData,
          updated_at: new Date().toISOString()
        }, { onConflict: 'lang' });

      if (upsertError) throw upsertError;

      results[language as keyof typeof results] = {
        itemsProcessed: allContent.length,
        topLevelKeys: Object.keys(localeData)
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Site locales rebuilt successfully',
        results
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error rebuilding locales:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});