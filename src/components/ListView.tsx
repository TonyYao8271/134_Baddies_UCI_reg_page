import React from 'react';
import { Course } from '../types';
import { Trash2, FileText, User, MapPin, Award, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ListViewProps {
  selectedCourses: Course[];
  onRemoveCourse: (id: string) => void;
}

export const ListView: React.FC<ListViewProps> = ({ selectedCourses, onRemoveCourse }) => {
  const totalUnits = selectedCourses.reduce((sum, c) => sum + c.units, 0);

  return (
    <div className="h-full flex flex-col bg-white rounded-none shadow-md border-2 border-gray-200 overflow-hidden">
      {/* Header stats bar */}
      <div className="p-6 bg-gray-50 border-b-2 border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-[#0064A4] uppercase tracking-wider">Your Student Plan</h3>
          <p className="text-xs text-gray-500 font-bold mt-1">Review your assembled courses before submitting to Registrar</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-white px-4 py-2 rounded-none border-2 border-gray-200 flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Courses</span>
            <span className="text-sm font-black text-gray-900">{selectedCourses.length}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-none border-2 border-[#0064A4] flex flex-col bg-blue-50/20">
            <span className="text-[10px] font-black text-[#0064A4] uppercase tracking-wider">Total Units</span>
            <span className="text-sm font-black text-[#0064A4]">{totalUnits}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {selectedCourses.map((course) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              key={course.id}
              className="bg-white border-2 border-gray-200 rounded-none p-5 hover:border-[#0064A4] hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-black text-[#0064A4] uppercase tracking-wide">
                    {course.dept} {course.number}
                  </span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-[10px] font-black text-gray-650 uppercase bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-none tracking-wider">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-[11px] font-bold text-gray-600 bg-gray-50 border border-gray-150 px-2 py-0.5 rounded-none">
                    {course.units} Units
                  </span>
                </div>

                <h4 className="text-sm font-black text-gray-900 truncate">
                  {course.title}
                </h4>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-500 font-medium pt-1">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    {course.instructor}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {course.location}
                  </span>
                </div>
              </div>

              {/* Schedules & Action button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 justify-between sm:justify-end">
                <div className="bg-gray-50 px-3 py-2.5 rounded-none border-2 border-dashed border-gray-250 space-y-1 min-w-[140px]">
                  <span className="text-[9px] uppercase font-black text-gray-400 tracking-wider block">Timetable</span>
                  {course.schedule.map((slot, i) => (
                    <div key={i} className="text-[10px] text-gray-600 font-bold flex justify-between gap-3 font-mono">
                      <span>{slot.day}</span>
                      <span className="tabular-nums text-gray-500">{slot.start} - {slot.end}</span>
                    </div>
                  ))}
                </div>

                <button
                  id={`list-remove-${course.id}`}
                  onClick={() => onRemoveCourse(course.id)}
                  className="p-3 bg-red-50 text-red-650 border-2 border-red-200 hover:bg-red-100/50 hover:text-red-700 rounded-none transition-all active:scale-95 flex items-center justify-center self-stretch sm:self-auto"
                  title="Remove Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {selectedCourses.length === 0 && (
          <div className="h-80 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
            <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-none mb-4">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest leading-none">Plan Empty</h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed mt-2.5">
              Use the Course Browser panel on the left to select classes. They will appear here in detailed view.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
