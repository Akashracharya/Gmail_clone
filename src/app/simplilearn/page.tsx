"use client";
import { PlayCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SimplilearnDashboard() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Welcome Section */}
      <section>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1D2228] mb-2">Welcome back, Akash!</h1>
        <p className="text-gray-600 text-sm md:text-base">Pick up right where you left off and achieve your learning goals.</p>
      </section>

      {/* Active Course Card (Continue Learning) */}
      <section>
        <h2 className="text-lg font-bold text-[#1D2228] mb-4">Continue Learning</h2>
        {/* ADDED onClick router push here 👇 */}
        <div 
          onClick={() => router.push('/simplilearn/course/vlsi-101')}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="w-full md:w-[280px] h-[160px] bg-slate-800 relative flex-shrink-0">
            {/* Placeholder for course thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <PlayCircle size={48} className="text-white" />
            </div>
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
            
            {/* Progress Bar */}
            <div className="mt-auto">
              <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
                <span>75% Completed</span>
                <span>12 hrs left</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#188038] w-[75%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Certificates Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1D2228]">Recent Certificates</h2>
          <button className="text-[#1172BA] text-sm font-semibold hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Certificate Card 1 */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#188038]">
                <CheckCircle2 size={24} />
              </div>
              <span className="text-xs text-gray-500 font-medium">Mar 26, 2026</span>
            </div>
            <h3 className="font-bold text-[#1D2228] mb-1 leading-tight">VLSI Course Completion</h3>
            <p className="text-xs text-gray-500 mb-4">Simplilearn SkillUp</p>
            {/* ADDED onClick router push here 👇 */}
            <button 
              onClick={() => router.push('/simplilearn/certificate')}
              className="w-full py-2 border border-[#1172BA] text-[#1172BA] rounded text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              View Certificate
            </button>
          </div>
          
          {/* Certificate Card 2 (Placeholder) */}
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