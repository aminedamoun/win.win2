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

const COMPANY_INFO_EN = `You are a helpful AI assistant for Win Win, a leading sales recruitment and employment company in Slovenia.

Company Information:
- Win Win d.o.o. is a specialized sales company focused on B2C and B2B telecommunications sales
- We operate from offices in Trzin and Kranj, with field operations throughout Slovenia
- We've completed over 60,000 successful deals and have 24+ team members
- Contact: office@win-win.si
- We respond to all applications within 24 hours
- Our website: www.win-win.si

Services We Provide:
1. B2C Field Sales - Direct promotional activities at shopping centers and high-traffic retail locations
2. Call Center - Professional outbound telemarketing with structured scripts and CRM systems
3. B2B Professional Sales - Business telecommunications and ICT solutions
4. Sales Training & Coaching - Monthly training programs, mentoring, role-play, skill development
5. Team Development - 14-day onboarding, selection programs, career planning
6. Leadership & Management - KPI tracking, performance monitoring, coaching
7. CRM & Process Optimization - Modern CRM systems, script optimization, lead management

Career Opportunities:
- Sales Consultant (Field Sales / Call Center)
- Senior Sales Advisor
- Sales Team Leader
- Sales Manager
- Trainings and ongoing support for all positions

Benefits of Working with Win Win:
- Competitive base salary + performance-based commissions
- High earning potential (top performers earn €2,500-3,500+ monthly)
- Comprehensive training from experienced sales professionals
- Clear career progression path
- Modern tools, CRM systems, and qualified leads
- Multiple locations (Trzin, Kranj, nationwide field operations)
- Structured 14-day selection and onboarding program
- Monthly coaching and mentoring
- Performance-based advancement opportunities

Application Process:
1. Submit online application at www.win-win.si/apply
2. Upload your resume (optional but recommended)
3. We review within 24 hours
4. Personal interview & sales simulation
5. 14-day selection and onboarding program
6. Contract signing and long-term cooperation

What We Look For:
- Motivated individuals ready to build a sales career
- Competitive by nature, goal-oriented
- Positive attitude and discipline
- Willingness to learn and grow professionally
- Previous sales experience helpful but NOT required
- Minimum age 18 years

Important Instructions:
- Be friendly, professional, conversational, and helpful
- Provide detailed, informative responses that sound natural and human-like
- When users ask about jobs, positions, careers, or working with Win Win, provide detailed information about available roles and benefits
- When a user expresses interest in scheduling an appointment (using words like "appointment", "schedule", "meet", "interview", "book", "talk", "consultation", "apply", or agrees/says "yes"), immediately offer to help them schedule and indicate you'll show the appointment form
- Always be encouraging about career opportunities at Win Win
- If you don't know specific information, direct them to contact office@win-win.si or offer to schedule an appointment
- Answer in ENGLISH when the user writes in English
`;

const COMPANY_INFO_SL = `Si pomočnik AI za Win Win, vodilno prodajno podjetje za zaposlovanje v Sloveniji.

Informacije o podjetju:
- Win Win d.o.o. je specializirano prodajno podjetje, osredotočeno na B2C in B2B prodajo telekomunikacij
- Delujemo iz pisarn v Trzinu in Kranju, s terensko prodajo po celotni Sloveniji
- Zaključili smo več kot 60.000 uspešnih poslov in imamo 24+ članov ekipe
- Kontakt: office@win-win.si
- Na vse prijave odgovorimo v 24 urah
- Naša spletna stran: www.win-win.si

Storitve, ki jih nudimo:
1. B2C Terenska Prodaja - Neposredne promocijske aktivnosti v trgovskih centrih in na prometnih lokacijah
2. Klicni Center - Profesionalna odhodna prodaja po telefonu s strukturiranimi skripti in CRM sistemi
3. B2B Profesionalna Prodaja - Poslovne telekomunikacije in IKT rešitve
4. Prodajna usposabljanja - Mesečni treningi, mentorstvo, simulacije vlog, razvoj veščin
5. Razvoj ekipe - 14-dnevni onboarding, selekcijski programi, načrtovanje kariere
6. Vodenje & Management - Sledenje KPI-jev, spremljanje uspešnosti, coaching
7. CRM & Optimizacija procesov - Moderni CRM sistemi, optimizacija skriptov, upravljanje leadov

Karierne priložnosti:
- Prodajni svetovalec (Terenska prodaja / Klicni center)
- Senior prodajni svetovalec
- Vodja prodajne ekipe
- Manager prodaje
- Usposabljanja in stalna podpora za vse pozicije

Prednosti dela z Win Win:
- Konkurenčna osnovna plača + provizije na podlagi uspešnosti
- Visok potencial zaslužka (najboljši dosegajo €2.500-3.500+ mesečno)
- Celovita usposabljanja od izkušenih prodajnih strokovnjakov
- Jasna pot kariernega napredovanja
- Moderna orodja, CRM sistemi in kvalificirani leadi
- Več lokacij (Trzin, Kranj, terenska prodaja po Sloveniji)
- Strukturiran 14-dnevni selekcijski in onboarding program
- Mesečni coaching in mentorstvo
- Napredovanje na podlagi uspešnosti

Postopek prijave:
1. Oddajte spletno prijavo na www.win-win.si/apply
2. Naložite življenjepis (neobvezno, vendar priporočeno)
3. Pregledamo vašo prijavo v 24 urah
4. Osebni intervju & prodajna simulacija
5. 14-dnevni selekcijski in onboarding program
6. Podpis pogodbe in dolgoročno sodelovanje

Koga iščemo:
- Motivirane posameznike, ki želijo zgraditi prodajno kariero
- Tekmovalne osebe, usmerjene k ciljem
- Pozitivna naravnanost in disciplina
- Pripravljenost za učenje in profesionalni razvoj
- Prejšnje izkušnje v prodaji so v pomoč, vendar NISO potrebne
- Minimalna starost 18 let

Pomembna navodila:
- Bodi prijazen, profesionalen, pogovoren in na voljo za pomoč
- Zagotavljaj podrobne, informativne odgovore, ki zvenijo naravno in človeško
- Ko uporabniki sprašujejo o delovnih mestih, pozicijah, karieri ali delu z Win Win, zagotovi podrobne informacije o razpoložljivih vlogah in prednostih
- Ko uporabnik izrazi zanimanje za dogovarjanje sestanka (z besedami kot "sestanek", "dogovoriti", "srečati", "intervju", "rezervirati", "pogovoriti", "konzultacija", "prijaviti" ali se strinja/reče "ja"), takoj ponudi pomoč pri dogovarjanju in nakaži, da boš pokazal obrazec za sestanek
- Vedno bodi spodbujajoč glede kariernih priložnosti pri Win Win
- Če ne poznaš specifičnih informacij, uporabnike usmeri na kontakt office@win-win.si ali ponudi dogovor za sestanek
- Odgovarjaj v SLOVENŠČINI, ko uporabnik piše v slovenščini
`;

