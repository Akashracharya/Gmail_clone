import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import { MailProvider } from '@/context/MailContext'
import { EmailProvider } from '@/context/EmailContext'
import { MenuProvider } from '@/context/MenuContext' // 1. Import it

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gmail Clone - Dark',
  description: 'Next.js M3 Gmail Clone',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} h-screen flex flex-col overflow-hidden pb-16 md:pb-0 bg-[#131314] text-gray-200`}>
        <MenuProvider> {/* 2. Wrap your app */}
          <EmailProvider>
            <MailProvider>
              <Header />
              <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />
                <main className="flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto">
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