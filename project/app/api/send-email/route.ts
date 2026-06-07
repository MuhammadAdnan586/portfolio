import { NextRequest, NextResponse } from 'next/server';
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

    await resend.emails.send({
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

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error: any) {
    console.error('API ERROR:', error);
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}