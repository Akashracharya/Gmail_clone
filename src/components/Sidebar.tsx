"use client";
import { 
  Layers, Inbox, Tag, Users, Info, Star, Clock, 
  Bookmark, ShoppingBag, Send, CalendarClock, 
  Upload, FileText, Mail 
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMenu } from '@/context/MenuContext';

export default function Sidebar() {
  const searchParams = useSearchParams();
  const currentFolder = searchParams?.get('folder') || 'primary';
  const { isMenuOpen, closeMenu } = useMenu();

  return (
    <>
      {/* Dark Overlay for Mobile */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Drawer Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[85%] max-w-[340px] pr-0 flex flex-col bg-[#1E1F22] md:bg-[#131314]
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-72
        ${isMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        
        {/* Header (Gmail text) */}
        <div className="px-6 pt-5 pb-3 text-xl tracking-wide font-medium text-[#E3E3E3]">
          Gmail
        </div>

        {/* Top Full-Width Line */}
        <div className="h-px w-full bg-[#36383D]" />

        {/* Scrollable Navigation List - SCROLLBAR HIDDEN */}
        <nav className="flex-1 overflow-y-auto pb-6 pt-2 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <NavItem id="all" icon={Layers} label="All inboxes" currentFolder={currentFolder} />
          
          {/* Bottom Full-Width Line */}
          <div className="h-px w-full bg-[#36383D] my-2 block" />
          
          <NavItem 
            id="primary" 
            icon={Inbox} 
            label="Primary" 
            badge="99+" 
            currentFolder={currentFolder} 
          />

          {/* Color-coded Notification Pills */}
          <NavItem 
            id="promotions"
            icon={Tag} 
            label="Promotions" 
            badge="644 new" 
            badgeColor="bg-[#6DD58C] text-[#00381B]" 
            currentFolder={currentFolder}
          />
          <NavItem 
            id="social"
            icon={Users} 
            label="Social" 
            badge="157 new" 
            badgeColor="bg-[#A8C7FA] text-[#062E6F]" 
            currentFolder={currentFolder}
          />
          <NavItem 
            id="updates"
            icon={Info} 
            label="Updates" 
            badge="6 new" 
            badgeColor="bg-[#FFB477] text-[#452B00]" 
            currentFolder={currentFolder}
          />

          {/* Section Divider */}
          <div className="px-6 mt-5 mb-3 text-[13px] font-medium text-[#C4C7C5] tracking-wide">
            All labels
          </div>

          <NavItem id="starred" icon={Star} label="Starred" currentFolder={currentFolder} />
          <NavItem id="snoozed" icon={Clock} label="Snoozed" currentFolder={currentFolder} />
          <NavItem id="important" icon={Bookmark} label="Important" badge="114" currentFolder={currentFolder} />
          <NavItem id="purchases" icon={ShoppingBag} label="Purchases" badge="59" currentFolder={currentFolder} />
          <NavItem id="sent" icon={Send} label="Sent" currentFolder={currentFolder} />
          <NavItem id="scheduled" icon={CalendarClock} label="Scheduled" currentFolder={currentFolder} />
          <NavItem id="outbox" icon={Upload} label="Outbox" currentFolder={currentFolder} />
          <NavItem id="drafts" icon={FileText} label="Drafts" badge="23" currentFolder={currentFolder} />
          <NavItem id="all-mail" icon={Mail} label="All mail" badge="99+" currentFolder={currentFolder} />

        </nav>
      </aside>
    </>
  );
}

// Refactored NavItem: Now fully functional, dynamic, and wider!
function NavItem({ 
  id,
  icon: Icon, 
  label, 
  badge, 
  badgeColor = "text-[#C4C7C5]",
  currentFolder
}: { 
  id: string,
  icon: any, 
  label: string, 
  badge?: string, 
  badgeColor?: string,
  currentFolder: string
}) {
  const { closeMenu } = useMenu();
  const isPill = badgeColor.includes('bg-');
  const isActive = currentFolder === id;

  return (
    <Link href={`/?folder=${id}`} onClick={closeMenu} className="block mb-0.5">
      {/* mx-2 makes the pill wider, spanning closer to the edges */}
      <div className={`flex items-center justify-between mx-2 px-4 py-[14px] rounded-full cursor-pointer transition-colors ${
        isActive ? 'bg-[#3A4256]' : 'hover:bg-[#2D313A]'
      }`}>
        <div className="flex items-center gap-5">
          <Icon size={22} strokeWidth={2} className={isActive ? 'text-[#E3E3E3]' : 'text-[#C4C7C5]'} />
          <span className={`text-[15px] tracking-wide ${isActive ? 'font-medium text-[#E3E3E3]' : 'text-[#E3E3E3]'}`}>
            {label}
          </span>
        </div>
        {badge && (
          <span className={`text-xs tracking-wide ${isPill ? `${badgeColor} font-bold px-2.5 py-0.5 rounded-full` : `font-medium ${badgeColor}`}`}>
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}
