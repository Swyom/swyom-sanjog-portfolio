import { Project, Service, TechSkill, Testimonial, Certificate, BlogPost, Stat } from '../types';
import { getAssetUrl } from '../utils/assets';

export const HERO_DATA = {
  name: "P SWYOM SANJOG",
  title: "Software Developer & BTech Student",
  subtitles: [
    "Full-Stack Web Developer",
    "& Mobile App Developer !"

  ],
  bio: "I like turning ideas into real apps that people can actually use. I focus on building things that are simple, useful, and work smoothly.",
  avatarUrl: getAssetUrl('assets/swyomIMG.png'),
  avatarFallbackUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  codeSnippet: `class Developer {
  name = 'P Swyom Sanjog';
  focus = 'React Native & FastAPI';
  mission = 'solve real problems';
}`,
  socials: [
    { name: 'GitHub', icon: 'Github', url: 'https://github.com/Swyom' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/swyom-sanjog' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://x.com/SwyomSanjog' }
  ]
};

export const STATS_DATA: Stat[] = [
  { id: '1', label: 'Projects Built', value: 10, suffix: '+', icon: 'Code' },
  { id: '2', label: 'Tech Stack Proficiency', value: 100, suffix: '%', icon: 'Smile' },
  { id: '3', label: 'Hackathons Attended', value: 5, suffix: '+', icon: 'Star' }
];

export const ABOUT_DATA = {
  tag: "ABOUT ME",
  heading: "Solving Real Problems. Continuous Learning.",
  mainBio:
    "I enjoy building things and solving problems in a simple and practical way. When I start working on something, I first try to understand it clearly and break it into smaller parts. I like testing ideas, learning from mistakes, and improving step by step. I focus on creating apps that are easy to use, useful, and reliable. I believe in staying consistent, learning continuously, and adapting to new challenges while growing through real experience every day.",
  features: [
    {
      title: "Mobile First",
      desc: "React Native solutions with clean UI, smooth performance & mobile UX.",
      icon: "Monitor",
    },
    {
      title: "Backend & APIs",
      desc: "Robust APIs built using FastAPI, Python, and PostgreSQL database.",
      icon: "Code2",
    },
    {
      title: "Problem Solver",
      desc: "Focused on creating applications that solve everyday real-world problems.",
      icon: "Zap",
    },
    {
      title: "Hackathon Driven",
      desc: "Rapid execution, turning ideas into working prototypes under time constraints.",
      icon: "UserCheck",
    },
  ],
};
export const SERVICES_DATA: Service[] = [
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design (Web & Mobile)',
    shortDesc: 'Crafting intuitive, pixel-perfect user interfaces and interactive prototypes for mobile and web.',
    fullDesc: 'User-centered design focusing on wireframing, high-fidelity UI design, user experience consistency, and interactive mobile & web prototypes using Figma and modern design systems.',
    iconName: 'Palette',
    deliverables: ['Mobile & Web UI Design', 'Interactive Wireframes & Prototypes', 'Responsive Layout Systems', 'Design Tokens & UI Kits'],
    tools: ['Figma', 'UI/UX Design', 'Tailwind CSS', 'Wireframing'],
    timeline: '1-2 Weeks'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    shortDesc: 'Building fast, responsive, and SEO-optimized web applications with modern tech stack.',
    fullDesc: 'End-to-end frontend and full-stack web development using React, Next.js, HTML5, CSS3, and Tailwind CSS. Focused on ultra-fast page load speeds, clean component architecture, and responsive layouts across all device sizes.',
    iconName: 'Globe',
    deliverables: ['Responsive Web Applications', 'React & Next.js Frontend', 'SEO Optimization & Meta Specs', 'Clean Component Architecture'],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
    timeline: '2-3 Weeks'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    shortDesc: 'High-performance cross-platform iOS & Android mobile applications using React Native.',
    fullDesc: 'Building production-ready mobile applications with React Native and Expo. Features fluid touch gestures, state management, push notifications, local storage, and smooth REST API backend integrations.',
    iconName: 'Smartphone',
    deliverables: ['React Native iOS & Android Apps', 'Expo Cross-Platform Builds', 'Offline Storage & Push Notifications', 'Smooth Mobile Navigation'],
    tools: ['React Native', 'Expo', 'JavaScript', 'TypeScript'],
    timeline: '2-4 Weeks'
  },
  {
    id: 'redesign-debug',
    title: 'Redesign & Debugging',
    shortDesc: 'Refactoring existing codebases, modernizing UI layouts, and fixing complex technical bugs.',
    fullDesc: 'Upgrading legacy codebases, refactoring UI components for modern aesthetics, diagnosing and fixing tricky frontend/backend bugs, optimizing app performance, and integrating new feature requirements.',
    iconName: 'Wrench',
    deliverables: ['UI/UX Layout Modernization', 'Bug Fixing & Code Refactoring', 'Performance & Speed Optimization', 'API Endpoint Integrations'],
    tools: ['React', 'React Native', 'FastAPI', 'VS Code', 'Git'],
    timeline: '1-2 Weeks'
  }
];

