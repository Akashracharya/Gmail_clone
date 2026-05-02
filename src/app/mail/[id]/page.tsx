"use client";
import { ArrowLeft, Archive, Trash2, MailOpen, Clock, MoreVertical, Reply, Forward, Printer, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEmails } from '@/context/EmailContext';
import { useEffect, use } from 'react'; // Added 'use' here

// 1. Update the type to Promise<{ id: string }>
export default function ReadMail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // 2. Unwrap the params promise
  const resolvedParams = use(params);
  
  const { emails, deleteEmail, archiveEmail, markAsRead, toggleReadStatus } = useEmails();
  
  // 3. Use the unwrapped id
  const email = emails.find(e => e.id === resolvedParams.id);

  useEffect(() => {
    if (email && !email.isRead) {
      markAsRead(email.id);
    }
  }, [email, markAsRead]);

  const handleDelete = () => { if (email) { deleteEmail(email.id); router.push('/'); } };
  const handleArchive = () => { if (email) { archiveEmail(email.id); router.push('/'); } };
  const handleToggleRead = () => { if (email) { toggleReadStatus(email.id); router.push('/'); } };

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p className="mb-4">Message has been deleted or archived.</p>
        <button onClick={() => router.push('/')} className="text-[#a8c7fa] hover:underline">
          Return to Inbox
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#121212] text-gray-200">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#444746] sticky top-0 bg-[#121212] z-10 rounded-t-2xl">
        <div className="flex items-center gap-4 text-gray-400">
          <button onClick={() => router.push('/')} className="p-2 -ml-2 hover:bg-[#282a2d] rounded-full transition-colors"><ArrowLeft size={24} /></button>
          <button onClick={handleArchive} className="p-2 hover:bg-[#282a2d] rounded-full hidden md:block"><Archive size={20} /></button>
          <button onClick={handleDelete} className="p-2 hover:bg-[#282a2d] rounded-full hidden md:block"><Trash2 size={20} /></button>
          <button onClick={handleToggleRead} className="p-2 hover:bg-[#282a2d] rounded-full hidden md:block"><MailOpen size={20} /></button>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <h1 className="text-2xl font-normal text-gray-100 mb-6">{email.subject}</h1>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-xl shrink-0">
              {email.sender.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-200 text-base">{email.sender}</span>
                <span className="text-xs text-gray-400 hidden md:inline">&lt;sender@example.com&gt;</span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">to me</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="whitespace-nowrap">{email.timestamp}</span>
            <button className="p-2 hover:bg-[#282a2d] rounded-full"><MoreVertical size={20} /></button>
          </div>
        </div>

        <div className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {email.snippet}
        </div>
      </div>
    </div>
  );
}