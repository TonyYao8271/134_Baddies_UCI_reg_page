import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { MOCK_COURSES } from '../data/courses';
import { Search, Filter, Plus, ChevronRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  onAddCourse: (id: string) => void;
  selectedCourseIds: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddCourse, selectedCourseIds }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const departments = useMemo(() => {
    const depts = new Set(MOCK_COURSES.map(c => c.dept));
    return Array.from(depts);
  }, []);

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           `${course.dept} ${course.number}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = !selectedDept || course.dept === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDept]);

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 w-80">
      <div className="p-4 border-b border-gray-100 space-y-4">
        <h1 className="text-xl font-bold text-uci-blue flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          ZotReg
        </h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search courses..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-uci-blue/10 focus:border-uci-blue transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dept Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
          <button
            onClick={() => setSelectedDept(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${!selectedDept ? 'bg-uci-blue text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedDept === dept ? 'bg-uci-blue text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
        {filteredCourses.map((course, idx) => {
          const isAdded = selectedCourseIds.includes(course.id);
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={course.id}
              className={`p-4 rounded-2xl border transition-all group ${isAdded ? 'bg-gray-50 border-gray-200 grayscale opacity-60 pointer-events-none' : 'bg-white border-gray-100 hover:border-uci-blue hover:shadow-md active:scale-[0.98]'}`}
            >
              <div className="flex justify-between items-start gap-2 mb-1">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{course.dept} {course.number}</h3>
                  <p className="text-xs text-gray-500 font-medium truncate max-w-[160px]">{course.title}</p>
                </div>
                <button
                  id={`add-course-${course.id}`}
                  onClick={() => onAddCourse(course.id)}
                  disabled={isAdded}
                  className={`p-1.5 rounded-lg transition-colors ${isAdded ? 'bg-green-100 text-green-600' : 'bg-uci-blue/5 text-uci-blue hover:bg-uci-blue hover:text-white'}`}
                >
                  {isAdded ? <ChevronRight className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="flex flex-col gap-1 mt-3">
                <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400">
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{course.category}</span>
                  <span>•</span>
                  <span>{course.units} Units</span>
                </div>
                <p className="text-[11px] text-gray-600 flex items-center gap-1">
                  <span className="font-semibold text-gray-500 uppercase tracking-tight">Instructor:</span> {course.instructor}
                </p>
                <div className="mt-2 space-y-0.5">
                  {course.schedule.map((slot, i) => (
                    <div key={i} className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                      <span className="w-8 text-gray-500">{slot.day}</span>
                      <span>{slot.start} - {slot.end}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
        {filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <Search className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-xs font-medium">No courses found</p>
          </div>
        )}
      </div>
    </div>
  );
};
