import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ChatRequest {
  sessionId: string;
  message: string;
  conversationId?: string;
  language?: string;
}

const COMPANY_INFO_EN = `You are a helpful AI assistant for Win Win, a leading sales recruitment company in Slovenia.

Company Information:
- Win Win is a sales recruitment company specializing in connecting talented individuals with career opportunities in sales
- We offer comprehensive training and selection programs to help people succeed in sales careers
- Contact: office@win-win.si, Phone: +386 XX XXX XXX
- We respond to applications within 24 hours
- Our programs focus on developing sales skills, mentorship, and career growth
- We provide: comprehensive sales training, ongoing mentorship and support, real-world experience, career development opportunities, and performance-based advancement

Application Process:
1. Fill out the online application form on the Apply page
2. Upload your resume
3. We review applications within 24 hours
4. Schedule an interview if you're a good fit
5. Join the selection program and start your career

You can help users with:
- Information about Win Win and our programs
- Answering questions about careers and opportunities in sales
- Scheduling appointments for interviews or consultations
- General inquiries about the application process
- Questions about training programs and career development

Important Instructions:
- Be friendly, professional, conversational, and helpful
- Provide detailed, informative responses that sound natural and human-like
- ALWAYS respond in ENGLISH
- When a user expresses interest in scheduling an appointment (using words like "appointment", "schedule", "meet", "interview", "book", "talk", "consultation", or agrees/says "yes"), immediately offer to help them schedule and indicate you'll show the appointment form
- Always be encouraging about career opportunities at Win Win
- If you don't know specific information, direct them to contact office@win-win.si or offer to schedule an appointment
`;

const COMPANY_INFO_SL = `Si prijazen AI asistent za Win Win, vodilno podjetje za zaposlovanje v prodaji v Sloveniji.

Informacije o podjetju:
- Win Win je podjetje za zaposlovanje v prodaji, ki se specializira za povezovanje talentiranih posameznikov s karierno priložnostmi v prodaji
- Ponujamo celovite programe usposabljanja in selekcije, ki ljudem pomagajo uspeti v prodajni karieri
- Kontakt: office@win-win.si, Telefon: +386 XX XXX XXX
- Na prijave odgovorimo v 24 urah
- Naši programi se osredotočajo na razvoj prodajnih veščin, mentorstvo in karierno rast
- Nudimo: celovito prodajno usposabljanje, stalno mentorstvo in podporo, izkušnje iz resničnega sveta, priložnosti za karierni razvoj in napredovanje na podlagi uspešnosti

Postopek prijave:
1. Izpolnite spletni prijavni obrazec na strani Prijava
2. Naložite svoj življenjepis
3. Prijave pregledamo v 24 urah
4. Če ste primerni, razpišemo razgovor
5. Pridružite se selekcijskemu programu in začnite svojo kariero

Lahko pomagate uporabnikom z:
- Informacijami o Win Win in naših programih
- Odgovorom na vprašanja o karierah in priložnostih v prodaji
- Razporejanjem sestankov za razgovore ali posvetovanja
- Splošnimi poizvedbami o postopku prijave
- Vprašanji o programih usposabljanja in kariernem razvoju

Pomembna navodila:
- Bodi prijazen, profesionalen, pogovoren in v pomoč
- Zagotovi podrobne, informativne odgovore, ki zvenijo naravno in človeško
- VEDNO odgovarjaj v SLOVENŠČINI
- Ko uporabnik izrazi interes za dogovor za sestanek (z besedami kot so "sestanek", "razpored", "srečanje", "razgovor", "rezervacija", "pogovor", "posvetovanje" ali se strinja/reče "da"), takoj ponudi pomoč pri načrtovanju in nakaži, da boš prikazal obrazec za sestanek
- Vedno spodbujaj karierne priložnosti pri Win Win
- Če ne poznaš določenih informacij, jih usmeri na kontakt office@win-win.si ali ponudi dogovor za sestanek
`;

