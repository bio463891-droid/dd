// ─── Mock Data ────────────────────────────────────────────────────────────────

export const TEACHERS = [
  { id: '1', name: 'أ. أحمد علي',    subject: 'رياضيات',  avatar: '👨‍🏫' },
  { id: '2', name: 'أ. سارة محمد',   subject: 'فيزياء',    avatar: '👩‍🏫' },
  { id: '3', name: 'أ. خالد حسين',   subject: 'كيمياء',    avatar: '👨‍🔬' },
  { id: '4', name: 'أ. منى إبراهيم', subject: 'أحياء',     avatar: '👩‍🔬' },
];

export const COURSES = [
  {
    id: '1',
    title: 'رياضيات متقدمة',
    teacher: 'أ. أحمد علي',
    lectures: 12,
    color: '#F38452',
    emoji: '📐',
    description: 'كورس شامل في الرياضيات المتقدمة يغطي التفاضل والتكامل والجبر الخطي.',
  },
  {
    id: '2',
    title: 'الفيزياء الحديثة',
    teacher: 'أ. سارة محمد',
    lectures: 10,
    color: '#5B8AF3',
    emoji: '⚛️',
    description: 'استكشاف مفاهيم الفيزياء الكمية والنسبية مع تطبيقات عملية.',
  },
  {
    id: '3',
    title: 'الكيمياء العضوية',
    teacher: 'أ. خالد حسين',
    lectures: 8,
    color: '#6FCF97',
    emoji: '🧪',
    description: 'دراسة مفصلة للمركبات العضوية وتفاعلاتها الكيميائية.',
  },
  {
    id: '4',
    title: 'علم الأحياء الجزيئي',
    teacher: 'أ. منى إبراهيم',
    lectures: 9,
    color: '#BB6BD9',
    emoji: '🧬',
    description: 'رحلة عميقة في عالم الجينات والبروتينات وآليات الحياة.',
  },
];

export const LECTURES = (courseId) =>
  Array.from({ length: COURSES.find(c => c.id === courseId)?.lectures ?? 6 }, (_, i) => ({
    id: `${courseId}-lec-${i + 1}`,
    number: i + 1,
    title: `المحاضرة ${i + 1}`,
    duration: `${30 + i * 5} دقيقة`,
    isUnlocked: i < 2,
  }));
