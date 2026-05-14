"use client";
import { useState, useEffect } from 'react';
import { X, MoreVertical, Share2, Download, Award, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CertificatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center">
        {/* OFFICIAL LOGO ADDED HERE */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#1172BA] border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#333333] font-sans overflow-y-auto pb-10">
      
      <div className="flex items-center justify-between px-4 py-3 bg-[#F1F3F4] border-b border-gray-300 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} className="text-[#3C4043]" />
          </button>
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-[#202124] leading-tight">Simplilearn | Online...</span>
            <span className="text-[12px] text-[#5F6368] flex items-center gap-1 leading-tight mt-0.5">
              <Lock size={10} /> simplilearn.com
            </span>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
          <MoreVertical size={24} className="text-[#3C4043]" />
        </button>
      </div>

      <header className="flex items-center justify-between px-5 py-4 bg-white shadow-sm sticky top-[53px] z-40">
        {/* OFFICIAL LOGO ADDED HERE */}
        <img src="https://www.simplilearn.com/ice9/new_logo.svgz" alt="Simplilearn" className="h-10" />
        <div className="w-8 h-8 rounded-full bg-[#188038] text-white flex items-center justify-center text-sm font-medium">
          A
        </div>
      </header>

      <main className="flex-1 px-5 py-8 flex flex-col items-center text-center max-w-2xl mx-auto w-full">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Award size={36} className="text-[#1172BA]" />
        </div>
        
        <h1 className="text-[24px] font-bold text-[#1D2228] mb-3 leading-tight">
          Congratulations, Akash!
        </h1>
        <p className="text-[15px] text-[#4B5563] mb-8 leading-relaxed px-2">
          You have successfully completed your <span className="font-semibold text-[#1D2228]">VLSI Course</span>. Here is your official verified certificate.
        </p>

        <div className="w-full bg-[#F8F9FA] p-2 rounded-xl border border-gray-200 shadow-sm mb-8 relative">
          <img
            src="/my-certificate.jpg"
            alt="VLSI Certificate"
            className="w-full h-auto rounded-lg block"
          />
        </div>

        <div className="flex flex-col w-full gap-3">
          <button className="w-full py-3.5 bg-[#1172BA] text-white font-semibold rounded-lg text-[15px] shadow-md hover:bg-[#0E5B96] transition-colors flex justify-center items-center gap-2">
            <Download size={20} /> Download Certificate
          </button>
          <button className="w-full py-3.5 bg-white border border-[#D1D5DB] text-[#374151] font-semibold rounded-lg text-[15px] hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
            <Share2 size={20} /> Share to LinkedIn
          </button>
        </div>
      </main>
      
    </div>
  );
}