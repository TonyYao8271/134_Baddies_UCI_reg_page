import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { Course } from '../types';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, onClose, courses }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 mb-2">Enrollment Success!</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                You've successfully registered for the following courses. Good luck with your quarter, Anteater!
              </p>

              <div className="w-full bg-gray-50 rounded-2xl p-4 space-y-2 mb-8 max-h-[200px] overflow-y-auto">
                {courses.map(course => (
                  <div key={course.id} className="flex justify-between items-center text-left border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 leading-tight">
                        {course.dept} {course.number}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">{course.title}</p>
                    </div>
                    <span className="text-[10px] font-black text-uci-blue tabular-nums">{course.units}u</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-[0.98]"
              >
                Close & Return
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
