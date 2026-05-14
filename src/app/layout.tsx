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
  
  // Detect our current app context
  const isMailReadingPage = pathname.startsWith('/mail/');
  const isSimplilearnApp = pathname.startsWith('/simplilearn');

  return (
    // Switch completely out of dark mode when in the Simplilearn app
    <html lang="en" className={!isSimplilearnApp ? "dark" : ""}>
      <body className={`${inter.className} h-screen flex flex-col overflow-hidden ${!isSimplilearnApp ? 'pb-16 md:pb-0 bg-[#131314] text-[#E3E3E3]' : 'bg-[#F8F9FA] text-[#333333]'}`}>
        <MenuProvider>
          <EmailProvider>
            <MailProvider>
              
              {/* Hide top Header ONLY when reading mail OR inside Simplilearn */}
              {!isMailReadingPage && !isSimplilearnApp && (
                <Suspense fallback={<header className="h-[68px] bg-[#131314] sticky top-0 z-30 flex items-center px-4"></header>}>
                  <Header />
                </Suspense>
              )}
              
              <div className="flex flex-1 overflow-hidden relative">
                {/* Hide Sidebar ONLY when reading mail OR inside Simplilearn */}
                {!isMailReadingPage && !isSimplilearnApp && (
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
              
              {/* Hide the Gmail Bottom Nav completely when inside Simplilearn */}
              {!isSimplilearnApp && <MobileNav />}
              
            </MailProvider>
          </EmailProvider>
        </MenuProvider>
      </body>
    </html>
  );
}