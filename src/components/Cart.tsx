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
    <div className="flex flex-col h-full bg-white border-l border-gray-100 w-80">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-gray-400" />
          Plan Summary
        </h2>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500 font-medium">{selectedCourses.length} Courses Selected</p>
          <div className="flex items-center gap-1.5">
             <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Units:</span>
             <span className={`text-sm font-black ${totalUnits > 18 ? 'text-amber-600' : 'text-uci-blue'}`}>{totalUnits}</span>
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
                className={`p-3 rounded-xl border transition-all ${isConflicting ? 'bg-red-50 border-red-200 shadow-sm' : 'bg-gray-50 border-gray-100'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <h3 className={`text-sm font-bold ${isConflicting ? 'text-red-700' : 'text-gray-900'}`}>
                      {course.dept} {course.number}
                    </h3>
                    <p className={`text-[11px] truncate font-medium ${isConflicting ? 'text-red-600/70' : 'text-gray-500'}`}>
                      {course.title}
                    </p>
                  </div>
                  <button 
                    id={`remove-course-${course.id}`}
                    onClick={() => onRemoveCourse(course.id)}
                    className={`p-1 rounded-lg transition-colors ${isConflicting ? 'hover:bg-red-200 text-red-500' : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isConflicting && (
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-red-600 uppercase tracking-tight">
                    <AlertTriangle className="w-3 h-3" />
                    Time Conflict Detected
                  </div>
                )}
                
                <div className="mt-2 text-[10px] font-medium text-gray-400">
                  {course.schedule.map(s => `${s.day} ${s.start}-${s.end}`).join(', ')}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {selectedCourses.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-center px-6">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6 opacity-20" />
            </div>
            <p className="text-sm font-medium leading-relaxed">Your cart is empty.<br/><span className="text-xs font-normal opacity-60">Add courses from the sidebar to visualize your schedule.</span></p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button
          id="enroll-now-button"
          onClick={onEnroll}
          disabled={selectedCourses.length === 0 || hasConflicts}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-lg shadow-uci-blue/10 active:scale-[0.98] ${
            selectedCourses.length === 0 || hasConflicts 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
            : 'bg-uci-blue text-white hover:bg-uci-blue/90 hover:-translate-y-0.5'
          }`}
        >
          {hasConflicts ? 'Resolve Conflicts' : 'Enroll Now'}
          <CheckCircle2 className="w-4 h-4" />
        </button>
        <p className="text-[10px] text-center text-gray-400 mt-3 font-medium px-4">
          By clicking Enroll Now, you agree to the UCI registrar terms and conditions.
        </p>
      </div>
    </div>
  );
};
