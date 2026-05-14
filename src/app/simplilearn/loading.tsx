"use client";

export default function Loading() {
  return (
    // 'fixed inset-0 z-[200]' forces this to cover the entire screen, hiding the layout header
    <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center">
      <div className="text-[32px] font-bold text-[#1172BA] tracking-tight mb-6">
        simplilearn
      </div>
      
      {/* Authentic bouncing dot loader */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-[#1172BA] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-[#1172BA] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-[#1172BA] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}