"use client";
import { useState } from 'react';
import { X, Minus, Maximize2, Paperclip, Image as ImageIcon, Link2, Smile, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmails } from '@/context/EmailContext';

interface ComposeModalProps { isOpen: boolean; onClose: () => void; }

export default function ComposeModal({ isOpen, onClose }: ComposeModalProps) {
  const { sendEmail } = useEmails();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => { sendEmail(to, subject, body); setTo(''); setSubject(''); setBody(''); onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 right-0 md:right-24 w-full md:w-[500px] h-[600px] md:h-[500px] bg-[#1e1e1e] md:rounded-t-xl shadow-2xl flex flex-col z-50 border border-[#444746] overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[#282a2c] cursor-pointer">
            <span className="text-sm font-medium text-gray-200">New Message</span>
            <div className="flex items-center gap-2 text-gray-400">
              <button className="p-1 hover:bg-[#444746] rounded-sm transition"><Minus size={16} /></button>
              <button className="p-1 hover:bg-[#444746] rounded-sm transition hidden md:block"><Maximize2 size={16} /></button>
              <button onClick={onClose} className="p-1 hover:bg-[#444746] rounded-sm transition"><X size={16} /></button>
            </div>
          </div>
          <div className="flex flex-col flex-1 px-4 py-2">
            <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} className="w-full py-2 border-b border-[#444746] bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500" />
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full py-2 border-b border-[#444746] bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full flex-1 py-4 bg-transparent outline-none text-sm text-gray-200 resize-none" placeholder="Write something..." />
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#444746] bg-[#1e1e1e]">
            <div className="flex items-center gap-4">
              <button onClick={handleSend} className="bg-[#a8c7fa] hover:bg-[#8ab4f8] text-[#062e6f] px-6 py-2 rounded-full text-sm font-medium transition-colors">Send</button>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:bg-[#282a2c] p-1.5 rounded-full transition"><Paperclip size={18} /></button>
                <button className="hover:bg-[#282a2c] p-1.5 rounded-full transition"><Link2 size={18} /></button>
                <button className="hover:bg-[#282a2c] p-1.5 rounded-full transition"><Smile size={18} /></button>
                <button className="hover:bg-[#282a2c] p-1.5 rounded-full transition"><ImageIcon size={18} /></button>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:bg-[#282a2c] p-2 rounded-full transition"><Trash2 size={18} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}