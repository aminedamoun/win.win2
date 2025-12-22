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
}

const COMPANY_INFO = `
You are a helpful AI assistant for Win Win, a leading sales recruitment company in Slovenia.

Company Information:
- Win Win is a sales recruitment company specializing in connecting talented individuals with career opportunities
- We offer comprehensive training and selection programs
- Contact: info@winwin.si
- We respond to applications within 24 hours
- Our programs focus on developing sales skills and career growth

You can help users with:
1. Information about Win Win and our programs
2. Answering questions about careers and opportunities
3. Scheduling appointments for interviews or consultations
4. General inquiries about the application process

When a user wants to schedule an appointment, collect:
- Full name
- Email address
- Phone number
- Preferred date
- Preferred time
- Any additional message

Be friendly, professional, and concise in your responses.
`;

function generateAIResponse(userMessage: string, conversationHistory: any[]): string {
  const msg = userMessage.toLowerCase();
  
  // Appointment scheduling keywords
  if (msg.includes('appointment') || msg.includes('schedule') || msg.includes('meet') || msg.includes('interview')) {
    return "I'd be happy to help you schedule an appointment! To book a consultation or interview, I'll need the following information:\n\n1. Your full name\n2. Email address\n3. Phone number\n4. Preferred date\n5. Preferred time\n\nYou can also apply directly through our application form on the website, or I can help you schedule something right here. What would you prefer?";
  }
  
  // Company information
  if (msg.includes('who are you') || msg.includes('what is win win') || msg.includes('about')) {
    return "Win Win is Slovenia's leading sales recruitment company. We specialize in connecting talented individuals with exciting career opportunities in sales. We offer comprehensive training programs, personalized career development, and ongoing support to help you succeed in your sales career. Would you like to know more about our programs or schedule an interview?";
  }
  
  // Application process
  if (msg.includes('apply') || msg.includes('application') || msg.includes('how to join')) {
    return "Great question! Here's how to apply to Win Win:\n\n1. Fill out our online application form (you can find it on the Apply page)\n2. Upload your resume\n3. We'll review your application within 24 hours\n4. If you're a good fit, we'll schedule an interview\n5. Join our selection program and start your career!\n\nWould you like me to help you schedule an appointment, or do you have any other questions?";
  }
  
  // Contact information
  if (msg.includes('contact') || msg.includes('email') || msg.includes('phone')) {
    return "You can reach us at:\n\nEmail: info@winwin.si\nPhone: +386 XX XXX XXX\n\nWe typically respond within 24 hours. Is there anything specific I can help you with right now?";
  }
  
  // Programs and training
  if (msg.includes('program') || msg.includes('training') || msg.includes('learn')) {
    return "Our training programs are designed to help you succeed in sales:\n\n- Comprehensive sales training\n- Ongoing mentorship and support\n- Real-world experience\n- Career development opportunities\n- Performance-based advancement\n\nWould you like to learn more or schedule an appointment to discuss which program is right for you?";
  }
  
  // Greeting
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello! Welcome to Win Win. I'm here to help answer your questions about our sales programs and career opportunities. How can I assist you today?";
  }
  
  // Default response
  return "Thank you for your message! I'm here to help you with:\n\n- Information about Win Win and our programs\n- Career opportunities in sales\n- Scheduling appointments\n- Application process\n\nWhat would you like to know more about?";
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

    const { sessionId, message, conversationId }: ChatRequest = await req.json();

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
    const aiResponse = generateAIResponse(message, history || []);

    // Save AI response
    const { error: aiMsgError } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: convId,
        role: 'assistant',
        content: aiResponse
      }]);

    if (aiMsgError) throw aiMsgError;

    return new Response(
      JSON.stringify({
        success: true,
        conversationId: convId,
        message: aiResponse
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