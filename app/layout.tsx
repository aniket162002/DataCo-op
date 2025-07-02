import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DataCo-Op | Secure Data Marketplace',
  description: 'Safely share anonymized personal data bundles and earn revenue while maintaining complete privacy and control.',
  keywords: ['data marketplace', 'privacy', 'anonymization', 'data monetization', 'secure data sharing'],
  authors: [{ name: 'DataCo-Op Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4ade80' },
    { media: '(prefers-color-scheme: dark)', color: '#4ade80' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-inter antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}