"use client";
import { Search, Bell, Menu, BookOpen, Award, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SimplilearnLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#333333] font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-md">
            <Menu size={24} className="text-gray-700" />
          </button>
          <div className="text-[22px] font-bold text-[#1172BA] tracking-tight cursor-pointer">
            simplilearn
          </div>
        </div>

        <div className="hidden md:flex items-center bg-[#F1F3F4] px-4 py-2 rounded-md w-[400px]">
          <Search size={18} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="What do you want to learn?" 
            className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#188038] text-white flex items-center justify-center text-sm font-medium cursor-pointer">
            A
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Navigation (Hidden on mobile by default) */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col py-6">
          <nav className="flex-1 px-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-[#E8F0FE] text-[#1172BA] rounded-md font-medium text-sm">
              <BookOpen size={18} /> My Courses
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md font-medium text-sm transition-colors">
              <Award size={18} /> Certificates
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md font-medium text-sm transition-colors">
              <User size={18} /> Profile
            </a>
          </nav>
          <div className="px-4 mt-auto">
            <button 
              onClick={() => router.push('/')} // Return to Gmail
              className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 w-full rounded-md font-medium text-sm transition-colors"
            >
              <LogOut size={18} /> Exit to Mail
            </button>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}