"use client";
import { ArrowLeft, Archive, Trash2, MailOpen, Clock, MoreVertical, Reply, Forward, Lock, Star, Sparkles, Smile, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEmails } from '@/context/EmailContext';
import { useEffect, use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable generic profile avatar to match Google's default perfectly
const GenericAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-[#5F6368] flex items-center justify-center shrink-0 overflow-hidden relative">
    <div className="w-[15px] h-[15px] bg-[#E3E3E3] rounded-full absolute top-[8px]"></div>
    <div className="w-[30px] h-[30px] bg-[#E3E3E3] rounded-full absolute top-[26px]"></div>
  </div>
);

export default function ReadMail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { emails, deleteEmail, archiveEmail, markAsRead, toggleReadStatus } = useEmails();

  const email = emails.find(e => e.id === resolvedParams.id);

  // States for interactive elements
  const [showDetails, setShowDetails] = useState(true);
  const [showQuoted, setShowQuoted] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false); // NEW: Security Popup State

  useEffect(() => {
    if (email && !email.isRead) {
      markAsRead(email.id);
    }
  }, [email, markAsRead]);

  const handleDelete = () => { if (email) { deleteEmail(email.id); router.push('/'); } };
  const handleArchive = () => { if (email) { archiveEmail(email.id); router.push('/'); } };
  const handleToggleRead = () => { if (email) { toggleReadStatus(email.id); router.push('/'); } };

  // Handler: Toggles the quote and ensures details tab closes
  const handleToggleQuotedText = () => {
    if (!showQuoted) {
      setShowQuoted(true);
      setShowDetails(false); // Hide the From/To/Date tab when showing the quote
    } else {
      setShowQuoted(false);
    }
  };

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#131314] text-gray-500">
        <p className="mb-4">Message has been deleted or archived.</p>
        <button onClick={() => router.push('/')} className="text-[#A8C7FA] hover:underline font-normal">
          Return to Inbox
        </button>
      </div>
    );
  }

  // Exact Details matching your Simplilearn screenshot
  const isSimplilearnMock = email.id === 'simplilearn_1';
  let parsedFrom = `${email.sender} • ${email.senderEmail || 'no-reply@simplilearn.training'}`;
  let parsedTo = 'akaashracharya@gmail.com';
  let parsedDate = `Apr 27, 2026, 9:43 AM`;

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#131314] text-[#E3E3E3] font-sans">

      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-2 py-2 sticky top-0 bg-[#131314] z-20">
        <div className="flex items-center text-[#C4C7C5]">
          <button onClick={() => router.push('/')} className="p-3 hover:bg-[#282a2d] rounded-full transition-colors"><ArrowLeft size={24} strokeWidth={2} /></button>
        </div>
        <div className="flex items-center gap-0.5 text-[#C4C7C5]">
          <button className="p-3 hover:bg-[#282a2d] rounded-full">
            <img
              src="/gemini.svg"
              alt="My Custom Logo"
              className="w-[25px] h-[25px] object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </button>
          <button onClick={handleArchive} className="p-3 hover:bg-[#282a2d] rounded-full"><Download size={22} strokeWidth={2} className="transform rotate-180" /></button>
          <button onClick={handleDelete} className="p-3 hover:bg-[#282a2d] rounded-full"><Trash2 size={22} strokeWidth={2} /></button>
          <button onClick={handleToggleRead} className="p-3 hover:bg-[#282a2d] rounded-full"><MailOpen size={22} strokeWidth={2} /></button>
          <button className="p-3 hover:bg-[#282a2d] rounded-full"><MoreVertical size={22} strokeWidth={2} /></button>
        </div>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {/* Subject Header & Star */}
        <div className="flex items-start justify-between mb-5">
          <h1 className="text-[22px] font-normal text-[#E3E3E3] leading-[1.3] mr-4 tracking-wide font-sans">
            {email.subject}
            <span className="inline-flex items-center bg-[#3F4A6B] text-[#A8C7FA] text-[11px] font-medium px-1.5 py-0.5 rounded ml-2 align-middle transform -translate-y-[2px]">Inbox</span>
          </h1>
          <button className="p-2 -mt-2 -mr-2 hover:bg-[#282a2d] rounded-full text-[#C4C7C5] shrink-0">
            <Star size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Threaded Cards Container */}
        <div className="flex flex-col gap-[2px]">

          {/* Collapsed Snippet Card (Top) */}
          {isSimplilearnMock && (
            <div className="bg-[#1E1F22] rounded-t-2xl rounded-b-[4px] p-4 flex items-start gap-3 cursor-pointer hover:bg-[#25262A] transition-colors">
              <GenericAvatar />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-[#E3E3E3] text-[15px]">{email.sender}</span>
                  <span className="text-[12px] text-[#C4C7C5]">Apr 27</span>
                </div>
                <div className="text-[14px] text-[#C4C7C5] leading-[1.4] font-normal">
                  Hi Akash Acharya,Congrats! You have<br />successfully completed your VLSI Course
                </div>
              </div>
            </div>
          )}

          {/* Expanded Main Email Card (Bottom) */}
          <div className={`bg-[#1E1F22] p-4 pb-6 ${isSimplilearnMock ? 'rounded-t-[4px] rounded-b-2xl' : 'rounded-2xl'}`}>

            {/* Header Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <GenericAvatar />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-[#E3E3E3] text-[15px]">{email.sender}</span>
                    <span className="text-[12px] text-[#C4C7C5] ml-1">5 days ago</span>
                  </div>

                  {/* FUNCTIONAL TOGGLE: "to me ^" */}
                  <div
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center gap-1 text-[13px] text-[#C4C7C5] cursor-pointer w-fit hover:text-[#E3E3E3] transition-colors select-none font-normal"
                  >
                    to me
                    {showDetails ? <ChevronUp size={14} strokeWidth={2} /> : <ChevronDown size={14} strokeWidth={2} />}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-[#C4C7C5] gap-1">
                <button className="p-2 hover:bg-[#2D2F33] rounded-full transition-colors"><Smile size={20} strokeWidth={2} /></button>
                <button className="p-2 hover:bg-[#2D2F33] rounded-full transition-colors"><Reply size={20} strokeWidth={2} className="transform -scale-x-100" /></button>
                <button className="p-2 hover:bg-[#2D2F33] rounded-full transition-colors"><MoreVertical size={20} strokeWidth={2} /></button>
              </div>
            </div>

            {/* ANIMATED DETAILS DROPDOWN BOX */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#282A2D] rounded-[12px] p-[16px]">
                    <div className="grid grid-cols-[55px_1fr] gap-y-3 text-[14px] font-normal">
                      <div className="text-[#C4C7C5]">From</div>
                      <div className="text-[#E3E3E3]">{parsedFrom}</div>

                      <div className="text-[#C4C7C5]">To</div>
                      <div className="text-[#E3E3E3]">{parsedTo}</div>

                      <div className="text-[#C4C7C5]">Date</div>
                      <div className="text-[#E3E3E3]">{parsedDate}</div>

                      <div className="flex items-start pt-[2px] text-[#C4C7C5]">
                        <Lock size={16} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-[#E3E3E3]">Standard encryption (TLS).</div>
                        <div
                          onClick={() => setShowSecurityModal(true)}
                          className="text-[#A8C7FA] mt-0.5 cursor-pointer hover:underline inline-block"
                        >
                          View security details
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Body & Quoted Text Toggle */}
            <div className={`text-[#E3E3E3] text-[15px] leading-relaxed whitespace-pre-wrap font-sans font-normal ml-1 ${showDetails ? 'mt-8' : 'mt-4'}`}>

              {/* Dynamic Toggle Text */}
              <div
                onClick={handleToggleQuotedText}
                className="mt-8 mb-2 text-[#A8C7FA] text-[14px] font-normal cursor-pointer hover:underline inline-block"
              >
                {showQuoted ? "Hide quoted text" : "Show quoted text"}
              </div>

              {/* Animated Image Reveal */}
              <AnimatePresence>
                {showQuoted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#36383D] rounded-lg overflow-hidden bg-[#1E1F22] mt-4"
                  >
                    <img
                      src="/simplilearn.jpg"
                      alt="Simplilearn Certificate Details"
                      className="w-full h-auto object-contain block"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>

      {/* Fixed Bottom Action Pills */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#131314] px-4 py-4 flex items-center gap-3 z-[100]">
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#C3D2F7] rounded-full text-[#041E49] font-medium text-[14px] transition-colors active:bg-[#a8bcf0]">
          <Reply size={20} strokeWidth={1.5} className="transform -scale-x-100" /> Reply
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#C3D2F7] rounded-full text-[#041E49] font-medium text-[14px] transition-colors active:bg-[#a8bcf0]">
          <Forward size={20} strokeWidth={1.5} /> Forward
        </button>
        <button className="flex shrink-0 items-center justify-center p-3.5 bg-[#C3D2F7] rounded-full text-[#041E49] transition-colors active:bg-[#a8bcf0]">
          <Smile size={17} strokeWidth={1.5} />
        </button>
      </div>

      {/* NEW: Exact Android Security Popup Modal */}
      <AnimatePresence>
        {showSecurityModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
            {/* Dark Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowSecurityModal(false)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-[#282A2D] w-full max-w-[340px] rounded-[28px] p-6 relative z-10 shadow-2xl"
            >
              <h2 className="text-[22px] font-normal text-[#E3E3E3] mb-5 tracking-wide">Security details</h2>

              <div className="flex flex-col gap-[6px] text-[15px] font-normal text-[#E3E3E3] leading-[1.4]">
                <div>Mailed by: mailer.simplilearn.training</div>
                <div>Signed by: simplilearn.training</div>
                <div>
                  Security: <Lock size={14} className="inline -mt-0.5 mx-0.5 text-[#E3E3E3]" strokeWidth={2} /> Standard encryption <br />
                  (TLS). <span className="text-[#A8C7FA] cursor-pointer hover:underline">Learn more</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}