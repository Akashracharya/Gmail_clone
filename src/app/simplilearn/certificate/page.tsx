"use client";
import { Download, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CertificatePage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      
      {/* Back Navigation */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-gray-600 hover:text-[#1172BA] transition-colors font-medium text-sm mb-2 w-fit px-1"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      {/* Header Actions Card */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1D2228] mb-2">Your Certificate</h1>
          <p className="text-gray-600 text-sm md:text-base flex items-center gap-2">
            <CheckCircle size={18} className="text-[#188038]" /> 
            Successfully completed on March 26, 2026
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1172BA] text-white font-semibold rounded-lg text-sm shadow-sm hover:bg-[#0E5B96] transition-colors">
            <Download size={18} /> Download PDF
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border border-[#0A66C2] text-[#0A66C2] font-semibold rounded-lg text-sm hover:bg-blue-50 transition-colors">
            <ExternalLink size={18} /> Add to Profile
          </button>
        </div>
      </div>

      {/* Main Certificate Display */}
      {/* The background pattern gives it a subtle premium document feel */}
      <div className="bg-white p-4 md:p-8 rounded-xl border border-gray-200 shadow-sm flex justify-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
        <div className="relative max-w-full shadow-xl border border-gray-100 rounded-sm overflow-hidden">
          <img 
            src="/simplilearn.jpg" 
            alt="VLSI Course Certificate" 
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* Certificate Metadata Details */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#1D2228] border-b border-gray-100 pb-3">Credential Details</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
          <div>
            <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Recipient</div>
            <div className="font-semibold text-[#1D2228] text-sm">Akash Acharya</div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Course</div>
            <div className="font-semibold text-[#1D2228] text-sm">Advanced VLSI Design</div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Issue Date</div>
            <div className="font-semibold text-[#1D2228] text-sm">March 26, 2026</div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Credential ID</div>
            <div className="font-semibold text-[#1D2228] text-sm font-mono bg-gray-100 px-2 py-0.5 rounded w-fit">SL-VLSI-9824-XT</div>
          </div>
        </div>
      </div>

    </div>
  );
}