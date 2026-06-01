import React, { useMemo } from 'react';
import { Course, TimeSlot } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CalendarProps {
  selectedCourses: Course[];
  conflicts: Set<string>; // Set of course IDs that have conflicts
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

const timeToPosition = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  const totalMin = (h - 8) * 60 + m;
  const hourHeight = 64; // px per hour
  return (totalMin / 60) * hourHeight;
};

const durationToHeight = (start: string, end: string) => {
  const [h1, m1] = start.split(':').map(Number);
  const [h2, m2] = end.split(':').map(Number);
  const diffMin = (h2 * 60 + m2) - (h1 * 60 + m1);
  const hourHeight = 64;
  return (diffMin / 60) * hourHeight;
};

// Simple color mapping for courses themed in UCI Blues and Gold/Yellows
const COURSE_COLORS: Record<string, string> = {
  ICS: 'bg-blue-50 text-blue-900 border-blue-200/80',
  MATH: 'bg-amber-50 text-amber-900 border-amber-200/80',
  ECON: 'bg-yellow-50 text-yellow-900 border-yellow-200/80',
  WRITING: 'bg-sky-50 text-sky-900 border-sky-200/80',
  'BIO SCI': 'bg-cyan-50 text-cyan-900 border-cyan-200/80',
  COMPSCI: 'bg-indigo-50 text-indigo-900 border-indigo-200/80',
  DEFAULT: 'bg-slate-50 text-slate-800 border-slate-200/80'
};

export const Calendar: React.FC<CalendarProps> = ({ selectedCourses, conflicts }) => {
  const scheduledItems = useMemo(() => {
    return selectedCourses.flatMap(course => 
      course.schedule.map((slot, idx) => ({
        ...slot,
        course,
        itemKey: `${course.id}-${idx}`,
        isConflicting: conflicts.has(course.id)
      }))
    );
  }, [selectedCourses, conflicts]);

  return (
    <div id="calendar-container" className="flex flex-col h-full bg-white rounded-2xl shadow-md border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[64px_1fr] border-b-2 border-gray-200 bg-gray-50 pr-[6px]">
        <div className="h-10 border-r-2 border-gray-200"></div>
        <div className="grid grid-cols-5 divide-x-2 divide-gray-200">
          {DAYS.map(day => (
            <div key={day} className="flex items-center justify-center text-xs font-black text-gray-500 uppercase tracking-widest h-10">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Grid body */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden min-h-0 custom-scrollbar">
        <div className="grid grid-cols-[64px_1fr] min-h-[832px]"> {/* 13 hours * 64px */}
          {/* Time markings column */}
          <div className="relative border-r-2 border-gray-200 bg-gray-50/50">
            {HOURS.map(hour => (
              <div key={hour} className="h-16 flex items-start justify-center pt-2">
                <span className="text-[10px] font-bold text-gray-400 tabular-nums">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {/* Grid lines and Items Area */}
          <div className="relative">
            {/* Horizontal lines */}
            {HOURS.map(hour => (
              <div key={hour} className="h-16 border-b border-gray-150" />
            ))}

            {/* Vertical lines */}
            <div className="absolute inset-0 grid grid-cols-5 divide-x-2 divide-gray-200 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-full" />
              ))}
            </div>

            {/* Course blocks */}
            <div className="absolute inset-0">
               <div className="grid grid-cols-5 h-full relative">
                 {DAYS.map((day) => {
                   const itemsForDay = scheduledItems.filter(item => item.day === day);
                   return (
                     <div key={day} className="relative h-full w-full">
                       <AnimatePresence>
                         {itemsForDay.map((item) => {
                           const colorClass = COURSE_COLORS[item.course.dept] || COURSE_COLORS.DEFAULT;
                           const top = timeToPosition(item.start);
                           const height = durationToHeight(item.start, item.end);

                           return (
                             <motion.div
                               key={item.itemKey}
                               initial={{ opacity: 0, scale: 0.95 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.9 }}
                               className={`absolute left-0 right-0 m-1 rounded-lg border-2 p-2 overflow-hidden shadow-sm transition-colors border-l-4 ${item.isConflicting ? 'border-l-red-600 bg-red-100/70 text-red-950 border-red-300' : 'border-l-[#0064A4] ' + colorClass}`}
                               style={{
                                 top: `${top}px`,
                                 height: `${height}px`,
                                 zIndex: item.isConflicting ? 20 : 10
                                }}
                             >
                               <div className="flex flex-col h-full justify-between">
                                 <div>
                                   <span className="text-[10px] font-black leading-tight block truncate uppercase">
                                     {item.course.dept} {item.course.number}
                                   </span>
                                   <span className="text-[9px] font-bold opacity-90 block truncate leading-tight mt-0.5">
                                     {item.course.title}
                                   </span>
                                 </div>
                                 {height > 40 && (
                                   <span className="text-[8px] font-black font-mono tracking-wider tabular-nums opacity-80 uppercase">
                                     {item.start} - {item.end}
                                   </span>
                                 )}
                               </div>
                             </motion.div>
                           );
                         })}
                       </AnimatePresence>
                     </div>
                   );
                 })}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
