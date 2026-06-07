import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. SAVE TO DATABASE (WITH ERROR CHECK)
    const { data, error: dbError } = await supabase
      .from('contact_messages1')
      .insert([{ name, email, subject, message }])
      .select();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { error: 'Database save failed' },
        { status: 500 }
      );
    }

    // 3. SEND EMAIL (WITH ERROR CHECK)
    const emailResult = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'adnank75586@gmail.com',
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    if (!emailResult) {
      console.warn('Email not sent');
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      data
    });

  } catch (error: any) {
    console.error('API ERROR:', error);

    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}