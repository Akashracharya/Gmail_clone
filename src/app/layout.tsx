import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import { MailProvider } from '@/context/MailContext'
import { EmailProvider } from '@/context/EmailContext'
import { MenuProvider } from '@/context/MenuContext' 
import type { Metadata, Viewport } from "next";
import { Suspense } from 'react';

export const viewport: Viewport = {
  themeColor: "#131314",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Gmail",
  description: "Gmail",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} h-screen flex flex-col overflow-hidden pb-16 md:pb-0 bg-[#131314] text-gray-200`}>
        <MenuProvider> {/* 2. Wrap your app */}
          <EmailProvider>
            <MailProvider>
              <Suspense fallback={<header className="h-[68px] bg-[#131314] sticky top-0 z-30 flex items-center px-4"></header>}>
                <Header />
              </Suspense>
              <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />
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
  )
}