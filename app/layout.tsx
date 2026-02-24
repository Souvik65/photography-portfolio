import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Lens & Light | Professional Photography',
  description: 'Capturing Moments That Last Forever. Explore the portfolio, skills, and book a session.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans bg-stone-50 text-stone-900 antialiased" suppressHydrationWarning>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
