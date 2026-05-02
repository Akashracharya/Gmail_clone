"use client";
import { Inbox, Send, AlertOctagon, Edit3, Star, Clock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMail } from '@/context/MailContext';
import { useMenu } from '@/context/MenuContext'; // Import menu context

export default function Sidebar() {
  const searchParams = useSearchParams();
  const currentFolder = searchParams?.get('folder') || 'inbox';
  const { openCompose } = useMail();
  const { isMenuOpen, closeMenu } = useMenu(); // Get menu state

  const navItems = [
    { name: 'Inbox', icon: Inbox, id: 'inbox' },
    { name: 'Starred', icon: Star, id: 'starred' },
    { name: 'Snoozed', icon: Clock, id: 'snoozed' },
    { name: 'Sent', icon: Send, id: 'sent' },
    { name: 'Spam', icon: AlertOctagon, id: 'spam' },
  ];

  return (
    <>
      {/* Mobile Dark Overlay (closes menu when clicked) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar / Mobile Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 pr-4 flex flex-col py-2 bg-[#1e1f22] md:bg-[#131314]
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Mobile Header Inside Drawer */}
        <div className="px-6 py-4 md:hidden border-b border-[#444746] mb-2 text-xl font-medium text-gray-200">
          Gmail
        </div>

        {/* Compose Button (Desktop only, mobile uses the floating button) */}
        <button 
          onClick={openCompose}
          className="hidden md:flex items-center gap-4 bg-[#c2e7ff] hover:bg-[#b0dcf8] text-[#001d35] px-6 py-4 rounded-2xl ml-2 mb-4 w-fit shadow-sm transition-all"
        >
          <Edit3 size={20} />
          <span className="font-medium text-sm">Compose</span>
        </button>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto mt-2 md:mt-0">
          {navItems.map((item) => {
            const isActive = currentFolder === item.id;
            return (
              <Link key={item.id} href={`/?folder=${item.id}`} onClick={closeMenu}>
                <div className={`flex items-center gap-4 px-6 py-3 md:py-2 rounded-r-full cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-[#3f4a6b] text-[#c2e7ff] font-semibold' 
                    : 'text-gray-300 hover:bg-[#282a2d] font-medium'
                }`}>
                  <item.icon size={22} className={isActive ? 'text-[#c2e7ff]' : 'text-gray-400'} />
                  <span className="text-base md:text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}