export const TECH_STACK: TechSkill[] = [
  { name: 'HTML5', category: 'Frontend', icon: 'html5', color: '#E34F26', level: 95, yearsExp: '3+ yrs' },
  { name: 'CSS3', category: 'Frontend', icon: 'css3', color: '#1572B6', level: 92, yearsExp: '3+ yrs' },
  { name: 'JavaScript', category: 'Frontend', icon: 'javascript', color: '#F7DF1E', level: 95, yearsExp: '3+ yrs' },
  { name: 'React', category: 'Frontend', icon: 'react', color: '#61DAFB', level: 94, yearsExp: '3+ yrs' },
  { name: 'Next.js', category: 'Frontend', icon: 'nextjs', color: '#FFFFFF', level: 90, yearsExp: '2+ yrs' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwindcss', color: '#06B6D4', level: 94, yearsExp: '2+ yrs' },
  { name: 'React Native', category: 'Mobile', icon: 'reactnative', color: '#61DAFB', level: 95, yearsExp: '2+ yrs' },
  { name: 'Expo', category: 'Mobile', icon: 'expo', color: '#FFFFFF', level: 92, yearsExp: '2+ yrs' },
  { name: 'Node.js', category: 'Backend', icon: 'nodejs', color: '#339933', level: 90, yearsExp: '2+ yrs' },
  { name: 'Express.js', category: 'Backend', icon: 'express', color: '#EEEEEE', level: 88, yearsExp: '2+ yrs' },
  { name: 'MongoDB', category: 'Database', icon: 'mongodb', color: '#47A248', level: 86, yearsExp: '2+ yrs' },
  { name: 'Firebase', category: 'BaaS', icon: 'firebase', color: '#FFCA28', level: 90, yearsExp: '2+ yrs' },
  { name: 'Supabase', category: 'BaaS', icon: 'supabase', color: '#3ECF8E', level: 88, yearsExp: '2+ yrs' },
  { name: 'FastAPI', category: 'Backend', icon: 'fastapi', color: '#009688', level: 92, yearsExp: '2+ yrs' },
  { name: 'Django', category: 'Backend', icon: 'django', color: '#0C4B33', level: 85, yearsExp: '2+ yrs' },
  { name: 'Git & GitHub', category: 'Tools', icon: 'git', color: '#F05032', level: 92, yearsExp: '3+ yrs' },
  { name: 'VS Code', category: 'Tools', icon: 'vscode', color: '#007ACC', level: 96, yearsExp: '3+ yrs' },
  { name: 'Figma', category: 'Design', icon: 'figma', color: '#F24E1E', level: 88, yearsExp: '2+ yrs' }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'abhyas',
    title: 'Abhyas',
    category: 'Mobile Apps',
    description: 'A habit tracker application designed to help users build consistency and discipline through daily action tracking, streak monitoring, and progress analytics.',
    longDescription: 'Abhyas is a habit tracking application built to empower users to build discipline through small, daily actions. It features daily habit tracking, streak monitoring, automated reminder notifications, and comprehensive progress analytics.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'FastAPI', 'PostgreSQL'],
    liveUrl: 'https://github.com/Swyom/Abhyas',
    githubUrl: 'https://github.com/Swyom/Abhyas',
    featured: true,
    metrics: [
      { label: 'Habit Consistency', value: '100%' },
      { label: 'Analytics', value: 'Real-time' },
      { label: 'Platform', value: 'Mobile' }
    ],
    features: [
      'Daily habit tracking & streak monitoring system',
      'Smart reminders with customizable push notifications',
      'Visual progress analytics & completion graphs',
      'Clean intuitive dark mode interface designed for consistency'
    ]
  },
  {
    id: 'note-app',
    title: 'Note App',
    category: 'Web Apps',
    description: 'A clean and efficient note-taking application featuring rich text formatting, quick categorization, instant search, and local storage syncing.',
    longDescription: 'A lightweight note-taking web application built for quick idea capturing, structured note organization, tag-based categorization, and fast search filtering.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'LocalStorage'],
    liveUrl: 'https://github.com/Swyom/NoteappUI',
    githubUrl: 'https://github.com/Swyom/NoteappUI',
    featured: true,
    metrics: [
      { label: 'Note Syncing', value: 'Instant' },
      { label: 'Search Speed', value: '< 10ms' },
      { label: 'Storage', value: 'Persistent' }
    ],
    features: [
      'Fast rich text note creation & instant editing',
      'Category tags & color-coded note labels',
      'Real-time keyword search & filter indexing',
      'Persistent storage with automatic draft saving'
    ]
  },
  {
    id: 'food-delivery-app',
    title: 'Food Delivery App',
    category: 'Mobile Apps',
    description: 'A cross-platform mobile application featuring interactive restaurant browsing, live menu ordering, cart management, and order status updates.',
    longDescription: 'A full-featured mobile food ordering and delivery user interface. Engineered with interactive restaurant search, categorized food menus, shopping cart persistence, and order tracking flow.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'Redux', 'Tailwind CSS'],
    liveUrl: 'https://github.com/Swyom/FoodDeliveryApp',
    githubUrl: 'https://github.com/Swyom/FoodDeliveryApp',
    featured: true,
    metrics: [
      { label: 'UI Flow', value: 'Fluid' },
      { label: 'Cart Syncing', value: 'Real-time' },
      { label: 'Platform', value: 'iOS & Android' }
    ],
    features: [
      'Interactive restaurant discovery & category filters',
      'Custom menu item selection & cart management',
      'Order checkout summary & price calculation',
      'Smooth mobile gesture navigation & clean dark UI'
    ]
  },
  {
    id: 'human-safety-app',
    title: 'Industrial Safety App',
    category: 'Mobile Apps',
    description: 'An emergency response & human safety mobile application featuring one-tap SOS alerts, real-time GPS location sharing, and emergency contact notifications.',
    longDescription: 'A safety-focused mobile emergency application designed to provide immediate assistance during critical situations. Features one-tap panic SOS button triggering, live GPS location tracking, and instant automated sms/email alerts to trusted emergency contacts.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'Geolocation API', 'FastAPI'],
    liveUrl: 'https://github.com/Swyom/Human-Safety-App',
    githubUrl: 'https://github.com/Swyom/Human-Safety-App',
    featured: true,
    metrics: [
      { label: 'SOS Trigger', value: 'Instant' },
      { label: 'GPS Precision', value: 'High Accuracy' },
      { label: 'Response', value: 'Real-time' }
    ],
    features: [
      'One-tap SOS emergency alert activation',
      'Real-time GPS location broadcasting & tracking',
      'Automated dispatch to registered emergency contacts',
      'High-contrast accessible dark interface for rapid access'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    quote: "P. Swyom Sanjog is a remarkably dedicated developer. His work on mobile-first applications and backend API design demonstrates high technical clarity and strong problem-solving skills.",
    author: "Hackathon Mentor",
    role: "Lead Architect",
    company: "Tech Innovation Sprint",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: '2',
    quote: "Swyom's ability to turn an idea into a working prototype rapidly during hackathons is incredible. Clean code, great UI, and high execution speed.",
    author: "Project Collaborator",
    role: "Full-Stack Engineer",
    company: "Dev Community",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: '3',
    quote: "Abhyas is a prime example of Swyom's commitment to building practical, everyday solutions. Smooth performance, great user experience!",
    author: "Peer Reviewer",
    role: "Software Developer",
    company: "BTech Tech Forum",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: 'cert-genai',
    title: 'Generative AI Certification',
    issuer: 'GenAI & Artificial Intelligence',
    issueDate: '2024',
    credentialId: 'GEN-AI-2024',
    image: getAssetUrl('assets/GEN AI certificate.png'),
    skills: ['Generative AI', 'Prompt Engineering', 'AI Solutions', 'LLMs'],
    featured: true
  },
  {
    id: 'cert-webdev',
    title: 'Web Development Internship',
    issuer: 'Software Engineering Certification',
    issueDate: '2024',
    credentialId: 'WEB-INT-2024',
    image: getAssetUrl('assets/webdev-internship.webp'),
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Frontend Engineering'],
    featured: true
  },
  {
    id: 'cert-android',
    title: 'Android App Development Internship',
    issuer: 'Mobile Engineering Certification',
    issueDate: '2024',
    credentialId: 'AND-INT-2024',
    image: getAssetUrl('assets/android-internship.webp'),
    skills: ['Android Dev', 'React Native', 'Mobile UI/UX', 'App Architecture'],
    featured: true
  },
  {
    id: 'cert-festronix',
    title: 'Festronix Hackathon Achievement',
    issuer: 'Festronix Tech Summit',
    issueDate: '2024',
    credentialId: 'FEST-HACK-2024',
    image: getAssetUrl('assets/festronix-hackathon.webp'),
    skills: ['Rapid Prototyping', 'Full-Stack MVP', 'Problem Solving'],
    featured: true
  },
  {
    id: 'cert-bigdata-int',
    title: 'Big Data Integration & Processing',
    issuer: 'Big Data Specialization',
    issueDate: '2024',
    credentialId: 'BD-INT-8832',
    image: getAssetUrl('assets/big-data-integration.webp'),
    skills: ['Data Processing', 'FastAPI', 'Backend Systems', 'Pipelines'],
    featured: true
  },
  {
    id: 'cert-bigdata-mod',
    title: 'Big Data Modeling & Management',
    issuer: 'Data Engineering Certification',
    issueDate: '2024',
    credentialId: 'BD-MOD-9941',
    image: getAssetUrl('assets/big-data-modeling.webp'),
    skills: ['Database Architecture', 'MongoDB', 'PostgreSQL', 'Data Schemas'],
    featured: true
  },
  {
    id: 'cert-ml-bigdata',
    title: 'Machine Learning with Big Data',
    issuer: 'AI & Data Science Certification',
    issueDate: '2024',
    credentialId: 'ML-BD-1102',
    image: getAssetUrl('assets/machine-learning-bigdata.webp'),
    skills: ['Machine Learning', 'Python', 'Data Analytics', 'Model Evaluation'],
    featured: true
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'building-react-native-apps',
    title: 'Building Cross-Platform Mobile Apps with React Native & Expo',
    excerpt: 'Key architectural insights, state management patterns, and performance optimizations for shipping production-ready mobile applications.',
    content: `Building mobile applications with React Native and Expo has evolved significantly. In this article, I share my experience building habit tracking and productivity apps like Abhyas.

### Key Topics Covered:
1. **Component Architecture**: Organizing UI components into reusable atomic blocks.
2. **State Management**: Choosing between Context API and Zustand for lightweight state handling.
3. **Performance Optimization**: Reducing JS bridge overhead and optimizing image loading.
4. **Native APIs Integration**: Handling push notifications and local storage smoothly.

By focusing on clean component separation and efficient state hooks, cross-platform apps can feel just as responsive as native Swift and Kotlin applications.`,
    coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80',
    date: 'Jul 15, 2024',
    readTime: '5 min read',
    category: 'Mobile Apps',
    tags: ['React Native', 'Expo', 'Mobile Dev', 'Architecture'],
    featured: true
  },
  {
    id: 'fastapi-high-performance-backend',
    title: 'Mastering High-Performance REST APIs with Python FastAPI',
    excerpt: 'How async endpoints, Pydantic validation, and PostgreSQL ORMs create ultra-fast backend microservices.',
    content: `FastAPI is one of the fastest Python frameworks for building web APIs. Its native support for asynchronous programming makes it an exceptional choice for modern web apps.

### Core Highlights:
- **Async & Await**: Non-blocking I/O operations for database queries.
- **Auto OpenAPI Specs**: Automatic Swagger UI documentation generation.
- **Pydantic Validation**: Strict type hints and request schema parsing.
- **Database Pooling**: Integrating PostgreSQL with SQLAlchemy async ORM.

FastAPI combined with PostgreSQL provides a rock-solid foundation for scalable full-stack applications.`,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    date: 'Jun 28, 2024',
    readTime: '6 min read',
    category: 'Backend',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'REST API'],
    featured: true
  },
  {
    id: 'designing-habit-tracker-ux',
    title: 'Designing Abhyas: Lessons in Habit Tracking & UI/UX Consistency',
    excerpt: 'Designing dark-mode first user interfaces that promote daily user engagement and habit discipline.',
    content: `Designing an app for daily habit consistency requires removing friction at every single step. In Abhyas, the goal was to make logging a habit take less than 2 seconds.

### UX Design Decisions:
- **Single-Tap Actions**: One-click check-ins directly from the home feed.
- **Visual Micro-Feedback**: Gratifying checkmark animations and streak counters.
- **Minimalist Dark Aesthetics**: Reduced eye strain during late-night and morning habit tracking.

Great user experience isn't about adding features; it's about eliminating friction so users focus on what matters most.`,
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    date: 'May 10, 2024',
    readTime: '4 min read',
    category: 'Web Dev',
    tags: ['UI/UX', 'Product Design', 'React', 'Tailwind CSS'],
    featured: true
  }
];

export const CONTACT_INFO = {
  name: "P Swyom Sanjog",
  email: "swyom82@gmail.com",
  phone: "+91 82490 74907",
  whatsapp: "+91 82490 74907",
  whatsappUrl: "https://wa.me/918249074907",
  location: "Angul, Odisha, India",
  availability: "Open for opportunities & collaborations"
};
