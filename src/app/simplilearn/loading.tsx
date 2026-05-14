"use client";

export default function Loading() {
  return (
    // The "animate-pulse" class makes everything inside gently fade in and out
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-8 w-full animate-pulse">
      
      {/* Welcome Skeleton */}
      <section>
        <div className="h-8 bg-gray-200 rounded-md w-64 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-96 max-w-full"></div>
      </section>

      {/* Active Course Card Skeleton */}
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

      {/* Completed Certificates Section Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-4 mt-8">
          <div className="h-6 bg-gray-200 rounded-md w-48"></div>
          <div className="h-4 bg-gray-200 rounded-md w-16"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Create 3 dummy skeleton cards */}
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
}