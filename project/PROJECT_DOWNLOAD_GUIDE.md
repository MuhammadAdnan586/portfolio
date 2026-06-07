# Muhammad Adnan Portfolio - Download & Setup Guide

## Project Status ✅
Your portfolio project is **COMPLETE** and **PRODUCTION READY**!

---

## 📦 Project Download

### File Information
- **File Name**: `portfolio-project.zip`
- **File Size**: ~911 KB (compressed)
- **Location**: Available at the project root
- **Contents**: Complete source code, components, assets, and configuration

### What's Included
✅ Complete Next.js 15 application  
✅ All components (Navbar, Hero, About, Skills, Projects, etc.)  
✅ Project detail pages with visualizations  
✅ Contact form with email functionality  
✅ Supabase database migrations  
✅ Edge function for email notifications  
✅ Profile image and resume PDFs  
✅ All documentation and guides  

### What's NOT Included (Reduce Size)
❌ `node_modules/` - will reinstall on first setup  
❌ `.next/` - build folder, auto-generated  
❌ `.env` - sensitive data, will be recreated  
❌ `.bolt/` - Bolt-specific files  

---

## 🔧 How to Download & Access

### Step 1: Access the Zip File
The zip file is located at the project root. You can:

**Option A: Direct Download** (if hosted)
- File: `portfolio-project.zip`
- Size: ~911 KB
- Unzip in any directory on your computer

**Option B: From Bolt Project**
- Access through Bolt's file explorer
- Download `portfolio-project.zip` to your computer

**Option C: Command Line** (if you have access)
```bash
# Navigate to download directory
cd ~/Downloads

# Unzip the file
unzip portfolio-project.zip

# Navigate to project
cd project
```

### Step 2: Extract the Zip File
1. **Windows**: Right-click → Extract All → Choose destination folder
2. **Mac**: Double-click → Auto-extracts to same folder
3. **Linux**: `unzip portfolio-project.zip`

### Step 3: Verify Extraction
After extraction, you should see this folder structure:
```
portfolio-project/
├── project/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── supabase/
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── ... (other config files)
└── (zip file)
```

---

## 🚀 Local Setup Instructions

### Prerequisites
- **Node.js**: 18.17 or newer
  - Download from: https://nodejs.org/
  - Verify: `node --version`
- **npm**: Comes with Node.js
  - Verify: `npm --version`

### Step 1: Install Dependencies
```bash
cd project
npm install
```
This installs all required packages (~400MB, takes 2-5 minutes)

### Step 2: Create Environment File
Create a `.env.local` file in the project root:

```env
# Supabase Configuration (from your Supabase project)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Email Service (for sending contact notifications)
RESEND_API_KEY=your_resend_api_key_here
```

**Where to find these values:**
- Login to your Supabase project
- Go to Settings → API
- Copy the URL and anon key
- Copy the service role key

### Step 3: Run Development Server
```bash
npm run dev
```

Open in browser: **http://localhost:3000**

### Step 4: Build for Production
```bash
npm run build
npm run start
```

---

## 💬 Contact Form & Email Setup

### How It Works
1. **User submits contact form** (name, email, subject, message)
2. **Message saved to Supabase** database table: `contact_messages`
3. **Email notification sent** to: **adnank75586@gmail.com**
4. **You can reply** directly to the visitor's email

### Database Storage
- **Table**: `contact_messages`
- **Fields**: name, email, subject, message, created_at, is_read
- **Access**: Supabase dashboard or API

### Email Configuration

#### Option 1: Using Resend (Recommended)
1. **Sign up at**: https://resend.com (free tier available)
2. **Get API Key**: Dashboard → API Keys → Copy your key
3. **Add to `.env.local`**:
   ```env
   RESEND_API_KEY=your_key_here
   ```
4. **Verify domain** (optional, for production)
5. **Emails will be sent** to: adnank75586@gmail.com

#### Option 2: Using SendGrid
1. **Sign up at**: https://sendgrid.com
2. **Create API Key**: Settings → API Keys → Generate
3. **Install**: `npm install @sendgrid/mail`
4. **Add configuration** (see EMAIL_SETUP_GUIDE.md)

#### Option 3: Using Gmail (Nodemailer)
1. **Enable 2FA** on your Gmail account
2. **Generate App Password**: https://myaccount.google.com/security
3. **Install**: `npm install nodemailer`
4. **Add configuration** (see EMAIL_SETUP_GUIDE.md)

### Testing Contact Form Locally
1. Go to http://localhost:3000
2. Scroll to "Contact" section
3. Fill in the form
4. Click "Send Message"
5. Check Supabase dashboard for stored message
6. (If email configured) Check your email inbox

### Accessing Submitted Messages

**Method 1: Supabase Dashboard**
1. Login to Supabase
2. Go to SQL Editor
3. Run: `SELECT * FROM contact_messages ORDER BY created_at DESC;`
4. View all submitted messages

**Method 2: Via API**
```javascript
const { data, error } = await supabase
  .from('contact_messages')
  .select('*')
  .order('created_at', { ascending: false });
```

**Method 3: Create Admin Panel** (optional)
- Add authenticated page to view messages
- Mark messages as read
- Download message data

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```
- Optimized for Next.js
- Auto-deploys on git push
- Free tier available
- Dashboard at: vercel.com

### Option 2: Netlify
1. Connect GitHub repository
2. Configure build command: `npm run build`
3. Configure publish directory: `.next`
4. Deploy automatically on push

### Option 3: Self-Hosted (VPS/Server)
```bash
# Build
npm run build

