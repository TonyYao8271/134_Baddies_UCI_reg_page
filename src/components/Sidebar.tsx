import React, { useState, useMemo } from 'react';
import { Course, TimeSlot } from '../types';
import { MOCK_COURSES } from '../data/courses';
import { Search, Plus, Check, AlertTriangle, BookOpen, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  onAddCourse: (id: string) => void;
  selectedCourseIds: string[];
  selectedCourses: Course[];
  slotsOverlap: (s1: TimeSlot, s2: TimeSlot) => boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onAddCourse, 
  selectedCourseIds,
  selectedCourses,
  slotsOverlap
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Major' | 'GE' | 'Elective'>('All');

  const departments = useMemo(() => {
    const depts = new Set(MOCK_COURSES.map(c => c.dept));
    return Array.from(depts).sort();
  }, []);

  // Determine which specific course conflicts with each item in the side panel
  const conflictsMap = useMemo(() => {
    const map: Record<string, Course> = {};
    MOCK_COURSES.forEach(course => {
      if (selectedCourseIds.includes(course.id)) return;
      const conflictingCourse = selectedCourses.find(selected => 
        selected.schedule.some(s1 => 
          course.schedule.some(s2 => slotsOverlap(s1, s2))
        )
      );
      if (conflictingCourse) {
        map[course.id] = conflictingCourse;
      }
    });
    return map;
  }, [selectedCourses, selectedCourseIds, slotsOverlap]);

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        `${course.dept} ${course.number}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesDept = !selectedDept || course.dept === selectedDept;
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      
      return matchesSearch && matchesDept && matchesCategory;
    });
  }, [searchTerm, selectedDept, selectedCategory]);

  return (
    <div className="flex flex-col h-full bg-white border-r-2 border-gray-200 w-80 shrink-0">
      {/* Sidebar Header - Corporate Solid Blue + Amber accent */}
      <div className="p-5 bg-gray-50 border-b-2 border-gray-200 flex items-start gap-2.5">
        <div className="w-9 h-9 bg-[#0064A4] text-[#FFD200] rounded-none flex items-center justify-center shrink-0 border border-[#0064A4]">
          <BookOpen className="w-5 h-5 font-bold" />
        </div>
        <div>
          <h2 className="text-xs font-black text-[#0064A4] uppercase tracking-wider leading-none">
            Schedule Search
          </h2>
          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">Enrollment Registry</p>
        </div>
      </div>

      {/* Filter panel */}
      <div className="p-4 border-b border-gray-150 space-y-4 bg-gray-50/20">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0064A4]" />
          <input 
            type="text"
            placeholder="Search code, title, instructor..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-gray-300 rounded-none text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0064A4]/15 focus:border-[#0064A4] transition-all placeholder:text-gray-400 text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Department select */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-[10px] font-black text-[#0064A4] uppercase tracking-wider">
            <SlidersHorizontal className="w-3 h-3" />
            <span>School / Department</span>
          </div>
          <select
            value={selectedDept || ''}
            onChange={(e) => setSelectedDept(e.target.value || null)}
            className="w-full bg-white border-2 border-gray-300 text-xs font-semibold rounded-none px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0064A4]/15 focus:border-[#0064A4] transition-all"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Category horizontal selection */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black text-[#0064A4] uppercase tracking-wider block">Course Type</span>
          <div className="flex bg-gray-150/60 p-1.5 rounded-none w-full border border-gray-250">
            {(['All', 'Major', 'GE', 'Elective'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-1 py-1 text-[10px] font-extrabold rounded-none transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#0064A4] text-white shadow-sm' 
                    : 'text-gray-505 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Cards Container */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
        {filteredCourses.map((course, idx) => {
          const isAdded = selectedCourseIds.includes(course.id);
          const conflictingEnrollment = conflictsMap[course.id];
          const hasConflict = !!conflictingEnrollment;

          return (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.03, 0.3) }}
              key={course.id}
              className={`p-4 rounded-none border-2 transition-all ${
                isAdded 
                  ? 'bg-[#0064A4]/5 border-[#0064A4] opacity-85' 
                  : hasConflict
                    ? 'bg-red-50/40 border-red-200'
                    : 'bg-white border-gray-200 hover:border-[#0064A4] hover:shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-gray-900">{course.dept} {course.number}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 font-bold uppercase tracking-wide rounded-none border border-gray-150 bg-gray-100 text-gray-500 scale-90 origin-left">
                      {course.units}u
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-650 truncate mt-0.5">{course.title}</p>
                </div>

                {isAdded ? (
                  <span className="p-1 px-2.5 bg-[#0064A4]/10 text-[#0064A4] text-[10px] font-black border border-[#0064A4]/20 rounded-none flex items-center gap-1 select-none">
                    <Check className="w-3 h-3" /> Selected
                  </span>
                ) : hasConflict ? (
                  <span 
                    title={`Conflicts with ${conflictingEnrollment.dept} ${conflictingEnrollment.number}`}
                    className="p-1 px-2 bg-red-105 text-red-700 text-[9px] font-black border border-red-200 rounded-none flex items-center gap-1 select-none cursor-help"
                  >
                    <AlertTriangle className="w-3 h-3 text-red-500" /> Conflict
                  </span>
                ) : (
                  <button
                    id={`add-course-${course.id}`}
                    onClick={() => onAddCourse(course.id)}
                    className="p-1 text-[#0064A4] border-2 border-[#0064A4] hover:bg-[#FFD200] hover:text-[#0064A4] hover:border-[#0064A4] rounded-none transition-all active:scale-90"
                    title="Add Course"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Warning label for conflicts */}
              {hasConflict && (
                <p className="mt-2 text-[10px] text-red-650 font-semibold bg-red-50 p-1.5 rounded-none border border-red-150 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  Clashes with: {conflictingEnrollment.dept} {conflictingEnrollment.number}
                </p>
              )}

              {/* Course Detail Panel */}
              <div className="mt-3 space-y-1 text-[11px] text-gray-500 font-medium">
                <div className="flex justify-between">
                  <span>Instructor:</span>
                  <span className="font-bold text-gray-700">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-bold text-gray-700">{course.location}</span>
                </div>
                
                {/* Visual time schedules list */}
                <div className="pt-2 border-t border-gray-100 mt-2">
                  {course.schedule.map((slot, i) => (
                    <div key={i} className="flex justify-between text-[10px] text-gray-400">
                      <span>{slot.day}</span>
                      <span className="tabular-nums font-bold text-gray-500">{slot.start} - {slot.end}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 text-center px-4">
            <Search className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-xs font-bold">No registered courses found</p>
            <p className="text-[10px] opacity-70 mt-1">Try resetting the department or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};