async function generateAIResponse(userMessage: string, conversationHistory: any[], language: string = 'en'): Promise<{ message: string; showAppointmentForm: boolean }> {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  const isSlovenian = language === 'sl';
  const COMPANY_INFO = isSlovenian ? COMPANY_INFO_SL : COMPANY_INFO_EN;

  if (!openaiApiKey || openaiApiKey === 'your_openai_api_key_here') {
    const msg = userMessage.toLowerCase();
    const appointmentKeywords = ['appointment', 'schedule', 'meet', 'interview', 'book', 'talk', 'consultation', 'yes', 'sestanek', 'razpored', 'srečanje', 'razgovor', 'rezervacija', 'pogovor', 'posvetovanje', 'da'];

    if (appointmentKeywords.some(keyword => msg.includes(keyword))) {
      return {
        message: isSlovenian
          ? "Odlično! Odprl bom obrazec za sestanek. Prosim izpolnite svoje podatke in želeni datum/čas, odgovorili vam bomo v najkrajšem možnem času."
          : "Great! I'll open the appointment form for you. Please fill in your details and preferred date/time, and we'll get back to you as soon as possible.",
        showAppointmentForm: true
      };
    }
    return {
      message: isSlovenian
        ? "Hvala za vaše sporočilo! Tukaj sem, da pomagam z informacijami o Win Win programih, kariernih priložnostih in razporejanju sestankov. Kako vam lahko pomagam?"
        : "Thank you for your message! I'm here to help with information about Win Win's programs, career opportunities, and scheduling appointments. How can I assist you?",
      showAppointmentForm: false
    };
  }

  try {
    const messages = [
      {
        role: 'system',
        content: COMPANY_INFO
      },
      ...conversationHistory.slice(-6).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    const msg = userMessage.toLowerCase();
    const aiMsgLower = aiMessage.toLowerCase();
    const shouldShowForm = (
      msg.includes('appointment') || msg.includes('schedule') || msg.includes('meet') ||
      msg.includes('interview') || msg.includes('book') || msg.includes('talk') ||
      msg.includes('consultation') || (msg.includes('yes') && conversationHistory.length > 0)
    ) || (
      aiMsgLower.includes('schedule') || aiMsgLower.includes('appointment') ||
      aiMsgLower.includes('book a') || aiMsgLower.includes('form')
    );

    return {
      message: aiMessage,
      showAppointmentForm: shouldShowForm
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    const msg = userMessage.toLowerCase();
    if (msg.includes('appointment') || msg.includes('schedule') || msg.includes('meet')) {
      return {
        message: "I'd be happy to help you schedule an appointment! Let me open the form for you.",
        showAppointmentForm: true
      };
    }
    return {
      message: "Thank you for your message! I'm here to help with information about Win Win. How can I assist you today?",
      showAppointmentForm: false
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { sessionId, message, conversationId, language }: ChatRequest = await req.json();

    if (!sessionId || !message) {
      throw new Error('Missing required fields: sessionId and message');
    }

    let convId = conversationId;

    // Create or get conversation
    if (!convId) {
      const { data: existingConv } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('session_id', sessionId)
        .maybeSingle();

      if (existingConv) {
        convId = existingConv.id;
      } else {
        const { data: newConv, error: convError } = await supabase
          .from('chat_conversations')
          .insert([{ session_id: sessionId }])
          .select('id')
          .single();

        if (convError) throw convError;
        convId = newConv.id;
      }
    }

    // Save user message
    const { error: userMsgError } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: convId,
        role: 'user',
        content: message
      }]);

    if (userMsgError) throw userMsgError;

    // Get conversation history
    const { data: history } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Generate AI response
    const aiResponse = await generateAIResponse(message, history || [], language || 'en');

    // Save AI response
    const { error: aiMsgError } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: convId,
        role: 'assistant',
        content: aiResponse.message
      }]);

    if (aiMsgError) throw aiMsgError;

    return new Response(
      JSON.stringify({
        success: true,
        conversationId: convId,
        message: aiResponse.message,
        showAppointmentForm: aiResponse.showAppointmentForm
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in chat function:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to process chat message'
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
