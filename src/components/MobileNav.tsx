"use client";
import { Mail, Video } from 'lucide-react';
import Link from 'next/link';

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#131314] flex justify-center gap-16 items-center h-16 z-40 pb-safe">
      
      {/* Mail Tab (Active) */}
      <Link href="/" className="flex flex-col items-center justify-center relative">
        <div className="bg-[#3f4a6b] px-6 py-1.5 rounded-full">
          <Mail size={22} className="text-[#c2e7ff] fill-current" />
        </div>
        
        {/* Notification Badge */}
        <div className="absolute top-0 right-1 translate-x-1/4 -translate-y-1/4 bg-[#f28b82] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#131314]">
          99+
        </div>
      </Link>
      
      {/* Meet Tab (Inactive) */}
      <div className="flex flex-col items-center justify-center cursor-not-allowed">
        <div className="px-6 py-1.5 rounded-full transition">
          <Video size={24} className="text-gray-400" />
        </div>
      </div>

    </div>
  );
}