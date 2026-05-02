"use client";
import { X, ChevronUp, Plus, Cloud, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Quick icon for the "Manage accounts on this device"
const ManageAccountsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E3E3E3]">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M19 8v6"></path>
        <path d="M22 11h-6"></path>
    </svg>
);

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex flex-col bg-[#131314] text-[#E3E3E3] font-sans overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col w-full min-h-full px-4 pb-8"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pt-4 pb-6">
                            <div className="w-6"></div> {/* Spacer for centering */}
                            <div className="text-[15px] font-medium tracking-wide">akashblazecc@gmail.com</div>
                            <button onClick={onClose} className="p-1 hover:bg-[#282A2D] rounded-full transition-colors">
                                <X size={24} className="text-[#C4C7C5]" />
                            </button>
                        </div>

                        {/* Main Profile Info */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative mb-4">
                                <div className="w-[84px] h-[84px] rounded-full bg-[#188038] flex items-center justify-center text-white text-[40px] font-normal">
                                    A
                                </div>
                                <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#1E1F22] rounded-full flex items-center justify-center border-2 border-[#131314]">
                                    <Camera size={14} className="text-[#E3E3E3]" />
                                </div>
                            </div>
                            <h1 className="text-[22px] font-normal mb-4">Hi, Akash Blaze!</h1>
                            <button className="px-5 py-2 rounded-full border border-[#747775] text-[#A8C7FA] text-[14px] font-medium hover:bg-[#282A2D] transition-colors">
                                Manage your Google Account
                            </button>
                        </div>

                        {/* Accounts Card */}
                        <div className="bg-[#1E1F22] rounded-[24px] p-2 mb-4">
                            {/* Switch Account Header */}
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-[15px] font-medium text-[#E3E3E3]">Switch account</span>
                                <button className="p-1 bg-[#36383D] rounded-full">
                                    <ChevronUp size={20} className="text-[#E3E3E3]" />
                                </button>
                            </div>
                            <div className="h-[1px] bg-[#444746]"></div>

                            {/* Account 1: Akash */}
                            <div className="flex items-center justify-between px-4 py-3 hover:bg-[#282A2D] rounded-[16px] cursor-pointer transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 pb-0.5 rounded-full bg-[#b129cc] font-medium text-white flex items-center justify-center text-[20px] shrink-0">
                                        A   
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-medium text-[#E3E3E3]">Akash</div>
                                        <div className="text-[13px] text-[#C4C7C5]">akaashracharya@gmail.com</div>
                                    </div>
                                </div>
                                <div className="text-[13px] text-[#C4C7C5] mr-1">46</div>
                            </div>
                            <div className="h-[1px] bg-[#444746]"></div>

                            {/* Account 2: Sniprr */}
                            <div className="flex items-center justify-between px-4 py-3 hover:bg-[#282A2D] rounded-[16px] cursor-pointer transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 pb-0.5 rounded-full bg-[#00ACC1] font-medium text-white flex items-center justify-center text-[20px] shrink-0">
                                        S   
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-medium text-[#E3E3E3]">Sniprr</div>
                                        <div className="text-[13px] text-[#C4C7C5]">sniprredit@gmail.com</div>
                                    </div>
                                </div>
                                <div className="text-[13px] text-[#C4C7C5] mr-1">46</div>
                            </div>
                            <div className="h-[1px] bg-[#444746]"></div>
                            {/* Account 3: Zobot */}
                            <div className="flex items-center justify-between px-4 py-3 hover:bg-[#282A2D] rounded-[16px] cursor-pointer transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 pb-0.5 rounded-full bg-[#ce2525] text-white flex items-center justify-center font-medium text-[20px] shrink-0">
                                        Z
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-medium text-[#E3E3E3]">Zobot</div>
                                        <div className="text-[13px] text-[#C4C7C5]">zobotsite@gmail.com</div>
                                    </div>
                                </div>
                                <div className="text-[13px] text-[#C4C7C5] mr-1">15</div>
                            </div>

                            <div className="h-[1px] bg-[#444746]"></div>

                            {/* Add Account */}
                            <div className="flex items-center gap-4 px-4 py-3 hover:bg-[#282A2D] rounded-[16px] cursor-pointer transition-colors">
                                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                    <Plus size={24} className="text-[#A8C7FA]" />
                                </div>
                                <div className="text-[15px] font-medium text-[#E3E3E3]">Add another account</div>
                            </div>

                            {/* Manage Accounts */}
                            <div className="flex items-center gap-4 px-4 py-3 hover:bg-[#282A2D] rounded-[16px] cursor-pointer transition-colors">
                                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                    <ManageAccountsIcon />
                                </div>
                                <div className="text-[15px] font-medium text-[#E3E3E3]">Manage accounts on this device</div>
                            </div>
                        </div>

                        {/* Storage Card */}
                        <div className="bg-[#1E1F22] rounded-[24px] p-5 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Cloud size={24} className="text-[#A8C7FA] fill-transparent" />
                                <span className="text-[15px] font-medium text-[#E3E3E3]">1% of 15 GB used</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-[#444746] rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-[#A8C7FA] w-[1%] rounded-full"></div>
                            </div>

                            <div className="text-[13px] text-[#C4C7C5] mb-5">
                                242.52 MB of 15 GB
                            </div>

                            <div className="flex items-center gap-6 text-[14px] font-medium text-[#A8C7FA] justify-end">
                                <button className="hover:text-[#D3E3FD]">Get storage</button>
                                <button className="hover:text-[#D3E3FD]">Clean up space</button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto flex justify-center gap-4 text-[12px] text-[#C4C7C5]">
                            <span className="cursor-pointer hover:underline">Privacy Policy</span>
                            <span>•</span>
                            <span className="cursor-pointer hover:underline">Terms of Service</span>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}