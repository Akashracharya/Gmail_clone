"use client";
import './globals.css';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { MailProvider } from '@/context/MailContext';
import { EmailProvider } from '@/context/EmailContext';
import { MenuProvider } from '@/context/MenuContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Detect if we are reading any email
  const isMailReadingPage = pathname.startsWith('/mail/');

  return (
    <html lang="en" className="dark">
      {/* 1. We keep pb-16 ALWAYS on mobile to reserve space for the bottom nav */}
      <body className={`${inter.className} h-screen flex flex-col overflow-hidden pb-16 md:pb-0 bg-[#131314] text-[#E3E3E3]`}>
        <MenuProvider>
          <EmailProvider>
            <MailProvider>
              
              {/* 2. Hide top Header ONLY when reading mail */}
              {!isMailReadingPage && (
                <Suspense fallback={<header className="h-[68px] bg-[#131314] sticky top-0 z-30 flex items-center px-4"></header>}>
                  <Header />
                </Suspense>
              )}
              
              <div className="flex flex-1 overflow-hidden relative">
                {/* 3. Hide Sidebar ONLY when reading mail */}
                {!isMailReadingPage && (
                  <Suspense fallback={<aside className="w-72 hidden md:block" />}>
                    <Sidebar />
                  </Suspense>
                )}
                
                <main className="flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {children}
                  </div>
                </main>
              </div>
              
              {/* 4. Bottom Nav is now OUTSIDE any conditional checks so it shows on every page */}
              <MobileNav />
              
            </MailProvider>
          </EmailProvider>
        </MenuProvider>
      </body>
    </html>
  );
}