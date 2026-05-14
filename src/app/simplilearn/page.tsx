"use client";
import { useState, useEffect } from 'react';
import { PlayCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DashboardSkeleton = () => (
  <div className="max-w-5xl mx-auto space-y-8 w-full animate-pulse px-4 py-6 md:p-8">
    <section>
      <div className="h-8 bg-gray-200 rounded-md w-64 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-96 max-w-full"></div>
    </section>
    <section>
      <div className="h-6 bg-gray-200 rounded-md w-48 mb-4"></div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row h-[160px]">
        <div className="w-full md:w-[280px] h-full bg-gray-200 flex-shrink-0"></div>
        <div className="p-5 flex flex-col justify-center flex-1 w-full gap-3">
          <div className="h-3 bg-gray-200 rounded w-32"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="mt-auto h-2 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </section>
    <section>
      <div className="flex items-center justify-between mb-4 mt-8">
        <div className="h-6 bg-gray-200 rounded-md w-48"></div>
        <div className="h-4 bg-gray-200 rounded-md w-16"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-[140px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-3 bg-gray-200 rounded-md"></div>
            </div>
            <div className="h-5 bg-gray-200 rounded-md w-3/4 mt-4"></div>
            <div className="h-8 bg-gray-200 rounded-md w-full mt-auto"></div>
          </div>
        ))}
      </div>
    </section>
  </div>
);


export default function SimplilearnDashboard() {
  const router = useRouter();
  const [loadPhase, setLoadPhase] = useState<'spinner' | 'skeleton' | 'content'>('spinner');

  useEffect(() => {
    const spinnerTimer = setTimeout(() => {
      setLoadPhase('skeleton');
    }, 2000);

    const contentTimer = setTimeout(() => {
      setLoadPhase('content');
    }, 4500);

    return () => {
      clearTimeout(spinnerTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  if (loadPhase === 'spinner') {
    return (
      <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#1172BA] border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (loadPhase === 'skeleton') {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6 md:p-8">
      <section>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1D2228] mb-2">Welcome back, Akash!</h1>
        <p className="text-gray-600 text-sm md:text-base">Pick up right where you left off and achieve your learning goals.</p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#1D2228] mb-4">Continue Learning</h2>
        <div 
          onClick={() => router.push('/simplilearn/course/vlsi-101')}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="w-full md:w-[280px] h-[160px] bg-slate-800 relative flex-shrink-0 overflow-hidden">
            
            {/* Thumbnail */}
            <img 
              src="/thumbnail.jpg" 
              alt="Course Thumbnail" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />

          
            
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Module 4
            </div>
          </div>
          
          <div className="p-5 flex flex-col justify-center flex-1 w-full">
            <div className="text-xs font-semibold text-[#1172BA] uppercase tracking-wider mb-2">Post Graduate Program</div>
            <h3 className="text-xl font-bold text-[#1D2228] mb-2">Advanced VLSI Design & Architecture</h3>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <Clock size={16} /> Next up: Physical Design Flow Overview
            </p>
            
            <div className="mt-auto">
              <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
                <span>93% Completed</span>
                <span>12 hrs left</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#188038] w-[93%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1D2228]">Recent Certificates</h2>
          <button className="text-[#1172BA] text-sm font-semibold hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#188038]">
                <CheckCircle2 size={24} />
              </div>
              <span className="text-xs text-gray-500 font-medium">Mar 26, 2026</span>
            </div>
            <h3 className="font-bold text-[#1D2228] mb-1 leading-tight">VLSI Course Completion</h3>
            <p className="text-xs text-gray-500 mb-4">Simplilearn SkillUp</p>
            <button 
              onClick={() => router.push('/simplilearn/certificate')}
              className="w-full py-2 border border-[#1172BA] text-[#1172BA] rounded text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              View Certificate
            </button>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm opacity-60">
            <div className="flex items-center justify-center h-full min-h-[120px] text-gray-400 text-sm font-medium">
              Complete more courses to unlock
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}