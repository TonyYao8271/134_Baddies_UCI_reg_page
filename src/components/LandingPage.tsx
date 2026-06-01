import React, { useState } from 'react';
import { 
  Globe, 
  ArrowRight, 
  UserCheck, 
  ChevronDown, 
  Calendar as CalendarIcon, 
  GraduationCap, 
  DollarSign, 
  Users, 
  Newspaper, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingPageProps {
  onStartPlanning: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartPlanning }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Quick Nav dropdown links
  const registrarLinks = [
    { name: 'University Calendar', url: 'https://www.reg.uci.edu/navigation/calendars.html', icon: CalendarIcon },
    { name: 'Enrollment Services', url: 'https://www.reg.uci.edu/navigation/enrollment.html', icon: GraduationCap },
    { name: 'Faculty & Staff Portal', url: 'https://www.reg.uci.edu/navigation/facultystaff.html', icon: Users },
    { name: 'Fees & Tuition Rates', url: 'https://www.reg.uci.edu/navigation/fees.html', icon: DollarSign },
  ];

  // Made-up university news related to course offerings
  const universityNews = [
    {
      id: 1,
      tag: 'NEW COURSE OFFERING',
      tagColor: 'bg-[#0064A4]/15 text-[#0064A4] border border-[#0064A4]/20 font-bold',
      date: 'May 28, 2026',
      title: 'ICS Department Expands Advanced Artificial Intelligence & Web Architectures',
      summary: 'Due to exceptional enrollment demand, the School of Information and Computer Sciences will introduce fresh upper-division electives covering Gemini AI and automated full-stack environments.',
      readingTime: '3 min read'
    },
    {
      id: 2,
      tag: 'REGISTRATION UPDATE',
      tagColor: 'bg-[#FFD200]/15 text-blue-900 border border-[#FFD200]/40 font-bold',
      date: 'May 25, 2026',
      title: 'Writing 39C Standardized Formats: New Hybrid and In-Person Rooms Designated',
      summary: 'Academic writing coordinators have established extra research seminar slots for Writing 39C (Argument & Research) to help lower waitlist congestion for sophomore students and incoming transfers.',
      readingTime: '2 min read'
    },
    {
      id: 3,
      tag: 'CAMPUS MODERNIZATION',
      tagColor: 'bg-[#0064A4]/10 text-blue-900 border border-[#0064A4]/15 font-bold',
      date: 'May 19, 2026',
      title: 'Bio Sci 93 Series To Pilot High-Fidelity Hybrid Active Learning Classrooms',
      summary: 'DNA to Organisms sections will make use of newly completed multi-tier tables in biological sciences labs, supporting instant student collaboration and seamless real-time screen sharing.',
      readingTime: '4 min read'
    },
    {
      id: 4,
      tag: 'ACADEMIC RECOGNITION',
      tagColor: 'bg-[#FFD200]/10 text-amber-900 border border-[#FFD200]/30 font-bold',
      date: 'May 12, 2026',
      title: 'Introduction to Economics Course Standardizes Practical Microeconomic Policy Focus',
      summary: 'Professors from the Department of Economics have redesigned ECON 20A syllabus to include hands-on simulations of environmental cap-and-trade programs beginning Winter 2026.',
      readingTime: '3 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Banner Branding / Logo - Solid Blue with Gold Border Bottom */}
      <header className="bg-[#0064A4] text-white py-5 px-8 sticky top-0 z-50 border-b-4 border-[#FFD200] shadow-md shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-[#0064A4] flex items-center justify-center shadow-md ring-2 ring-[#FFD200] rounded-none">
              <BookOpen className="w-5 h-5 font-bold text-[#0064A4]" />
            </div>
            <div>
              <h1 className="text-base font-black text-[#FFD200] uppercase tracking-wider leading-none">
                UCI
              </h1>
              <p className="text-xs font-bold text-white leading-tight mt-0.5">University Registrar • Interactive Portal</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <span className="text-white/80">University of California, Irvine</span>
          </div>
        </div>
      </header>

      {/* Main Container Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand: News Column (Large scale portion) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Notices and Upcoming Deadlines Card */}
          <div className="bg-white rounded-none p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 pb-5 border-b border-gray-100">
              <CalendarIcon className="w-5 h-5 text-[#0064A4]" />
              <h2 className="text-lg font-black text-gray-950 uppercase tracking-tight">Notices & Upcoming Deadlines</h2>
              <span className="ml-auto text-[10px] font-bold text-red-650 bg-red-50 px-2.5 py-1 rounded-none uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-none bg-red-500 animate-pulse"></span> Active Deadlines
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              {/* Students Notice Box (Blue theme) */}
              <div className="bg-[#0064A4]/5 p-5 rounded-none border border-[#0064A4]/15 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#0064A4]/10">
                  <span className="text-[10px] font-black tracking-widest text-white uppercase bg-[#0064A4] px-2.5 py-0.5 rounded-none">
                    STUDENTS
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="relative pl-3 border-l-2 border-[#0064A4]">
                    <span className="text-[9px] font-bold text-[#0064A4] uppercase tracking-wider block">Spring Quarter Grades</span>
                    <p className="text-xs font-black text-gray-900 mt-0.5">Thursday, June 18, 10 p.m.</p>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Spring 2026 final grades available on StudentAccess.</p>
                  </div>

                  <div className="relative pl-3 border-l-2 border-[#FFD200]">
                    <span className="text-[9px] font-bold text-[#0064A4] uppercase tracking-wider block">Campus Holiday</span>
                    <p className="text-xs font-black text-gray-900 mt-0.5">Friday, June 19</p>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Juneteenth Holiday; campus offices closed.</p>
                  </div>
                </div>
              </div>

              {/* Faculty / Staff Notice Box (Gold theme) */}
              <div className="bg-[#FFD200]/5 p-5 rounded-none border border-[#FFD200]/35 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#FFD200]/30">
                  <span className="text-[10px] font-black tracking-widest text-blue-950 uppercase bg-[#FFD200] px-2.5 py-0.5 rounded-none">
                    FACULTY/STAFF
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="relative pl-3 border-l-2 border-[#0064A4]">
                    <span className="text-[9px] font-bold text-[#0064A4] uppercase tracking-wider block">WebGrades Opening</span>
                    <p className="text-xs font-black text-gray-900 mt-0.5">Friday, June 5, 5 p.m.</p>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Begin submitting final grades for Spring 2026 via WebGrades.</p>
                  </div>

                  <div className="relative pl-3 border-l-2 border-[#FFD200]">
                    <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider block">WebGrades Submission Deadline</span>
                    <p className="text-xs font-black text-gray-900 mt-0.5">Thursday, June 18, 5 p.m.</p>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Deadline to submit final grades for Spring 2026 via WebGrades.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-none p-6 border border-gray-150 shadow-sm">
            <div className="flex items-center gap-2 pb-5 border-b border-gray-100">
              <Newspaper className="w-5 h-5 text-[#0064A4]" />
              <h2 className="text-lg font-black text-gray-950 uppercase tracking-tight">University Registrar News</h2>
              <span className="ml-auto text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-none uppercase tracking-wider">
                Winter / Spring Updates
              </span>
            </div>

            {/* News Lists */}
            <div className="divide-y divide-gray-150 py-2">
              {universityNews.map((news) => (
                <article key={news.id} className="py-6 first:pt-4 last:pb-0 group">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] pb-2">
                    <span className={`px-2 py-0.5 rounded-none font-bold uppercase tracking-wide text-[9px] ${news.tagColor}`}>
                      {news.tag}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400 font-semibold">{news.date}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400 font-semibold">{news.readingTime}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#0064A4] group-hover:text-blue-800 transition-colors leading-snug">
                    {news.title}
                  </h3>

                  <p className="text-xs font-medium text-gray-500 mt-2 leading-relaxed">
                    {news.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Right Hand: Action Portal Cards */}
        <div className="lg:col-span-4 space-y-6 shrink-0">
          
          {/* Main Call to Action Course Planner Redesign */}
          <div className="bg-white rounded-none p-6 border border-gray-150 border-t-8 border-t-[#0064A4] border-b-8 border-b-[#FFD200] shadow-md relative overflow-hidden group">
            {/* Ambient Background Glow Effect */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#0064A4]/5 rounded-none blur-2xl group-hover:bg-[#FFD200]/15 transition-all duration-500" />
            
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-[#0064A4]/5 text-[#0064A4] rounded-none">
                <Sparkles className="w-4 h-4 text-[#0064A4]" />
              </div>
              <span className="text-[10px] font-black text-[#0064A4] uppercase tracking-wider">Interactive Program</span>
            </div>

            <h3 className="text-lg font-black text-gray-950 leading-tight">
              WebReg Course Planner
            </h3>
            
            <p className="text-xs font-semibold text-gray-500 mt-2 leading-relaxed">
              Try the new interactive WebReg with responsive study lists and live calendar clash detection.
            </p>

            <button 
              id="goto-webreg-button"
              onClick={onStartPlanning}
              className="mt-6 w-full py-4 bg-[#0064A4] hover:bg-[#FFD200] hover:text-[#0064A4] text-white rounded-none flex items-center justify-center gap-2.5 font-black text-sm shadow-md hover:shadow-lg border-2 border-[#0064A4] active:scale-[0.98] transition-all group cursor-pointer"
            >
              Access Web Reg
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFD200] group-hover:text-[#0064A4]" />
            </button>
          </div>

          {/* Quick Action Buttons Card - Dynamic Yellow and Blue Palette */}
          <div className="bg-white rounded-none p-6 border-2 border-[#0064A4] shadow-md space-y-3">
            <h4 className="text-xs font-black text-[#0064A4] uppercase tracking-widest pb-1.5 border-b-2 border-[#FFD200]">
              Official UCI Directories
            </h4>

            {/* UCI Home Button */}
            <a 
              href="https://www.uci.edu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3.5 bg-[#0064A4] hover:bg-[#FFD200] text-white hover:text-[#0064A4] border-2 border-[#0064A4] rounded-none text-xs font-black transition-all active:scale-[0.98] group"
            >
              <span className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#FFD200] group-hover:text-[#0064A4] transition-colors" />
                UCI Official Home
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FFD200] group-hover:text-[#0064A4] transition-colors" />
            </a>

            {/* Student Access Button */}
            <a 
              href="https://www.reg.uci.edu/access/student/welcome/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3.5 bg-[#0064A4] hover:bg-[#FFD200] text-white hover:text-[#0064A4] border-2 border-[#0064A4] rounded-none text-xs font-black transition-all active:scale-[0.98] group"
            >
              <span className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#FFD200] group-hover:text-[#0064A4] transition-colors" />
                UCI Student Access
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FFD200] group-hover:text-[#0064A4] transition-colors" />
            </a>

            {/* Dropdown Menu block */}
            <div className="relative pt-2">
              <button 
                id="links-dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between p-3.5 bg-white border-2 border-dashed border-[#0064A4] rounded-none text-xs font-black text-gray-800 hover:bg-[#FFD200]/10 transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#0064A4]" />
                  Additional Help Links
                </span>
                <ChevronDown className={`w-4 h-4 text-[#0064A4] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 right-0 mt-2 bg-white rounded-none border-2 border-[#0064A4] shadow-lg p-2.5 space-y-1 z-30"
                  >
                    {registrarLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <a 
                          key={link.name}
                          href={link.url}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 p-2.5 hover:bg-[#FFD200] hover:text-[#0064A4] rounded-none text-[11px] font-bold text-gray-750 transition-colors"
                        >
                          <IconComponent className="w-3.5 h-3.5 text-[#0064A4]" />
                          {link.name}
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </main>

      {/* WHO WE ARE Section & Footer Branding */}
      <footer className="bg-white border-t-4 border-[#0064A4] mt-16 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left select-text">
          {/* Definition block */}
          <div className="md:col-span-7 space-y-4">
            <div className="border-l-4 border-[#0064A4] pl-4 space-y-1">
              <h4 className="text-sm font-black text-[#0064A4] tracking-wide">
                Registrar <span className="font-semibold text-gray-400 text-xs font-mono">(rej • ə • strär)</span>
              </h4>
              <span className="text-[10px] uppercase font-black tracking-widest text-[#0064A4] block italic leading-none">
                noun
              </span>
              <p className="text-xs font-semibold text-gray-650 leading-relaxed max-w-xl">
                an official in a college or university who is responsible for maintaining student records, issuing reports of grades, distributing official publications, etc.
              </p>
            </div>
            <p className="text-xs font-semibold text-gray-500 leading-relaxed max-w-xl">
              The University Registrar aims to provide academic support services in an atmosphere of prompt, accurate, and friendly service to the campus community.
            </p>
          </div>

          {/* Contact Details block */}
          <div className="md:col-span-5 space-y-3 text-xs font-semibold text-gray-500 border-t md:border-t-0 md:border-l border-gray-150 pt-6 md:pt-0 md:pl-8">
            <h5 className="text-xs font-black text-[#0064A4] uppercase tracking-widest">University Registrar</h5>
            <div className="space-y-1 leading-relaxed">
              <p>
                <a href="mailto:registrar@uci.edu" className="font-bold text-[#0064A4] hover:underline">registrar@uci.edu</a>
                {' • '}
                <span>tel: (949) 824-6124</span>
                {' • '}
                <span>fax: (949) 824-7896</span>
              </p>
              <p>215 Aldrich Hall • Irvine, CA 92697-4975</p>
              <p className="text-[11px] text-gray-400 font-semibold">hours: Monday–Friday, 9:00 a.m.–5:00 p.m.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold text-gray-400">
          <div className="flex gap-4">
            <a 
              href="https://www.reg.uci.edu/privacy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#0064A4] transition-colors"
            >
              Privacy Notice
            </a>
          </div>
          <p>© UC Regents</p>
        </div>
      </footer>
    </div>
  );
};
