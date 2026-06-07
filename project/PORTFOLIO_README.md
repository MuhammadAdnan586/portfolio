# Muhammad Adnan's Portfolio

A world-class, premium, modern, and highly interactive personal portfolio website built with cutting-edge web technologies.

## Features

### Core Features
- **Premium SaaS-Level Design**: Glassmorphism cards, gradient accents, and professional styling
- **Dark/Light Theme Toggle**: Seamless theme switching with Next Themes
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Performance Optimized**: Fast loading, smooth animations, optimized bundle size

### Pages & Sections

#### 1. Home Page (`/`)
- **Hero Section**: 
  - Professional profile image with animated background
  - Typing effect for dynamic role display
  - CTA buttons for resume download and contact
  - Social media links (LinkedIn, GitHub, Email)

- **About Section**:
  - Personal introduction and education details
  - Animated counters (Projects, Certifications, Skills, Technologies)
  - Interest tags with hover effects

- **Skills Section**:
  - 6 skill categories with animated progress bars
  - Visual representation of expertise levels
  - Glassmorphism card design

- **Projects Section**:
  - Filterable project cards by category
  - Project cards with technology tags, accuracy metrics
  - Interactive category filters (All, Machine Learning, Deep Learning, Power BI, SQL)
  - "Details" button for individual project pages

- **Experience Section**:
  - Timeline design for work experience and education
  - Visual timeline with connecting lines
  - Hover effects and smooth animations

- **Certifications Section**:
  - Glassmorphism certificate cards
  - Rotating award icons
  - Links to credential verification

- **GitHub Projects Section**:
  - GitHub repository showcase
  - Stars and forks display
  - Direct links to repositories

- **Contact Section**:
  - Contact form with validation
  - Social contact methods
  - Success message animation

#### 2. Project Detail Pages (`/projects/[id]`)
- Dynamic project pages with detailed information
- Performance metrics visualization
- Interactive charts using Recharts:
  - Bar charts for feature importance
  - Pie charts for distributions
  - Line charts for training history
  - Feature importance analysis
- Project technologies and key features
- Links to GitHub and contact options

#### 3. Resume Page (`/resume`)
- PDF viewer for resume
- Download functionality
- Professional layout

### Technology Stack
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Theme**: Next Themes
- **Scroll Detection**: React Intersection Observer

### Design Elements

#### Color System
- **Primary**: Blue (#3b82f6)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Cyan (#06b6d4)
- **Background**: Dark navy (#0e1b35)
- **Foreground**: Light gray/white

#### Glassmorphism Design
- Semi-transparent backgrounds with backdrop blur
- Subtle borders and glowing effects
- Layered depth for premium feel

#### Animations
- Fade-in animations on scroll
- Staggered reveal animations
- Hover effects with smooth transitions
- Animated counters for statistics
- Scroll progress bar at top

### Key Components

1. **Navbar**: Fixed navigation with theme toggle
2. **Hero**: Full-screen hero section with profile image
3. **About**: Introduction with animated stats
4. **Skills**: Progress bars for skill levels
5. **Projects**: Filterable project showcase
6. **Experience**: Timeline for work/education
7. **Certifications**: Certificate cards
8. **GitHubStats**: Repository showcase
9. **Contact**: Contact form and social links
10. **Footer**: Navigation and social links
11. **ScrollProgress**: Top progress bar

### Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

### Performance Optimizations
- Image optimization with Next.js Image
- Code splitting and lazy loading
- CSS-in-JS with Tailwind for minimal CSS
- Efficient animations with GPU acceleration
- SEO metadata optimization

### SEO Features
- Comprehensive metadata
- Open Graph tags for social sharing
- Twitter Card support
- Structured data compatibility
- Sitemap ready

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast text
- Screen reader friendly

## File Structure

```
components/
  ├── navbar.tsx              # Navigation bar
  ├── hero.tsx                # Hero section
  ├── about.tsx               # About section
  ├── skills.tsx              # Skills showcase
  ├── projects.tsx            # Projects grid
  ├── experience.tsx          # Experience timeline
  ├── certifications.tsx      # Certifications cards
  ├── github-stats.tsx        # GitHub projects
  ├── contact.tsx             # Contact form
  ├── footer.tsx              # Footer
  ├── scroll-progress.tsx     # Scroll progress bar
  ├── animated-counter.tsx    # Counter animation
  ├── theme-provider.tsx      # Theme setup
  └── ui/                     # shadcn/ui components

app/
  ├── layout.tsx              # Root layout
  ├── page.tsx                # Home page
  ├── globals.css             # Global styles
  ├── projects/
  │   ├── layout.tsx          # Projects layout
  │   └── [id]/
  │       └── page.tsx        # Project detail page
  └── resume/
      └── page.tsx            # Resume page

public/
  ├── WhatsApp_Image...jpeg   # Profile image
  ├── Muhammad_Adnan_(CV).pdf # Resume PDF
  └── Data_Scientist.pdf      # Certification
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build
```bash
npm run build
npm run start
```

### Type Checking
```bash
npm run typecheck
```

## Customization

### Colors
Edit CSS variables in `app/globals.css`:
```css
:root {
  --primary: 220 90% 60%;
  --secondary: 280 85% 55%;
  --accent: 180 100% 50%;
}
```

### Content
Update component props and data in respective component files:
- Skills data in `components/skills.tsx`
- Projects data in `components/projects.tsx`
- Experience data in `components/experience.tsx`

### Fonts
Modify font imports in `app/layout.tsx`:
```typescript
import { Inter, Space_Mono } from 'next/font/google';
```

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics
- Lighthouse Score: 90+
- First Contentful Paint (FCP): <2s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1

## Future Enhancements
- Blog section with markdown support
- Project filtering with search
- Newsletter subscription
- Animation preferences (respects prefers-reduced-motion)
- Multi-language support
- Analytics integration

## License
© 2026 Muhammad Adnan. All rights reserved.

## Contact
- Email: adnank75586@gmail.com
- LinkedIn: [m-adnan-12a816402](https://www.linkedin.com/in/m-adnan-12a816402)
- GitHub: [MuhammadAdnan586](https://github.com/MuhammadAdnan586/Kingsman)
