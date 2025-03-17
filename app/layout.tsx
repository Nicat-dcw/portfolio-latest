import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./components/theme-provider";
import { I18nProvider } from "./components/i18n-provider";
import { Suspense } from "react";
import { LoadingFallback } from "./components/LoadingFallback";
import "./globals.css";
import { LanguageProvider } from "./components/language-provider";
import Navbar from "./components/Navbar";
import { Providers } from "./providers";
import { Analytics } from "./components/Analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from 'next/headers';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nicat-dcw",
  description: "Full Stack Developer from Azerbaijan",
  
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  icons: {
    icon: 'https://avatars.githubusercontent.com/u/59221034?s=400&u=467d7330f5108f682fb7aae7c846f4722dc76050&v=4',
    apple: 'https://avatars.githubusercontent.com/u/59221034?s=400&u=467d7330f5108f682fb7aae7c846f4722dc76050&v=4',
  },
  openGraph: {
    title: 'Nicat-dcw',
    description: 'Full Stack Developer from Azerbaijan',
    url: 'https://nicatdcw.dev',
    siteName: 'Nicat-dcw',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/59221034?s=400&u=467d7330f5108f682fb7aae7c846f4722dc76050&v=4',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicat-dcw',
    description: 'Full Stack Developer from Azerbaijan',
    images: ['https://avatars.githubusercontent.com/u/59221034?s=400&u=467d7330f5108f682fb7aae7c846f4722dc76050&v=4'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const cookies = headersList.get('cookie');
  const lang = cookies?.includes('language=') 
    ? cookies.split('language=')[1].split(';')[0]
    : 'en';

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Background pattern for entire site */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        {/* Gradient orbs */}
        <div className="fixed -z-10 h-[300px] w-[300px] left-1/4 top-1/4 rounded-full bg-violet-500/10 blur-[100px] md:h-[500px] md:w-[500px]"></div>
        <div className="fixed -z-10 h-[300px] w-[300px] right-1/4 bottom-1/4 rounded-full bg-blue-500/10 blur-[100px] md:h-[500px] md:w-[500px]"></div>
        
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="max-w-7xl mx-auto px-4 min-h-screen dark:bg-transparent transition-colors">
              <Navbar />
              <Suspense fallback={<LoadingFallback />}>
                {children}
              </Suspense>
            </div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
