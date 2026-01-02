import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { text, fromLang, toLang, fieldType } = await req.json();

    if (!text || !fromLang || !toLang) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: text, fromLang, toLang",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const languageNames: Record<string, string> = {
      sl: "Slovenian",
      en: "English",
    };

    const fromLanguage = languageNames[fromLang] || fromLang;
    const toLanguage = languageNames[toLang] || toLang;

    // Check if OpenAI API key is configured
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Translation API not configured. Please add OPENAI_API_KEY to your Supabase Edge Function secrets.",
        }),
        {
          status: 503,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    let systemPrompt = "You are a professional translator. Translate accurately while preserving the meaning and tone.";
    let userPrompt = `Translate the following ${fromLanguage} text to ${toLanguage}.`;

    if (fieldType === "content") {
      systemPrompt = "You are a professional translator specializing in blog content and marketing materials. Maintain the same tone, style, and formatting.";
      userPrompt = `Translate the following ${fromLanguage} blog content to ${toLanguage}. Preserve all HTML tags, formatting, and structure exactly as they are. Only translate the text content within tags, not the HTML tags themselves, attributes, or URLs.\n\nContent:\n${text}`;
    } else if (fieldType === "excerpt" || fieldType === "title") {
      userPrompt = `Translate the following ${fromLanguage} ${fieldType} to ${toLanguage}. Keep it concise and impactful.\n\nText: ${text}`;
    } else {
      userPrompt += `\n\nText: ${text}`;
    }

    // Call OpenAI API for translation
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const translation = data.choices[0].message.content.trim();

    return new Response(
      JSON.stringify({
        success: true,
        translation: translation,
        fromLang: fromLang,
        toLang: toLang,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Translation failed",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
