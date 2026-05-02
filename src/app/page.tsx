"use client";
import { Star, Info, Tag, Pen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

// Mock Data
type Email = {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  timestamp: string;
  isRead: boolean;
  avatarColor: string;
};

const mockEmails: Email[] = [
  { id: '1', sender: 'cbsalerts.sbi', subject: 'CBSSBI ALERT', snippet: 'भारतीय स्टेट बैंक की ओर से शुभकामनाएं! Gre...', timestamp: '3:55 AM', isRead: false, avatarColor: 'bg-yellow-500' },
  { id: '2', sender: 'Dr.Shreenath Acharya ICB (...', subject: 'New announcement: "Dear Student...', snippet: 'Notification settings VI Sem ICB - Clo...', timestamp: 'May 1', isRead: false, avatarColor: 'bg-emerald-500' },
  { id: '3', sender: 'Dr.Shreenath Acharya ICB (...', subject: 'New announcement: "Students who...', snippet: 'Notification settings VI Sem ICB - Clo...', timestamp: 'May 1', isRead: false, avatarColor: 'bg-emerald-500' },
  { id: '4', sender: 'KuCoin', subject: 'Coupon Pack received', snippet: 'Coupon Pack received! Dear KuCoin U...', timestamp: 'Apr 30', isRead: false, avatarColor: 'bg-red-400' }
];

export default function MobileHome({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const router = useRouter();
  const resolvedParams = use(searchParams);
  
  return (
    <div className="flex flex-col min-h-screen bg-[#131314] text-gray-200 pb-24 relative">
      
      {/* Primary Section Header */}
      <div className="px-4 pt-4 pb-2 text-sm font-medium text-gray-300">
        Primary
      </div>

      {/* Updates Card */}
      <div className="mx-2 mb-2 bg-[#1e1f22] rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Info className="text-orange-300" size={24} />
            <div>
              <h3 className="font-semibold text-gray-100 text-base">Updates</h3>
              <p className="text-sm text-gray-400 truncate w-48">Oracle Training and Certificatio...</p>
            </div>
          </div>
          <div className="bg-[#ffb067] text-black text-xs font-bold px-3 py-1 rounded-full">
            6 new
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-snug mt-2">
          Now, Gmail puts messages that may not need your immediate attention in Updates. You can change this any time in settings.
        </p>
        <div className="flex items-center gap-6 mt-1">
          <button className="text-[#a8c7fa] font-medium text-sm">Got it</button>
          <button className="text-[#a8c7fa] font-medium text-sm">Learn more</button>
        </div>
      </div>

      {/* Promotions Card */}
      <div className="mx-2 mb-2 bg-[#1e1f22] rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Tag className="text-emerald-400" size={24} />
          <div>
            <h3 className="font-semibold text-gray-100 text-base">Promotions</h3>
            <p className="text-sm text-gray-400 truncate w-48">IBM SkillsBuild — 22 Million L...</p>
          </div>
        </div>
        <div className="bg-[#81c995] text-black text-xs font-bold px-2 py-1 rounded-full">
          99+ new
        </div>
      </div>

      {/* Email List */}
      <div className="flex flex-col mt-2">
        {mockEmails.map((email) => (
          <div 
            key={email.id} 
            onClick={() => router.push(`/mail/${email.id}`)}
            className="flex items-start gap-4 px-4 py-3 active:bg-[#282a2d] transition-colors cursor-pointer"
          >
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl text-black font-medium shrink-0 mt-1 ${email.avatarColor}`}>
              {email.sender.charAt(0)}
            </div>

            {/* Content Stack */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex justify-between items-center mb-0.5">
                <span className={`truncate text-base ${!email.isRead ? 'font-bold text-gray-100' : 'text-gray-300'}`}>
                  {email.sender}
                </span>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className={`text-xs ${!email.isRead ? 'font-bold text-gray-100' : 'text-gray-400'}`}>
                    {email.timestamp}
                  </span>
                  {!email.isRead && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                </div>
              </div>
              <span className={`truncate text-sm ${!email.isRead ? 'font-bold text-gray-100' : 'text-gray-300'}`}>
                {email.subject}
              </span>
              <span className="truncate text-sm text-gray-400">
                {email.snippet}
              </span>
            </div>

            {/* Star Icon */}
            <div className="shrink-0 mt-5 ml-2">
              <Star size={22} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-20 right-4 bg-[#b2c5ff] hover:bg-[#a0b6ff] text-[#0a2769] rounded-2xl px-5 py-4 flex items-center gap-3 shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition-transform active:scale-95 z-40">
        <Pen size={20} className="fill-current" />
        <span className="font-medium text-sm">Compose</span>
      </button>

    </div>
  );
}