import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Muhammad Adnan - Data Scientist & ML Engineer',
  description: 'Data Scientist | Machine Learning Engineer | Data Analyst. Building intelligent solutions through Data Science, Machine Learning, and AI.',
  keywords: 'Data Science, Machine Learning, Deep Learning, AI, Analytics, Python, TensorFlow',
  authors: [{ name: 'Muhammad Adnan' }],
  creator: 'Muhammad Adnan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muhammadadnan.dev',
    siteName: 'Muhammad Adnan Portfolio',
    title: 'Muhammad Adnan - Data Scientist & ML Engineer',
    description: 'Data Scientist | Machine Learning Engineer | Data Analyst. Building intelligent solutions through Data Science, Machine Learning, and AI.',
    images: [
      {
        url: '/WhatsApp_Image_2026-06-06_at_9.22.34_AM.jpeg',
        width: 1200,
        height: 630,
        alt: 'Muhammad Adnan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Adnan - Data Scientist & ML Engineer',
    description: 'Data Scientist | Machine Learning Engineer | Data Analyst. Building intelligent solutions through Data Science, Machine Learning, and AI.',
    images: ['/WhatsApp_Image_2026-06-06_at_9.22.34_AM.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
