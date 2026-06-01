import { useState, useMemo } from 'react';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { Calendar } from './components/Calendar';
import { ListView } from './components/ListView';
import { Cart } from './components/Cart';
import { EnrollModal } from './components/EnrollModal';
import { useRegistration } from './hooks/useRegistration';
import { MOCK_COURSES } from './data/courses';
import { LayoutGrid, Calendar as CalendarIcon, Info, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { 
    selectedCourseIds, 
    addCourse, 
    removeCourse, 
    clearSelection, 
    slotsOverlap,
    notification,
    setNotification
  } = useRegistration();
  
  const [viewMode, setViewMode] = useState<'landing' | 'webreg'>('landing');
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

  // If on landing, render the landing page exclusively
  if (viewMode === 'landing') {
    return <LandingPage onStartPlanning={() => setViewMode('webreg')} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] overflow-hidden font-sans relative">
      {/* Dynamic Header Workspace Banding - Solid Blue with Gold Border Bottom */}
      <header className="bg-[#0064A4] text-white py-4 px-8 border-b-4 border-[#FFD200] shadow-md flex justify-between items-center z-[60] select-none shrink-0 rounded-none">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewMode('landing')}
            className="w-10 h-10 bg-white hover:bg-[#FFD200] text-[#0064A4] flex items-center justify-center shadow-md transition-colors rounded-none font-black border-2 border-white text-sm"
            title="Return to Portal Home"
          >
            ←
          </button>
          <div>
            <h1 className="text-sm font-black text-[#FFD200] uppercase tracking-wider leading-none">
              UCI WebReg
            </h1>
            <p className="text-[10px] font-extrabold text-white/95 leading-tight mt-1">Interactive Course Planner</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-widest text-[#FFD200] bg-[#0064A4] border border-[#FFD200] px-3 py-1.5 rounded-none">
            REGISTRATION: WINTER 2026
          </span>
          <div className="w-9 h-9 rounded-none bg-white text-[#0064A4] border-2 border-[#FFD200] flex items-center justify-center text-xs font-black shadow-sm">
             JD
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Toast Notification HUD */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full px-4 pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              className="pointer-events-auto w-full bg-white rounded-none shadow-xl border-2 border-[#0064A4] p-4 flex items-start gap-3"
            >
              <div className="shrink-0 pt-0.5">
                {notification.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-650" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-gray-900">{notification.type === 'error' ? 'Registration Notice' : 'System Update'}</p>
                <p className="text-[11px] text-gray-600 font-semibold mt-0.5 leading-relaxed">{notification.message}</p>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="shrink-0 p-1 hover:bg-gray-100 rounded-none text-gray-400 hover:text-gray-600 transition-colors"
                title="Dismiss message"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Course Browser Sidebar with robust filtering */}
      <Sidebar 
        onAddCourse={addCourse} 
        selectedCourseIds={selectedCourseIds} 
        selectedCourses={selectedCourses}
        slotsOverlap={slotsOverlap}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-none border border-gray-250">
              <button 
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-black transition-all ${activeTab === 'calendar' ? 'bg-[#0064A4] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                Schedule Grid
              </button>
              <button 
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-black transition-all ${activeTab === 'list' ? 'bg-[#0064A4] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Planning List
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4" />
        </header>

        {/* View Surface */}
        <div className="flex-1 p-8 overflow-hidden">
          {activeTab === 'calendar' ? (
            <Calendar 
              selectedCourses={selectedCourses} 
              conflicts={conflicts} 
            />
          ) : (
            <ListView 
              selectedCourses={selectedCourses}
              onRemoveCourse={removeCourse}
            />
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
    </div>
  );
}
