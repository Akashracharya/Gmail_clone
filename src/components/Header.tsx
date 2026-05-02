"use client";
import { Menu, Search, Sparkles } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useMenu } from '@/context/MenuContext';
import ProfileModal from '@/components/ProfileModal';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { openMenu } = useMenu();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <>
      <header className="flex items-center gap-3 px-4 py-3 bg-[#131314] text-gray-200 sticky top-0 z-30">
        <button onClick={openMenu} className="p-2 -ml-2 text-gray-300 hover:bg-[#282a2d] rounded-full transition-colors md:hidden">
          <Menu size={24} />
        </button>

        {/* Search Pill */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="flex items-center bg-[#282a2d] px-4 py-3 rounded-full focus-within:bg-[#303236] transition-colors h-14">
            <button type="submit" className="hidden md:block">
              <Search size={20} className="text-gray-400 mr-3" />
            </button>
            <input
              type="text"
              placeholder="Search in mail"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-gray-200 placeholder-gray-400 text-base"
            />
            <img
              src="/gemini.svg"
              alt="Custom Search Logo"
              className="w-7 h-7 object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </form>

        {/* User Avatar (Clean Green 'A') */}
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="w-10 h-10 rounded-full bg-[#188038] text-white flex items-center justify-center text-[17px] font-normal shrink-0 ml-1"
        >
          A
        </button>
      </header>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}