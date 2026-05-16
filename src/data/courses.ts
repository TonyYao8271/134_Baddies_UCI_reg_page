import { Course } from '../types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'u-101',
    dept: 'ICS',
    number: '31',
    title: 'Introduction to Programming',
    instructor: 'Richards, K.',
    description: 'Fundamental concepts of computer science and programming.',
    location: 'DBH 1100',
    schedule: [
      { day: 'Mon', start: '10:00', end: '11:20' },
      { day: 'Wed', start: '10:00', end: '11:20' }
    ],
    category: 'Major',
    units: 4
  },
  {
    id: 'u-102',
    dept: 'ICS',
    number: '32',
    title: 'Programming Software Libraries',
    instructor: 'Thornton, A.',
    description: 'Building and utilizing software libraries in Python.',
    location: 'DBH 1300',
    schedule: [
      { day: 'Tue', start: '11:00', end: '12:20' },
      { day: 'Thu', start: '11:00', end: '12:20' }
    ],
    category: 'Major',
    units: 4
  },
  {
    id: 'u-103',
    dept: 'MATH',
    number: '2A',
    title: 'Calculus I',
    instructor: 'Lehman, J.',
    description: 'Differential calculus for functions of one variable.',
    location: 'MSTB 118',
    schedule: [
      { day: 'Mon', start: '09:00', end: '09:50' },
      { day: 'Wed', start: '09:00', end: '09:50' },
      { day: 'Fri', start: '09:00', end: '09:50' }
    ],
    category: 'GE',
    units: 4
  },
  {
    id: 'u-104',
    dept: 'ECON',
    number: '20A',
    title: 'Basic Economics I',
    instructor: 'Rodriguez, M.',
    description: 'Basic principles of microeconomics and application.',
    location: 'SSL 228',
    schedule: [
      { day: 'Tue', start: '14:00', end: '15:20' },
      { day: 'Thu', start: '14:00', end: '15:20' }
    ],
    category: 'GE',
    units: 4
  },
  {
    id: 'u-105',
    dept: 'WRITING',
    number: '39C',
    title: 'Argument & Research',
    instructor: 'Heeb, J.',
    description: 'Advanced writing and research techniques.',
    location: 'HIB 100',
    schedule: [
      { day: 'Mon', start: '13:00', end: '14:20' },
      { day: 'Wed', start: '13:00', end: '14:20' }
    ],
    category: 'GE',
    units: 4
  },
  {
    id: 'u-106',
    dept: 'BIO SCI',
    number: '93',
    title: 'DNA to Organisms',
    instructor: 'Warrior, R.',
    description: 'General biology for biological sciences majors.',
    location: 'BS3 1200',
    schedule: [
      { day: 'Mon', start: '10:30', end: '11:50' }, // Conflicting with ICS 31 (10:00-11:20)
      { day: 'Wed', start: '10:30', end: '11:50' }
    ],
    category: 'Major',
    units: 4
  },
  {
    id: 'u-107',
    dept: 'COMPSCI',
    number: '161',
    title: 'Design & Analysis of Algorithms',
    instructor: 'Goodrich, M.',
    description: 'Fundamental algorithms and their performance analysis.',
    location: 'SH 128',
    schedule: [
      { day: 'Fri', start: '11:00', end: '13:50' }
    ],
    category: 'Major',
    units: 4
  },
  {
    id: 'u-108',
    dept: 'PSYBEH',
    number: '9',
    title: 'Introduction to Psychology',
    instructor: 'Hite, S.',
    description: 'Survey of modern psychology.',
    location: 'SSPA 1100',
    schedule: [
      { day: 'Tue', start: '09:00', end: '10:20' },
      { day: 'Thu', start: '09:00', end: '10:20' }
    ],
    category: 'Elective',
    units: 4
  },
  {
    id: 'u-109',
    dept: 'INF',
    number: '43',
    title: 'Introduction to Software Engineering',
    instructor: 'Redmiles, D.',
    description: 'Concepts, methods, and tools for software engineering.',
    location: 'ELH 100',
    schedule: [
      { day: 'Wed', start: '15:00', end: '17:50' }
    ],
    category: 'Major',
    units: 4
  },
  {
    id: 'u-110',
    dept: 'ART',
    number: '1A',
    title: 'History of Art I',
    instructor: 'Garberson, E.',
    description: 'Art history from prehistory to the Renaissance.',
    location: 'MCC 100',
    schedule: [
      { day: 'Fri', start: '14:00', end: '16:50' }
    ],
    category: 'GE',
    units: 4
  },
  {
    id: 'u-111',
    dept: 'ICS',
    number: '6B',
    title: 'Boolean Logic & Discrete structures',
    instructor: 'Dillencourt, M.',
    description: 'Logic and sets for computer science.',
    location: 'HIB 100',
    schedule: [
      { day: 'Mon', start: '12:00', end: '12:50' },
      { day: 'Wed', start: '12:00', end: '12:50' },
      { day: 'Fri', start: '12:00', end: '12:50' }
    ],
    category: 'Major',
    units: 4
  },
  {
    id: 'u-112',
    dept: 'MUSIC',
    number: '3',
    title: 'Introduction to Music',
    instructor: 'Min, G.',
    description: 'A survey of Western classical music.',
    location: 'WSH 100',
    schedule: [
      { day: 'Thu', start: '18:00', end: '20:50' }
    ],
    category: 'GE',
    units: 4
  },
  {
    id: 'u-113',
    dept: 'COMPSCI',
    number: '122A',
    title: 'Introduction to Data Management',
    instructor: 'Carey, M.',
    description: 'Design and usage of database systems.',
    location: 'DBH 1100',
    schedule: [
      { day: 'Tue', start: '12:30', end: '13:50' },
      { day: 'Thu', start: '12:30', end: '13:50' }
    ],
    category: 'Major',
    units: 4
  },
  {
    id: 'u-114',
    dept: 'STATS',
    number: '67',
    title: 'Prob & Stats for CS',
    instructor: 'Armstrong, J.',
    description: 'Probability and statistics applied to computer science.',
    location: 'SH 128',
    schedule: [
      { day: 'Mon', start: '14:00', end: '15:20' },
      { day: 'Wed', start: '14:00', end: '15:20' }
    ],
    category: 'Major',
    units: 4
  },
  {
    id: 'u-115',
    dept: 'PHILOS',
    number: '1',
    title: 'Introduction to Philosophy',
    instructor: 'Schwitzgebel, E.',
    description: 'Classical and contemporary philosophical problems.',
    location: 'EH 1200',
    schedule: [
      { day: 'Tue', start: '15:30', end: '16:50' },
      { day: 'Thu', start: '15:30', end: '16:50' }
    ],
    category: 'GE',
    units: 4
  }
];
