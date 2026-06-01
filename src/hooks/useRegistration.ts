import { useState, useCallback, useMemo, useEffect } from 'react';
import { Course, TimeSlot } from '../types';
import { MOCK_COURSES } from '../data/courses';

const timeToMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export const slotsOverlap = (s1: TimeSlot, s2: TimeSlot) => {
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

  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    localStorage.setItem('zotreg_selected', JSON.stringify(selectedCourseIds));
  }, [selectedCourseIds]);

  const addCourse = useCallback((id: string) => {
    const courseToAdd = MOCK_COURSES.find(c => c.id === id);
    if (!courseToAdd) return false;

    const selectedCourses = MOCK_COURSES.filter(c => selectedCourseIds.includes(c.id));

    let conflictingCourse: Course | null = null;
    const hasConflict = selectedCourses.some(selected => {
      const overlap = selected.schedule.some(s1 =>
        courseToAdd.schedule.some(s2 => slotsOverlap(s1, s2))
      );
      if (overlap) {
        conflictingCourse = selected;
      }
      return overlap;
    });

    if (hasConflict && conflictingCourse) {
      setNotification({
        message: `Conflict: Cannot add ${courseToAdd.dept} ${courseToAdd.number} (${courseToAdd.schedule.map(s => `${s.day} ${s.start}-${s.end}`).join(', ')}) due to overlap with ${conflictingCourse.dept} ${conflictingCourse.number}!`,
        type: 'error'
      });
      return false;
    }

    setSelectedCourseIds(prev => prev.includes(id) ? prev : [...prev, id]);
    setNotification({
      message: `Enrolled: Added ${courseToAdd.dept} ${courseToAdd.number} to plan.`,
      type: 'success'
    });
    return true;
  }, [selectedCourseIds]);

  const removeCourse = useCallback((id: string) => {
    const courseToRemove = MOCK_COURSES.find(c => c.id === id);
    setSelectedCourseIds(prev => prev.filter(i => i !== id));
    if (courseToRemove) {
      setNotification({
        message: `Removed ${courseToRemove.dept} ${courseToRemove.number} from plan.`,
        type: 'success'
      });
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCourseIds([]);
    setNotification({
      message: 'Selection cleared.',
      type: 'success'
    });
  }, []);

  return {
    selectedCourseIds,
    addCourse,
    removeCourse,
    clearSelection,
    slotsOverlap,
    notification,
    setNotification
  };
}
