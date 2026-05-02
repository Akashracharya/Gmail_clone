"use client";
import { ArrowLeft, Archive, Trash2, MailOpen, Clock, MoreVertical, Reply, Forward, Printer, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEmails } from '@/context/EmailContext';
import { useEffect } from 'react';

export default function ReadMail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { emails, deleteEmail, archiveEmail, markAsRead, toggleReadStatus } = useEmails();
  const email = emails.find(e => e.id === params.id);

  useEffect(() => { if (email && !email.isRead) markAsRead(email.id); }, [email, markAsRead]);

  if (!email) return <div className="flex flex-col items-center justify-center h-full text-gray-500"><p className="mb-4">Message has been deleted or archived.</p><button onClick={() => router.push('/')} className="text-[#a8c7fa] hover:underline">Return to Inbox</button></div>;

  return (
    <div className="flex flex-col h-full bg-[#121212] text-gray-200">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#444746] sticky top-0 bg-[#121212] z-10 rounded-t-2xl">
        <div className="flex items-center gap-4 text-gray-400">
          <button onClick={() => router.push('/')} className="p-2 hover:bg-[#282a2c] rounded-full transition-colors"><ArrowLeft size={20} /></button>
          <button onClick={() => { archiveEmail(email.id); router.push('/'); }} className="p-2 hover:bg-[#282a2c] rounded-full hidden md:block"><Archive size={20} /></button>
          <button onClick={() => { deleteEmail(email.id); router.push('/'); }} className="p-2 hover:bg-[#282a2c] rounded-full hidden md:block"><Trash2 size={20} /></button>
          <button onClick={() => { toggleReadStatus(email.id); router.push('/'); }} className="p-2 hover:bg-[#282a2c] rounded-full hidden md:block"><MailOpen size={20} /></button>
          <button className="p-2 hover:bg-[#282a2c] rounded-full hidden md:block"><Clock size={20} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-normal text-gray-100">{email.subject}</h1>
          <div className="flex items-center gap-2 text-gray-400 hidden md:flex">
            <button className="p-2 hover:bg-[#282a2c] rounded-full"><Printer size={20} /></button>
            <button className="p-2 hover:bg-[#282a2c] rounded-full"><ExternalLink size={20} /></button>
          </div>
        </div>

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#004a77] flex items-center justify-center text-[#c2e7ff] font-medium text-lg shrink-0">
              {email.sender.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-200">{email.sender}</span>
                <span className="text-xs text-gray-400 hidden md:inline">&lt;sender@example.com&gt;</span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">to me</div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-400">
            <span className="whitespace-nowrap">{email.timestamp}</span>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-[#282a2c] rounded-full"><Reply size={20} /></button>
              <button className="p-2 hover:bg-[#282a2c] rounded-full"><MoreVertical size={20} /></button>
            </div>
          </div>
        </div>

        <div className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap pl-1 md:pl-13">
          {email.snippet}
          <br /><br />
          This is a simulated email body. You can test the global state by clicking Archive or Delete at the top, or going back to the Inbox to see this email marked as read!
          <br /><br />
          Best regards,<br />
          {email.sender}
        </div>

        <div className="flex gap-4 mt-12 pl-1 md:pl-13 pb-20 md:pb-0">
          <button className="flex items-center gap-2 px-6 py-2 border border-[#444746] rounded-full hover:bg-[#282a2c] text-gray-300 font-medium text-sm transition-colors">
            <Reply size={16} /> Reply
          </button>
          <button className="flex items-center gap-2 px-6 py-2 border border-[#444746] rounded-full hover:bg-[#282a2c] text-gray-300 font-medium text-sm transition-colors">
            <Forward size={16} /> Forward
          </button>
        </div>
      </div>
    </div>
  );
}