import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, recaptchaToken }: ContactRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone });

    // Validate inputs
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify reCAPTCHA (with fallback for development)
    const recaptchaSecret = Deno.env.get("RECAPTCHA_SECRET_KEY");
    const isDevelopment = !recaptchaSecret || recaptchaSecret === "";
    
    if (recaptchaToken && recaptchaSecret) {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
        { method: "POST" }
      );
      
      const recaptchaData = await recaptchaResponse.json();
      
      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.error("reCAPTCHA verification failed:", recaptchaData);
        
        // In production, reject the request
        if (!isDevelopment) {
          return new Response(
            JSON.stringify({ error: "reCAPTCHA verification failed. Please try again." }),
            {
              status: 400,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            }
          );
        }
        
        console.warn("reCAPTCHA failed but allowing in development mode");
      } else {
        console.log("reCAPTCHA verified successfully, score:", recaptchaData.score);
      }
    } else {
      console.warn("reCAPTCHA validation skipped - running in development mode or no token provided");
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Save to database
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone,
        message,
        status: "new",
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save submission");
    }

    console.log("Saved to database successfully");

    // Send email notification to Resend account owner
    console.log("Sending contact form notification");
    
    const emailResponse = await resend.emails.send({
      from: "NuSeal Contact Form <onboarding@resend.dev>",
      replyTo: email,
      to: ["marcus@kdpog.co.za"],
      subject: `NuSeal Contact Form: New Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Customer Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Customer Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Message:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
        <p style="color: #666; font-size: 12px;">You can reply directly to this email to respond to the customer.</p>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend email error:", emailResponse.error);
      throw new Error(`Failed to send email: ${emailResponse.error.message}`);
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you! We will contact you within 24 hours.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to submit form. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
