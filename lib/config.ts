// ============================================
// SİTE KONFİGÜRASYONU — Tüm içeriği buradan düzenle
// ============================================

export const siteConfig = {
  name: 'Emre Ercan',
  shortName: 'emre.',
  email: 'contact@emreercan.org',
  github: 'https://github.com/kairos8713',
  linkedin: '',
  availableForWork: true,
}

export const techStack = [
  'Python',
  'Next.js',
  'FFmpeg',
  'Framer Motion',
  'Whisper',
  'RIFE',
  'Qwen',
  'SQL',
  'Java',
  'TypeScript',
  'Bash',
  'PyQt5',
  'Scikit-learn',
]

export const heroTagline = {
  en: {
    line1: 'I build systems',
    line2: 'that run while I sleep.',
    sub: 'Automation · Machine Learning · Content at scale',
    cta: 'See my work',
  },
  tr: {
    line1: 'Uyurken çalışan',
    line2: 'sistemler inşa ediyorum.',
    sub: 'Otomasyon · Makine Öğrenmesi · İçerik sistemleri',
    cta: 'Projelerime bak',
  },
}

export const aboutText = {
  en: 'CS student in Poland. I build automation systems at scale — YouTube channels, Instagram pipelines, evolutionary ML. I write about what I learn.',
  tr: "Polonya'da bilgisayar mühendisliği öğrencisiyim. Büyük ölçekli otomasyon sistemleri inşa ediyorum — YouTube kanalları, Instagram pipeline'ları, evrimsel ML. Öğrendiklerimi yazıyorum.",
}

export const footerQuote = 'Always a work in progress.'

export const certificates: {
  title: string
  issuer: string
  year: string
  url?: string
}[] = [
    // Sertifika eklemek için:
    // { title: 'AWS Cloud Practitioner', issuer: 'Amazon', year: '2024', url: 'https://...' },
  ]

export const timeline: {
  year: string
  title: string
  description?: string
}[] = [
    { year: '2024', title: 'Built Nexa Saas system', description: 'Developed full-stack Saas system for cafes' },
    { year: '2025', title: 'Started CS degree in Poland', description: 'Studying Computer Science at Polish-Japanese Academy of Information Technology (Warsaw)' },
    { year: '2025', title: 'Built first YouTube automation pipeline', description: '20 channels(for testing), fully automated content system' },
    { year: '2026', title: 'Consilium — Evolutionary ML project', description: 'Neuroevolution system' },
    { year: 'Today', title: 'I am still learning and improving myself' },
  ]

export const hobbies = [
  'Machine Learning',
  'System Design',
  'Automation',
  'Open Source',
  'Reading',
  'Producing music',
  'Coding(for fun)'
]

export const languages: {
  name: string
  level: string
  progress: number
}[] = [
    { name: 'Turkish', level: 'Native', progress: 100 },
    { name: 'English', level: 'B2 IELTS', progress: 68.75 },
    { name: 'Polish', level: 'Beginner', progress: 10 },
  ]

export type ProjectStatus = 'planned' | 'in-progress' | 'done'

export const projects: {
  title: string
  description: string
  tech: string[]
  status: ProjectStatus
  progress: number
  githubUrl?: string
  liveUrl?: string
}[] = [
    {
      title: 'YouTube Automation Pipeline',
      description: '17 channels, fully automated shorts production with RIFE interpolation and Whisper transcription.',
      tech: ['Python', 'FFmpeg', 'Whisper', 'yt-dlp', 'Qwen'],
      status: 'in-progress',
      progress: 75,
    },
    {
      title: 'Consilium — Evolutionary ML',
      description: 'Gradient-free neuroevolution system for car price prediction with Flask web interface.',
      tech: ['Python', 'Flask', 'NumPy'],
      status: 'done',
      progress: 100,
    },
    {
      title: 'Instagram Agency System',
      description: 'Full-stack automation for pet product businesses. Local AI stack with FastAPI panel.',
      tech: ['Python', 'FastAPI', 'Qwen', 'instagrapi', 'SQLite'],
      status: 'in-progress',
      progress: 40,
    },
  ]

