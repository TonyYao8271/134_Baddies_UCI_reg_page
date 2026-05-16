import { useState, useCallback, useMemo, useEffect } from 'react';
import { Course, TimeSlot } from '../types';

const timeToMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const slotsOverlap = (s1: TimeSlot, s2: TimeSlot) => {
  if (s1.day !== s2.day) return false;
  const start1 = timeToMin(s1.start);
  const end1 = timeToMin(s1.end);
  const start2 = timeToMin(s2.start);
  const end2 = timeToMin(s2.end);
  return Math.max(start1, start2) < Math.min(end1, end2);
};

export function useRegistration() {
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zotreg_selected');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('zotreg_selected', JSON.stringify(selectedCourseIds));
  }, [selectedCourseIds]);

  const addCourse = useCallback((id: string) => {
    setSelectedCourseIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const removeCourse = useCallback((id: string) => {
    setSelectedCourseIds(prev => prev.filter(i => i !== id));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCourseIds([]);
  }, []);

  return {
    selectedCourseIds,
    addCourse,
    removeCourse,
    clearSelection,
    slotsOverlap
  };
}
