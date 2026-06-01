import React from 'react';
import { Course } from '../types';
import { Trash2, AlertTriangle, CheckCircle2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  selectedCourses: Course[];
  onRemoveCourse: (id: string) => void;
  onEnroll: () => void;
  conflicts: Set<string>;
}

export const Cart: React.FC<CartProps> = ({ selectedCourses, onRemoveCourse, onEnroll, conflicts }) => {
  const totalUnits = selectedCourses.reduce((sum, c) => sum + c.units, 0);
  const hasConflicts = conflicts.size > 0;

  return (
    <div className="flex flex-col h-full bg-white border-l-2 border-gray-200 w-80">
      <div className="p-4 border-b-2 border-gray-200 bg-gray-50/50">
        <h2 className="text-sm font-black text-gray-900 flex items-center gap-2 uppercase tracking-wide">
          <ShoppingCart className="w-4 h-4 text-[#0064A4]" />
          Plan Summary
        </h2>
        <div className="flex justify-between items-center mt-2.5">
          <p className="text-[11px] text-gray-505 font-bold uppercase tracking-wide">{selectedCourses.length} Courses Selected</p>
          <div className="flex items-center gap-1.5">
             <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Units:</span>
             <span className={`text-sm font-black border px-2 py-0.5 rounded-none ${totalUnits > 18 ? 'text-amber-800 bg-amber-50 border-amber-200' : 'text-[#0064A4] bg-blue-50 border-[#0064A4]/20'}`}>{totalUnits}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
        <AnimatePresence mode="popLayout">
          {selectedCourses.map((course) => {
            const isConflicting = conflicts.has(course.id);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                key={course.id}
                className={`p-3 rounded-none border-2 transition-all ${isConflicting ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200 hover:border-[#0064A4]'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <h3 className={`text-xs font-black ${isConflicting ? 'text-red-700' : 'text-gray-900'}`}>
                      {course.dept} {course.number}
                    </h3>
                    <p className={`text-[11px] truncate font-semibold mt-0.5 ${isConflicting ? 'text-red-650' : 'text-gray-500'}`}>
                      {course.title}
                    </p>
                  </div>
                  <button 
                    id={`remove-course-${course.id}`}
                    onClick={() => onRemoveCourse(course.id)}
                    className={`p-1 rounded-none border border-transparent transition-colors ${isConflicting ? 'hover:bg-red-100 text-red-500 hover:border-red-300' : 'hover:bg-gray-200 text-gray-400 hover:text-red-500 hover:border-gray-300'}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isConflicting && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-black text-red-650 uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Time Conflict Detected
                  </div>
                )}
                
                <div className="mt-2 text-[10px] font-bold text-gray-400 font-mono">
                  {course.schedule.map(s => `${s.day} ${s.start}-${s.end}`).join(', ')}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {selectedCourses.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-center px-6">
            <div className="w-12 h-12 rounded-none bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6 opacity-20 text-[#0064A4]" />
            </div>
            <p className="text-xs font-bold leading-relaxed">Your study list is empty.<br/><span className="text-[10px] font-semibold opacity-60">Add courses from the sidebar to assemble your schedule.</span></p>
          </div>
        )}
      </div>

      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <button
          id="enroll-now-button"
          onClick={onEnroll}
          disabled={selectedCourses.length === 0 || hasConflicts}
          className={`w-full py-4 rounded-none flex items-center justify-center gap-2 text-sm font-black transition-all border-2 active:scale-[0.98] ${
            selectedCourses.length === 0 || hasConflicts 
            ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed shadow-none' 
            : 'bg-[#0064A4] border-[#0064A4] text-white hover:bg-[#FFD200] hover:text-[#0064A4] hover:border-[#0064A4] shadow-md'
          }`}
        >
          {hasConflicts ? 'Resolve Conflicts' : 'Enroll Now'}
          <CheckCircle2 className="w-4 h-4" />
        </button>
        <p className="text-[10px] text-center text-gray-400 mt-3 font-semibold px-4 tracking-wide leading-relaxed">
          By clicking Enroll Now, you agree to the UCI registrar terms and conditions.
        </p>
      </div>
    </div>
  );
};
