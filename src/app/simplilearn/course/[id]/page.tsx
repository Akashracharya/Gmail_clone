"use client";
import { useState } from 'react';
import { PlayCircle, CheckCircle2, ChevronDown, ChevronUp, Lock, FileText, Download, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 1. TYPESCRIPT INTERFACES 
interface Lesson {
  title: string;
  duration: string;
  type: string;
  completed: boolean;
  active?: boolean; 
}

interface CourseModule {
  id: number;
  title: string;
  completed: boolean;
  locked?: boolean;
  lessons: Lesson[];
}

// 2. MOCK DATA
const courseModules: CourseModule[] = [
  {
    id: 1,
    title: "Module 1: Introduction to VLSI",
    completed: true,
    lessons: [
      { title: "What is VLSI Design?", duration: "12:45", type: "video", completed: true },
      { title: "History and Evolution", duration: "15:20", type: "video", completed: true },
    ]
  },
  {
    id: 2,
    title: "Module 2: Digital Logic Circuits",
    completed: true,
    lessons: [
      { title: "Combinational Logic", duration: "22:10", type: "video", completed: true },
      { title: "Sequential Logic", duration: "18:30", type: "video", completed: true },
      { title: "Module 2 Assessment", duration: "30 mins", type: "quiz", completed: true },
    ]
  },
  {
    id: 3,
    title: "Module 3: Physical Design Flow",
    completed: false,
    lessons: [
      { title: "Physical Design Overview", duration: "14:15", type: "video", completed: false, active: true },
      { title: "Floorplanning and Placement", duration: "25:00", type: "video", completed: false },
      { title: "Clock Tree Synthesis (CTS)", duration: "20:45", type: "video", completed: false },
    ]
  },
  {
    id: 4,
    title: "Module 4: Advanced Architecture",
    completed: false,
    locked: true,
    lessons: [
      { title: "System on Chip (SoC)", duration: "18:00", type: "video", completed: false },
    ]
  }
];

export default function CoursePlayerPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState<number[]>([3]); 
  
  // State to manage the video click
  const [videoState, setVideoState] = useState<'idle' | 'loading'>('idle');

  const toggleModule = (id: number) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handlePlayVideo = () => {
    if (videoState === 'idle') {
      setVideoState('loading');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col lg:flex-row gap-6 p-4 md:p-8">
      
      {/* LEFT COLUMN: Video Player & Course Info */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Breadcrumb */}
        <div className="text-xs font-medium text-gray-500 mb-3 flex gap-2">
          <span className="cursor-pointer hover:text-[#1172BA]" onClick={() => router.push('/simplilearn')}>Dashboard</span> 
          <span>/</span> 
          <span>Advanced VLSI Design</span>
        </div>

        {/* --- INTERACTIVE VIDEO PLAYER --- */}
        <div 
          onClick={handlePlayVideo}
          className="w-full aspect-video bg-black rounded-xl overflow-hidden relative shadow-lg flex items-center justify-center group cursor-pointer"
        >
          {/* Custom Thumbnail */}
          <img 
            src="/thumbnail.jpg" 
            alt="Course Thumbnail" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://www.transparenttextures.com/patterns/cubes.png';
            }}
          />

          {/* Pure SVG Play Button */}
          {videoState === 'idle' && (
            <div className="relative z-10 w-20 h-20 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-[#1172BA] group-hover:border-[#1172BA] group-hover:scale-110 transition-all duration-300 shadow-2xl">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                <path d="M5 3L19 12L5 21V3Z" fill="white"/>
              </svg>
            </div>
          )}

          {/* The Loading Spinner */}
          {videoState === 'loading' && (
            <div className="relative z-10 w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin shadow-lg"></div>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-[#1D2228] mt-5 mb-2">Physical Design Overview</h1>
        
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 mt-4">
          {['overview', 'q&a', 'notes', 'downloads'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition-colors relative ${
                activeTab === tab ? 'text-[#1172BA]' : 'text-gray-500 hover:text-[#1D2228]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1172BA] rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-6 text-gray-600 text-sm leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p>In this lesson, we will cover the foundational concepts of the Physical Design flow in VLSI. You will learn about the translation of a logical synthesis netlist into a manufacturable layout.</p>
              <h3 className="font-bold text-[#1D2228] mt-4">Key Learning Objectives:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Understand the transition from RTL to GDSII.</li>
                <li>Identify the key stages: Floorplanning, Placement, CTS, and Routing.</li>
                <li>Recognize the importance of timing constraints in physical layout.</li>
              </ul>
            </div>
          )}
          {activeTab === 'downloads' && (
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="text-[#1172BA]" size={24} />
                <div>
                  <div className="font-bold text-[#1D2228]">Lesson Slides (PDF)</div>
                  <div className="text-xs text-gray-500">2.4 MB</div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-full text-[#1172BA] transition-colors">
                <Download size={20} />
              </button>
            </div>
          )}
          {activeTab === 'q&a' && (
            <div className="text-center py-8">
              <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
              <div className="font-bold text-[#1D2228] mb-1">Have a question?</div>
              <p className="text-gray-500 mb-4">Ask the instructor or discuss with peers.</p>
              <button className="px-4 py-2 bg-[#1172BA] text-white rounded font-medium hover:bg-[#0E5B96] transition-colors">
                Ask a Question
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Course Curriculum Sidebar */}
      <div className="w-full lg:w-[380px] shrink-0 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-fit md:sticky md:top-20">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold text-[#1D2228]">Course Content</h2>
          <span className="text-xs font-bold bg-green-100 text-[#188038] px-2 py-1 rounded">92%</span>
        </div>

        <div className="overflow-y-auto max-h-[600px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {courseModules.map((module) => (
            <div key={module.id} className="border-b border-gray-100 last:border-0">
              {/* Module Header */}
              <div 
                onClick={() => !module.locked && toggleModule(module.id)}
                className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${module.locked ? 'bg-gray-50/50 opacity-60' : 'hover:bg-gray-50'}`}
              >
                <div className="flex flex-col min-w-0 pr-4">
                  <span className={`text-sm font-bold truncate ${module.locked ? 'text-gray-400' : 'text-[#1D2228]'}`}>
                    {module.title}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    0 / {module.lessons.length} completed
                  </span>
                </div>
                {module.locked ? (
                  <Lock size={18} className="text-gray-400 shrink-0" />
                ) : (
                  expandedModules.includes(module.id) ? 
                    <ChevronUp size={20} className="text-gray-500 shrink-0" /> : 
                    <ChevronDown size={20} className="text-gray-500 shrink-0" />
                )}
              </div>

              {/* Module Lessons */}
              {expandedModules.includes(module.id) && !module.locked && (
                <div className="bg-gray-50/50 pb-2">
                  {module.lessons.map((lesson, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start gap-3 py-3 pl-4 pr-4 cursor-pointer transition-colors ${lesson.active ? 'bg-blue-50 border-l-4 border-[#1172BA] pl-3' : 'hover:bg-gray-100 border-l-4 border-transparent'}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {lesson.completed ? (
                          <CheckCircle2 size={18} className="text-[#188038]" />
                        ) : (
                          <div className={`w-[18px] h-[18px] rounded-full border-2 ${lesson.active ? 'border-[#1172BA]' : 'border-gray-300'}`}></div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`text-sm font-medium leading-tight ${lesson.active ? 'text-[#1172BA]' : 'text-gray-700'}`}>
                          {lesson.title}
                        </span>
                        <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          {lesson.type === 'video' ? <PlayCircle size={12} className="text-gray-400" /> : <FileText size={12} className="text-gray-400" />} 
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}