export interface TimeSlot {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  start: string; // "HH:mm" (24h format)
  end: string;   // "HH:mm"
}

export interface Course {
  id: string;
  dept: string;
  number: string;
  title: string;
  instructor: string;
  description: string;
  location: string;
  schedule: TimeSlot[];
  category: 'Major' | 'GE' | 'Elective';
  units: number;
}
