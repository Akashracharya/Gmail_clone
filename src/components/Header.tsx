"use client";
import { Menu, Search, Sparkles } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useMenu } from '@/context/MenuContext'; // 1. Import the hook

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const { openMenu } = useMenu(); // 2. Get the open function

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <header className="flex items-center gap-3 px-4 py-3 bg-[#131314] text-gray-200 sticky top-0 z-30">
      {/* 3. Add onClick={openMenu} here 👇 */}
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
          <Sparkles size={24} className="text-gray-400 ml-2" />
        </div>
      </form>

      {/* User Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 via-purple-500 to-blue-500 p-[2px] cursor-pointer shrink-0">
        <div className="w-full h-full bg-black rounded-full overflow-hidden border border-gray-800">
           <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url(https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png)'}}></div>
        </div>
      </div>
    </header>
  );
}