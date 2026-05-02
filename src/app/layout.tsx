import './globals.css';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { MailProvider } from '@/context/MailContext';
import { EmailProvider } from '@/context/EmailContext';
import { MenuProvider } from '@/context/MenuContext';
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#131314',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Gmail Clone',
  description: 'A pixel-perfect Gmail UI Clone',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} h-screen flex flex-col overflow-hidden pb-16 md:pb-0 bg-[#131314] text-[#E3E3E3]`}>
        <MenuProvider>
          <EmailProvider>
            <MailProvider>
              
              {/* Suspense boundary fixes the Vercel useSearchParams prerender error */}
              <Suspense fallback={<header className="h-[68px] bg-[#131314] sticky top-0 z-30 flex items-center px-4"></header>}>
                <Header />
              </Suspense>
              
              <div className="flex flex-1 overflow-hidden relative">
                <Suspense fallback={<aside className="w-72 hidden md:block" />}>
                <Sidebar />
                </Suspense>
                <main className="flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {children}
                  </div>
                </main>
              </div>
              
              <MobileNav />
              
            </MailProvider>
          </EmailProvider>
        </MenuProvider>
      </body>
    </html>
  );
}