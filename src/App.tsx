import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Calendar } from './components/Calendar';
import { Cart } from './components/Cart';
import { EnrollModal } from './components/EnrollModal';
import { useRegistration } from './hooks/useRegistration';
import { MOCK_COURSES } from './data/courses';
import { LayoutGrid, Calendar as CalendarIcon, Info } from 'lucide-react';

export default function App() {
  const { selectedCourseIds, addCourse, removeCourse, clearSelection, slotsOverlap } = useRegistration();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');

  const selectedCourses = useMemo(() => {
    return MOCK_COURSES.filter(c => selectedCourseIds.includes(c.id));
  }, [selectedCourseIds]);

  const conflicts = useMemo(() => {
    const conflictingIds = new Set<string>();
    for (let i = 0; i < selectedCourses.length; i++) {
      for (let j = i + 1; j < selectedCourses.length; j++) {
        const c1 = selectedCourses[i];
        const c2 = selectedCourses[j];
        
        const hasOverlap = c1.schedule.some(s1 => 
          c2.schedule.some(s2 => slotsOverlap(s1, s2))
        );

        if (hasOverlap) {
          conflictingIds.add(c1.id);
          conflictingIds.add(c2.id);
        }
      }
    }
    return conflictingIds;
  }, [selectedCourses, slotsOverlap]);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden font-sans">
      {/* Course Browser Sidebar */}
      <Sidebar 
        onAddCourse={addCourse} 
        selectedCourseIds={selectedCourseIds} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-bold text-gray-900 tracking-tight uppercase">Registration Planner</h2>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'calendar' ? 'bg-white text-uci-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                Schedule
              </button>
              <button 
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'list' ? 'bg-white text-uci-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                List View
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-lg">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tight">Reg Period: Winter 2026</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-uci-blue flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-4 ring-uci-blue/5">
                JD
             </div>
          </div>
        </header>

        {/* View Surface */}
        <div className="flex-1 p-8 overflow-hidden">
          {activeTab === 'calendar' ? (
            <Calendar 
              selectedCourses={selectedCourses} 
              conflicts={conflicts} 
            />
          ) : (
            <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-y-auto p-8 content-center text-center">
               <div className="max-w-md mx-auto py-20">
                  <LayoutGrid className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expanded Course View</h3>
                  <p className="text-sm text-gray-500">The detailed table view is coming soon in the next update. Please use the Calendar view for now.</p>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* Cart Panel */}
      <Cart 
        selectedCourses={selectedCourses} 
        onRemoveCourse={removeCourse} 
        onEnroll={() => setIsModalOpen(true)}
        conflicts={conflicts}
      />

      {/* Success Modal */}
      <EnrollModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          clearSelection();
        }} 
        courses={selectedCourses}
      />
    </div>
  );
}