# Start
npm start
```
Then point your domain to the server.

---

## 📋 Feature Checklist

✅ **Hero Section**
- Profile image with animations
- Typing effect for roles
- Download resume button
- Contact & social links

✅ **About Section**
- Personal introduction
- Animated counters (projects, skills, etc.)
- Education details

✅ **Skills Section**
- 6 skill categories
- Animated progress bars
- 20+ individual skills

✅ **Projects Section**
- 10 featured projects
- Filterable by category
- Project cards with tech tags

✅ **Project Detail Pages**
- Detailed project information
- Performance metrics
- Interactive charts & diagrams
- Dashboard mockups (Power BI)
- Database structure diagrams (SQL)

✅ **Experience Section**
- Timeline visualization
- Work experience
- Education history

✅ **Certifications Section**
- Shows 1 certification (Data Science Orientation - IBM)
- View credential PDF button

✅ **GitHub Section**
- Repository showcase
- Stats and links

✅ **Contact Form**
- Email validation
- Messages stored in Supabase
- Email notifications (configurable)
- Success feedback

✅ **Resume Page**
- PDF viewer
- Download functionality

✅ **Theme Support**
- Dark mode (default)
- Light mode
- Toggle button in navbar

✅ **Responsive Design**
- Mobile (320px+)
- Tablet (640px+)
- Desktop (1024px+)

---

## 🔐 Certifications Status

**Certifications displayed**: 1
- **Data Science Orientation - IBM** (18 November 2025)
- Click "View Credential" to see PDF certificate

---

## 📞 Support & Customization

### Change Contact Email
File: `supabase/functions/send-contact-email/index.ts`
```typescript
to: "adnank75586@gmail.com", // Change this to your email
```
Then redeploy: `mcp__supabase__deploy_edge_function`

### Update Personal Information
- **Name/Title**: `components/hero.tsx`
- **About Text**: `components/about.tsx`
- **Social Links**: Multiple components
- **Project Details**: `app/projects/[id]/page.tsx`

### Add New Project
1. Add project data in `app/projects/[id]/page.tsx`
2. Add card in `components/projects.tsx`
3. Create detail visualization (optional)

### Customize Colors
File: `app/globals.css`
```css
:root {
  --primary: 220 90% 60%;      /* Blue */
  --secondary: 280 85% 55%;    /* Purple */
  --accent: 180 100% 50%;      /* Cyan */
}
```

---

## 📊 Database (Supabase)

### Tables Created
1. **contact_messages** - Stores contact form submissions
   - Columns: id, name, email, subject, message, is_read, created_at
   - Rows: One per contact form submission
   - Auto-created via migration

### Accessing Database
1. Supabase Dashboard: https://supabase.com
2. Your Project → SQL Editor
3. Write queries to view/manage data

### Backing Up Data
```sql
-- Export messages as JSON
SELECT json_agg(to_json(t))
FROM contact_messages t;
```

---

## 🛠️ Troubleshooting

### npm install fails
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Build error
```bash
# Clear build artifacts
rm -rf .next

# Rebuild
npm run build
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Email not sending
- Check RESEND_API_KEY is set in `.env.local`
- Verify API key is valid at resend.com
- Check spam folder
- Review logs for errors

### Supabase connection issues
- Verify NEXT_PUBLIC_SUPABASE_URL is correct
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY is valid
- Ensure database tables exist (run migrations)
- Check RLS policies allow access

---

## 📁 Project Structure
```
project/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── projects/
│   │   ├── [id]/page.tsx        # Project detail pages
│   │   └── layout.tsx           # Projects layout
│   ├── resume/
│   │   └── page.tsx             # Resume viewer
│   └── api/
│       └── send-email/
│           └── route.ts         # Contact form API
│
├── components/                   # React components
│   ├── navbar.tsx               # Navigation
│   ├── hero.tsx                 # Hero section
│   ├── about.tsx                # About section
│   ├── skills.tsx               # Skills section
│   ├── projects.tsx             # Projects grid
│   ├── experience.tsx           # Experience timeline
│   ├── certifications.tsx       # Certifications
│   ├── contact.tsx              # Contact form
│   ├── footer.tsx               # Footer
│   └── ui/                      # shadcn/ui components
│
├── public/                       # Static assets
│   ├── WhatsApp_Image_*.jpeg    # Profile photo
│   ├── Muhammad_Adnan_(CV).pdf  # Resume
│   └── Data_Scientist.pdf       # Certificate
│
├── supabase/                     # Supabase configuration
│   ├── migrations/              # Database migrations
│   │   └── *.sql                # Schema definitions
│   └── functions/               # Edge functions
│       └── send-contact-email/  # Email service
│
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
└── next.config.js               # Next.js config
```

---

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Supabase Docs**: https://supabase.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Shadcn/ui**: https://ui.shadcn.com

---

## ✅ Final Checklist

Before deploying to production:
- [ ] Extract zip file
- [ ] Run `npm install`
- [ ] Create `.env.local` with Supabase credentials
- [ ] Run `npm run dev` and test locally
- [ ] Configure email service (Resend/SendGrid/Gmail)
- [ ] Test contact form
- [ ] Run `npm run build` to verify production build
- [ ] Deploy to your hosting platform
- [ ] Update domain DNS records
- [ ] Test all features on live site
- [ ] Monitor contact messages in Supabase

---

## 🎉 You're All Set!

Your professional portfolio is ready to showcase your skills, projects, and experience to the world!

**Questions?** Refer to:
- `PORTFOLIO_README.md` - Feature documentation
- `EMAIL_SETUP_GUIDE.md` - Email configuration
- `SETUP_GUIDE.md` - Deployment guide

---

**Created**: June 6, 2026  
**Status**: Production Ready ✅  
**Version**: 2.0  
