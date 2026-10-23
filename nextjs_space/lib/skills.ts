export type SkillGroup = {
  key: 'software' | 'management' | 'emergency';
  items: { tr: string; en: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: 'software',
    items: [
      { tr: 'TypeScript', en: 'TypeScript' },
      { tr: 'React & Next.js', en: 'React & Next.js' },
      { tr: 'Node.js', en: 'Node.js' },
      { tr: 'PostgreSQL', en: 'PostgreSQL' },
      { tr: 'Prisma', en: 'Prisma' },
      { tr: 'Tailwind CSS', en: 'Tailwind CSS' },
      { tr: 'REST & API Tasarımı', en: 'REST & API Design' },
    ],
  },
  {
    key: 'management',
    items: [
      { tr: 'Stratejik Planlama', en: 'Strategic Planning' },
      { tr: 'Kurumsal Dönüşüm', en: 'Corporate Transformation' },
      { tr: 'Ekip Liderliği', en: 'Team Leadership' },
      { tr: 'Bütçe Yönetimi', en: 'Budget Management' },
      { tr: 'Süreç ve İç Denetim', en: 'Process & Internal Audit' },
      { tr: 'Hizmet Kalitesi', en: 'Service Quality' },
    ],
  },
  {
    key: 'emergency',
    items: [
      { tr: 'Acil Durum Yönetimi', en: 'Emergency Management' },
      { tr: 'Yangın Operasyonu', en: 'Fire Suppression Operations' },
      { tr: 'Komuta Yapısı', en: 'Command Structure' },
      { tr: 'Tatbikat Planlaması', en: 'Drill Planning' },
      { tr: 'Risk Analizi', en: 'Risk Analysis' },
      { tr: 'Saha Koordinasyonu', en: 'Field Coordination' },
    ],
  },
];
