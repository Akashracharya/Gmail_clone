"use client";
import { Star, Info, Tag, Pen, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useEmails, Email } from '@/context/EmailContext';

export default function MobileHome({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const router = useRouter();
  const resolvedParams = use(searchParams);
  const searchQuery = resolvedParams.q?.toLowerCase() || '';
  
  const { emails } = useEmails();
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);

  useEffect(() => {
    // Only show primary inbox emails, filtered by search query
    const filtered = emails.filter((email) => {
      const matchesFolder = email.folder === 'primary';
      const matchesSearch = searchQuery === '' || 
        email.subject.toLowerCase().includes(searchQuery) ||
        email.sender.toLowerCase().includes(searchQuery) ||
        email.snippet.toLowerCase().includes(searchQuery);
      return matchesFolder && matchesSearch;
    });
    setFilteredEmails(filtered);
  }, [searchQuery, emails]);

  return (
    <div className="flex flex-col min-h-screen bg-[#131314] text-gray-200 pb-24 relative">
      
      {!searchQuery && (
        <>
          <div className="px-4 pt-4 pb-2 text-sm font-medium text-gray-300">
            Primary
          </div>

          <div className="mx-2 mb-2 bg-[#1e1f22] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Tag className="text-emerald-400" size={24} />
              <div>
                <h3 className="font-semibold text-gray-100 text-base">Promotions</h3>
                <p className="text-sm text-gray-400 truncate w-48">IBM SkillsBuild — 22 Million L...</p>
              </div>
            </div>
            <div className="bg-[#81c995] text-[#00381B] text-xs font-bold px-2.5 py-1 rounded-full">
              99+ new
            </div>
          </div>
        </>
      )}

      {/* Email List */}
      <div className="flex flex-col mt-2">
        {filteredEmails.map((email) => (
          <div 
            key={email.id} 
            onClick={() => router.push(`/mail/${email.id}`)}
            className="flex items-start gap-4 px-4 py-3 active:bg-[#282a2d] transition-colors cursor-pointer"
          >
            {/* Real Avatar Extracted from your Context */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl text-white font-medium shrink-0 mt-1 ${email.avatarColor}`}>
              {email.sender.charAt(0).toUpperCase()}
            </div>

            {/* Content Stack */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex justify-between items-center mb-0.5">
                <span className={`truncate text-base ${!email.isRead ? 'font-bold text-[#E3E3E3]' : 'text-[#C4C7C5]'}`}>
                  {email.sender}
                </span>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className={`text-xs ${!email.isRead ? 'font-bold text-[#A8C7FA]' : 'text-[#C4C7C5]'}`}>
                    {email.timestamp}
                  </span>
                  {!email.isRead && <div className="w-[9px] h-[9px] rounded-full bg-[#A8C7FA] mt-[1px]" />}
                </div>
              </div>
              <span className={`truncate text-[15px] leading-tight ${!email.isRead ? 'font-bold text-[#E3E3E3]' : 'text-[#C4C7C5]'}`}>
                {email.subject}
              </span>
              <span className="truncate text-[14px] text-[#8E918F] mt-0.5">
                {email.snippet}
              </span>

              {/* PDF Attachment Pill (Matches Swiggy/Instamart) */}
              {email.attachment && (
                <div className="flex items-center gap-2 mt-2 w-fit border border-[#444746] rounded-full px-3 py-1 bg-[#1A1C1E]">
                  <div className="bg-[#B3261E] text-white text-[8px] font-bold px-1 rounded-sm">PDF</div>
                  <span className="text-xs text-[#E3E3E3] truncate max-w-[120px]">{email.attachment}</span>
                </div>
              )}
            </div>

            {/* Star Icon */}
            <div className="shrink-0 mt-6 ml-2">
              <Star size={22} strokeWidth={1.5} className="text-[#C4C7C5]" />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-20 right-4 bg-[#D3E3FD] hover:bg-[#b0ccf8] text-[#041E49] rounded-2xl px-5 py-4 flex items-center gap-3 shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition-transform active:scale-95 z-40">
        <Pen size={20} strokeWidth={2} className="fill-current" />
        <span className="font-medium text-sm tracking-wide">Compose</span>
      </button>

    </div>
  );
}