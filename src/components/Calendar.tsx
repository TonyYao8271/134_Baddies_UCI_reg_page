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

// Simple color mapping for courses
const COURSE_COLORS: Record<string, string> = {
  ICS: 'bg-blue-100 text-blue-700 border-blue-200',
  MATH: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  ECON: 'bg-amber-100 text-amber-700 border-amber-200',
  WRITING: 'bg-purple-100 text-purple-700 border-purple-200',
  'BIO SCI': 'bg-rose-100 text-rose-700 border-rose-200',
  COMPSCI: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  DEFAULT: 'bg-slate-100 text-slate-700 border-slate-200'
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
    <div id="calendar-container" className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[64px_1fr] border-bottom border-gray-100 bg-gray-50/50">
        <div className="h-10 border-r border-gray-100"></div>
        <div className="grid grid-cols-5 divide-x divide-gray-100">
          {DAYS.map(day => (
            <div key={day} className="flex items-center justify-center text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Grid body */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden min-h-0 custom-scrollbar">
        <div className="grid grid-cols-[64px_1fr] min-h-[832px]"> {/* 13 hours * 64px */}
          {/* Time markings column */}
          <div className="relative border-r border-gray-100 bg-gray-50/30">
            {HOURS.map(hour => (
              <div key={hour} className="h-16 flex items-start justify-center pt-2">
                <span className="text-[10px] font-medium text-gray-400 tabular-nums">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {/* Grid lines and Items Area */}
          <div className="relative">
            {/* Horizontal lines */}
            {HOURS.map(hour => (
              <div key={hour} className="h-16 border-b border-gray-100" />
            ))}

            {/* Vertical lines */}
            <div className="absolute inset-0 grid grid-cols-5 divide-x divide-gray-100 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-full" />
              ))}
            </div>

            {/* Course blocks */}
            <div className="absolute inset-0">
               <div className="grid grid-cols-5 h-full relative">
                  <AnimatePresence>
                    {scheduledItems.map((item) => {
                      const dayIndex = DAYS.indexOf(item.day);
                      const colorClass = COURSE_COLORS[item.course.dept] || COURSE_COLORS.DEFAULT;
                      const top = timeToPosition(item.start);
                      const height = durationToHeight(item.start, item.end);

                      return (
                        <motion.div
                          key={item.itemKey}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className={`absolute left-0 right-0 m-1 rounded-lg border p-2 overflow-hidden shadow-sm transition-colors border-l-4 ${item.isConflicting ? 'border-l-red-500 bg-red-50 text-red-700' : colorClass}`}
                          style={{
                            gridColumnStart: dayIndex + 1,
                            top: `${top}px`,
                            height: `${height}px`,
                            zIndex: item.isConflicting ? 20 : 10
                          }}
                        >
                          <div className="flex flex-col h-full">
                            <span className="text-[10px] font-bold leading-tight truncate">
                              {item.course.dept} {item.course.number}
                            </span>
                            <span className="text-[9px] font-medium opacity-80 truncate">
                              {item.course.title}
                            </span>
                            {height > 40 && (
                              <span className="mt-auto text-[8px] font-semibold tabular-nums opacity-70">
                                {item.start} - {item.end}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