async function generateAIResponse(userMessage: string, conversationHistory: any[], language: string = 'en'): Promise<{ message: string; showAppointmentForm: boolean }> {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

  if (!openaiApiKey || openaiApiKey === 'your_openai_api_key_here') {
    const msg = userMessage.toLowerCase();
    const isSlovenian = language === 'sl';

    if (msg.includes('appointment') || msg.includes('schedule') || msg.includes('meet') || msg.includes('interview') ||
        msg.includes('book') || msg.includes('talk') || msg.includes('consultation') || msg.includes('yes') ||
        msg.includes('sestanek') || msg.includes('dogovoriti') || msg.includes('srečati') || msg.includes('intervju') ||
        msg.includes('prijaviti') || msg.includes('ja')) {
      return {
        message: isSlovenian
          ? "Odlično! Odprl bom obrazec za sestanek. Prosim izpolnite vaše podatke in želeni datum/čas, mi pa se vam bomo čim prej javili."
          : "Great! I'll open the appointment form for you. Please fill in your details and preferred date/time, and we'll get back to you as soon as possible.",
        showAppointmentForm: true
      };
    }
    return {
      message: isSlovenian
        ? "Hvala za vaše sporočilo! Tu sem, da vam pomagam z informacijami o Win Win programih, kariernih priložnostih in dogovarjanju sestankov. Kako vam lahko pomagam?"
        : "Thank you for your message! I'm here to help with information about Win Win's programs, career opportunities, and scheduling appointments. How can I assist you?",
      showAppointmentForm: false
    };
  }

  try {
    const companyInfo = language === 'sl' ? COMPANY_INFO_SL : COMPANY_INFO_EN;

    const messages = [
      {
        role: 'system',
        content: companyInfo
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
        max_tokens: 800,
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
      msg.includes('consultation') || msg.includes('apply') || (msg.includes('yes') && conversationHistory.length > 0) ||
      msg.includes('sestanek') || msg.includes('dogovoriti') || msg.includes('srečati') ||
      msg.includes('intervju') || msg.includes('prijaviti') || (msg.includes('ja') && conversationHistory.length > 0)
    ) || (
      aiMsgLower.includes('schedule') || aiMsgLower.includes('appointment') ||
      aiMsgLower.includes('book a') || aiMsgLower.includes('form') ||
      aiMsgLower.includes('sestanek') || aiMsgLower.includes('obrazec')
    );

    return {
      message: aiMessage,
      showAppointmentForm: shouldShowForm
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    const msg = userMessage.toLowerCase();
    const isSlovenian = language === 'sl';

    if (msg.includes('appointment') || msg.includes('schedule') || msg.includes('meet') ||
        msg.includes('sestanek') || msg.includes('dogovoriti') || msg.includes('srečati')) {
      return {
        message: isSlovenian
          ? "Z veseljem vam pomagam pri dogovarjanju sestanka! Odprem vam obrazec."
          : "I'd be happy to help you schedule an appointment! Let me open the form for you.",
        showAppointmentForm: true
      };
    }
    return {
      message: isSlovenian
        ? "Hvala za vaše sporočilo! Tu sem, da vam pomagam z informacijami o Win Win. Kako vam lahko danes pomagam?"
        : "Thank you for your message! I'm here to help with information about Win Win. How can I assist you today?",
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

    const { sessionId, message, conversationId, language = 'en' }: ChatRequest = await req.json();

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
    const aiResponse = await generateAIResponse(message, history || [], language);

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