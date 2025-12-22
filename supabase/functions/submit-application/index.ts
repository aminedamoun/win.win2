import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredTime: string;
  message: string;
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

    const applicationData: ApplicationData = await req.json();

    const { data, error } = await supabase
      .from('job_applications')
      .insert([{
        first_name: applicationData.firstName,
        last_name: applicationData.lastName,
        email: applicationData.email,
        phone: applicationData.phone,
        preferred_time: applicationData.preferredTime,
        message: applicationData.message,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    const emailBody = `
New Job Application Received

Name: ${applicationData.firstName} ${applicationData.lastName}
Email: ${applicationData.email}
Phone: ${applicationData.phone}
Preferred Interview Time: ${applicationData.preferredTime || 'Not specified'}

Message:
${applicationData.message || 'No message provided'}

Application ID: ${data.id}
Submitted: ${new Date().toLocaleString()}
    `.trim();

    console.log('Application received:', emailBody);
    console.log('Email would be sent to: info@win-win.si');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully',
        id: data.id 
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
    console.error('Error processing application:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to submit application' 
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