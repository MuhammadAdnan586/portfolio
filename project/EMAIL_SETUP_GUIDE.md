# Email Functionality Setup Guide

## Current Status
✅ Contact form is ready to send emails  
✅ API endpoint created at `/api/send-email`  
✅ Form validation implemented  
✅ Success/error handling in place  

## How It Works

1. **User submits contact form** (name, email, subject, message)
2. **Form sends data to** `/api/send-email` endpoint
3. **API processes the request** and sends email
4. **Email is sent to**: adnank75586@gmail.com

## Enable Real Email Sending (Choose One)

### Option 1: Using Resend (Recommended)

**Step 1: Install Package**
```bash
npm install resend
```

**Step 2: Get API Key**
- Visit https://resend.com
- Sign up for free account
- Get your API key from dashboard

**Step 3: Add Environment Variable**
Create `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

**Step 4: Update `app/api/send-email/route.ts`**
Replace the existing code with:
```typescript
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

    const emailContent = `
      <h2>New Message from ${name}</h2>
      <p><strong>From:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const result = await resend.emails.send({
      from: 'noreply@muhammadadnan.dev', // Change to your domain
      to: 'adnank75586@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: emailContent,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

---

### Option 2: Using SendGrid

**Step 1: Install Package**
```bash
npm install @sendgrid/mail
```

**Step 2: Get API Key**
- Visit https://sendgrid.com
- Create free account
- Get API key from Settings

**Step 3: Add Environment Variable**
```
SENDGRID_API_KEY=your_api_key_here
```

**Step 4: Update `app/api/send-email/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const msg = {
      to: 'adnank75586@gmail.com',
      from: 'noreply@muhammadadnan.dev',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

---

### Option 3: Using Nodemailer (Gmail)

**Step 1: Install Package**
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

**Step 2: Generate Gmail App Password**
- Go to https://myaccount.google.com/security
- Enable 2-factor authentication
- Create App Password for Gmail
- Copy the 16-character password

**Step 3: Add Environment Variables**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-16-chars
```

**Step 4: Update `app/api/send-email/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'adnank75586@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

---

## Optional: Store Messages in Supabase

To save contact messages to a database:

**Step 1: Create Table in Supabase**
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

**Step 2: Update API Route**
Add to `app/api/send-email/route.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Inside POST function, after sending email:
try {
  await supabase.from('contact_messages').insert([
    {
      name,
      email,
      subject,
      message,
    },
  ]);
} catch (dbError) {
  console.error('Database error:', dbError);
}
```

---

## Testing Your Setup

### Test Locally
```bash
npm run dev
```

1. Go to http://localhost:3000
2. Scroll to Contact section
3. Fill in test form
4. Click "Send Message"
5. Should see success message
6. Check email inbox

### Check Network Activity
1. Open DevTools (F12)
2. Go to Network tab
3. Fill and submit form
4. Look for `/api/send-email` request
5. Should see 200 status code

---

## Troubleshooting

### Email not sending
- Check API key is correct
- Verify environment variables are set
- Check email service status page
- Review console for error messages

### "Missing required fields" error
- Make sure form has all fields: name, email, subject, message
- Check for empty values

### CORS issues
- Not applicable for server-to-server communication
- Our API is backend-only

### Email goes to spam
- Add SPF/DKIM records for your domain
- Use branded sender email
- Avoid spam trigger words

---

## Email Service Comparison

| Service | Cost | Setup | Speed | Features |
|---------|------|-------|-------|----------|
| **Resend** | Free 100/day | 5 min | Fast | Simple, React-native |
| **SendGrid** | Free 100/day | 10 min | Fast | Advanced analytics |
| **Nodemailer** | Free | 15 min | Medium | Full control, SMTP |

**Recommendation**: Use **Resend** for simplicity and modern setup.

---

## Production Checklist

- [ ] Email service account created
- [ ] API key generated and added to env vars
- [ ] Code updated with email service
- [ ] Tested locally with sample submission
- [ ] Verified email received in inbox
- [ ] Added custom domain (if using Resend)
- [ ] Set up bounce/complaint handling
- [ ] Added monitoring/logging
- [ ] Deployed to production
- [ ] Re-tested with production URL

---

## Support Resources

- **Resend**: https://resend.com/docs
- **SendGrid**: https://docs.sendgrid.com
- **Nodemailer**: https://nodemailer.com
- **Supabase**: https://supabase.com/docs

---

**Status**: Ready to implement  
**Last Updated**: June 6, 2026
