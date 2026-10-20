import { Project, Service, TechSkill, Testimonial, Certificate, BlogPost, Stat } from '../types';
import { getAssetUrl } from '../utils/assets';

export const HERO_DATA = {
  name: "P SWYOM SANJOG",
  title: "Mobile App Developer & BTech Student",
  subtitles: [
    "Mobile App Developer",
    "React Native Specialist",
    "Android & iOS Apps",
    "FullStack Developer"
  ],
  bio: "Computer Science undergraduate specializing in cross-platform Android & iOS development with React Native, Expo, and Supabase. Delivering real apps that people can actually use.",
  // 55 KB display-sized WebP; the full-resolution PNG is kept as a fallback
  avatarUrl: getAssetUrl('assets/swyomIMG.webp'),
  avatarFallbackUrl: getAssetUrl('assets/swyomIMG.png'),
  codeSnippet: `class Developer {
  name = 'P Swyom Sanjog';
  role = 'Mobile App Developer';
  stack = 'React Native & Expo';
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
    "Mobile App Developer and Computer Science & Engineering undergraduate (B.Tech) specializing in Android and iOS cross-platform app development with React Native, Expo, and JavaScript. Designed and delivered three end-to-end client applications: food pre-ordering with meal subscriptions, shop billing with emailed receipts, and a gym workout habit tracker using React Native, Expo, and Supabase. Completed internships in mobile app development at CodSoft and web development at YHills. Skilled in REST API integration, Supabase, Firebase, and PostgreSQL backends, Django, and Figma-to-UI implementation.",
  features: [
    {
      title: "Mobile First",
      desc: "Cross-platform React Native & Expo apps with fluid UI, 60fps performance & native device integrations.",
      icon: "Monitor",
    },
    {
      title: "Backend & APIs",
      desc: "Robust API integrations and scalable backends with Django, REST APIs, Supabase, and PostgreSQL.",
      icon: "Code2",
    },
    {
      title: "Client Solutions",
      desc: "Delivered production mobile apps for freelance clients across food, retail, and fitness industries.",
      icon: "Zap",
    },
    {
      title: "Hackathon Driven",
      desc: "Top 6 finish at GIFT College Hackathon, BPUT HSE Safety app, and Google Arcade Top 30 ranking.",
      icon: "UserCheck",
    },
  ],
};

export const SERVICES_DATA: Service[] = [
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    shortDesc: 'High-performance cross-platform iOS & Android mobile applications using React Native.',
    fullDesc: 'Building production-ready mobile applications with React Native and Expo. Features fluid touch gestures, state management, push notifications, local storage, and smooth REST API backend integrations.',
    iconName: 'Smartphone',
    deliverables: ['React Native iOS & Android Apps', 'Expo Cross-Platform Builds', 'Offline Storage & Push Notifications', 'Smooth Mobile Navigation'],
    tools: ['React Native', 'Expo', 'JavaScript', 'TypeScript', 'Supabase'],
    timeline: '2-4 Weeks'
  },
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
    title: 'Web & API Development',
    shortDesc: 'Building fast, responsive web applications and REST APIs with modern tech stacks.',
    fullDesc: 'Frontend and full-stack web development using React, Next.js, Django, HTML5, CSS3, and Tailwind CSS. Focused on ultra-fast page load speeds, clean component architecture, and robust REST APIs.',
    iconName: 'Globe',
    deliverables: ['Responsive Web Applications', 'React & Next.js Frontend', 'REST API Architecture', 'Clean Component Systems'],
    tools: ['React', 'Next.js', 'Django', 'Tailwind CSS', 'PostgreSQL'],
    timeline: '2-3 Weeks'
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
  { name: 'React Native', category: 'Mobile', icon: 'reactnative', color: '#61DAFB', level: 95, yearsExp: '2+ yrs' },
  { name: 'Expo', category: 'Mobile', icon: 'expo', color: '#FFFFFF', level: 92, yearsExp: '2+ yrs' },
  { name: 'JavaScript', category: 'Frontend', icon: 'javascript', color: '#F7DF1E', level: 95, yearsExp: '3+ yrs' },
  { name: 'Python', category: 'Backend', icon: 'python', color: '#3776AB', level: 92, yearsExp: '2+ yrs' },
  { name: 'HTML5', category: 'Frontend', icon: 'html5', color: '#E34F26', level: 95, yearsExp: '3+ yrs' },
  { name: 'CSS3', category: 'Frontend', icon: 'css3', color: '#1572B6', level: 92, yearsExp: '3+ yrs' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwindcss', color: '#06B6D4', level: 94, yearsExp: '2+ yrs' },
  { name: 'React', category: 'Frontend', icon: 'react', color: '#61DAFB', level: 94, yearsExp: '3+ yrs' },
  { name: 'Django', category: 'Backend', icon: 'django', color: '#0C4B33', level: 88, yearsExp: '2+ yrs' },
  { name: 'FastAPI', category: 'Backend', icon: 'fastapi', color: '#009688', level: 90, yearsExp: '2+ yrs' },
  { name: 'PostgreSQL', category: 'Database', icon: 'postgresql', color: '#4169E1', level: 90, yearsExp: '2+ yrs' },
  { name: 'Supabase', category: 'BaaS', icon: 'supabase', color: '#3ECF8E', level: 90, yearsExp: '2+ yrs' },
  { name: 'Firebase', category: 'BaaS', icon: 'firebase', color: '#FFCA28', level: 88, yearsExp: '2+ yrs' },
  { name: 'Node.js', category: 'Backend', icon: 'nodejs', color: '#339933', level: 88, yearsExp: '2+ yrs' },
  { name: 'Git & GitHub', category: 'Tools', icon: 'git', color: '#F05032', level: 92, yearsExp: '3+ yrs' },
  { name: 'VS Code', category: 'Tools', icon: 'vscode', color: '#007ACC', level: 96, yearsExp: '3+ yrs' },
  { name: 'Figma', category: 'Design', icon: 'figma', color: '#F24E1E', level: 88, yearsExp: '2+ yrs' }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'finverse-ai',
    title: 'Finverse AI – Smart Expense Tracker',
    category: 'Mobile Apps',
    description: 'A cross-platform personal finance mobile app featuring intelligent expense entry, categorization, budgeting, and interactive spending analytics.',
    longDescription: 'Built a cross-platform finance application with React Native featuring expense entry, categorization, monthly budgeting, and spending analysis screens. Integrated backend services through REST APIs to store and retrieve expense data behind a clean, user-focused interface.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'REST APIs', 'FinTech'],
    liveUrl: 'https://github.com/Swyom/Finverse-AI',
    githubUrl: 'https://github.com/Swyom/Finverse-AI',
    featured: true,
    metrics: [
      { label: 'Platform', value: 'Android & iOS' },
      { label: 'Syncing', value: 'Real-time' },
      { label: 'Budgeting', value: 'Automated' }
    ],
    features: [
      'Expense entry, tag categorization & recurring expense tracking',
      'Visual spending analytics and interactive monthly breakdown charts',
      'Budget limit warnings and financial milestone tracking',
      'REST API integration for secure real-time transaction syncing'
    ]
  },
  {
    id: 'smart-agriculture',
    title: 'Smart Agriculture App',
    category: 'Mobile Apps',
    description: 'An agricultural advisory mobile application delivering real-time weather alerts, crop monitoring, and agricultural data to farmers.',
    longDescription: 'Built an app delivering real-time agricultural data to farmers, combining live API data with secure Supabase storage. Designed a farmer-friendly UI with clear layouts and simple navigation for users with limited technical experience.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'Supabase', 'REST APIs', 'AgriTech'],
    liveUrl: 'https://github.com/Swyom/Smart-Agriculture-App',
    githubUrl: 'https://github.com/Swyom/Smart-Agriculture-App',
    featured: true,
    metrics: [
      { label: 'Target', value: 'Farmers' },
      { label: 'Data', value: 'Real-time' },
      { label: 'Database', value: 'Supabase' }
    ],
    features: [
      'Real-time agricultural data and crop monitoring guidance',
      'Live weather forecast and seasonal advisory broadcasts',
      'Secure Supabase storage for farm records and user profiles',
      'Accessible, farmer-friendly navigation designed for high readability'
    ]
  },
  {
    id: 'hse-safety-app',
    title: 'HSE Safety App – BPUT Hackathon',
    category: 'Mobile Apps',
    description: 'A workplace safety mobile app built for the BPUT Hackathon featuring rapid incident reporting, in-app safety guidelines, and emergency flows.',
    longDescription: 'Built a workplace safety app with incident reporting, in-app safety guidelines, and quick reporting flows for field workers. Engineered under time constraints during the BPUT Hackathon with real-time reporting workflows.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'Hackathon', 'Field Safety'],
    liveUrl: 'https://github.com/Swyom/Human-Safety-App',
    githubUrl: 'https://github.com/Swyom/Human-Safety-App',
    featured: true,
    metrics: [
      { label: 'Event', value: 'BPUT Hackathon' },
      { label: 'SOS Alert', value: 'Instant' },
      { label: 'Reporting', value: 'Real-time' }
    ],
    features: [
      'Instant incident reporting and danger hazard escalation',
      'In-app industrial health, safety & environment guidelines',
      'Quick one-tap emergency flows for field workers in high-risk zones',
      'High-contrast accessible dark interface optimized for rapid response'
    ]
  },
  {
    id: 'food-pre-ordering',
    title: 'Food Pre-Ordering & Meal Subscription App',
    category: 'Mobile Apps',
    description: 'A freelance mobile app allowing customers to pre-book meals for designated pickup time slots and subscribe to recurring daily meal plans.',
    longDescription: 'Designed and built an app for a freelance client that lets customers pre-book meals for a chosen pickup time slot and subscribe to recurring daily meal plans, ensuring orders reach the kitchen well before pickup.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'Supabase', 'Client Project'],
    liveUrl: 'https://github.com/Swyom/FoodDeliveryApp',
    githubUrl: 'https://github.com/Swyom/FoodDeliveryApp',
    featured: true,
    metrics: [
      { label: 'Order Flow', value: 'Pre-book' },
      { label: 'Subscriptions', value: 'Daily/Weekly' },
      { label: 'Client App', value: 'Freelance' }
    ],
    features: [
      'Pre-booking meals for selected pickup slots with zero kitchen wait times',
      'Recurring daily and weekly meal subscription plan management',
      'Supabase backend integration for real-time menu and order persistence',
      'Interactive food catalog with dietary and allergen details'
    ]
  },
  {
    id: 'digital-shop-billing',
    title: 'Digital Shop Billing App',
    category: 'Mobile Apps',
    description: 'A mobile billing app where shop staff add items, auto-generate invoices, and email digital receipts directly to customers, replacing paper bills.',
    longDescription: 'Developed a production app for a freelance client where staff quickly add items, auto-generate itemized bills, and email digital receipts to customers, completely replacing manual paper billing.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'Supabase', 'Client Project'],
    liveUrl: 'https://github.com/Swyom',
    githubUrl: 'https://github.com/Swyom',
    featured: false,
    metrics: [
      { label: 'Receipts', value: 'Emailed PDF' },
      { label: 'Paper Saved', value: '100%' },
      { label: 'Billing Speed', value: 'Instant' }
    ],
    features: [
      'Quick item catalog entry and automated subtotal/tax calculation',
      'Instant digital receipt generation with automated customer emailing',
      'Cloud storage of transaction logs via Supabase for daily sales auditing',
      'Lightweight mobile interface optimized for fast checkout counters'
    ]
  },
  {
    id: 'abhyas',
    title: 'Abhyas – Daily Gym Workout Habit Tracker',
    category: 'Mobile Apps',
    description: 'A mobile workout logging and habit tracking application designed for logging daily gym workouts and tracking fitness consistency over time.',
    longDescription: 'Built an app for logging daily gym workouts and tracking consistency over time. Features daily habit tracking, streak monitoring, smart reminders, and comprehensive analytics to empower users to build discipline through small, daily actions.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'Supabase', 'Client Project'],
    liveUrl: 'https://github.com/Swyom/Abhyas',
    githubUrl: 'https://github.com/Swyom/Abhyas',
    featured: false,
    metrics: [
      { label: 'Consistency', value: 'Streak System' },
      { label: 'Log Speed', value: '< 2s' },
      { label: 'Analytics', value: 'Real-time' }
    ],
    features: [
      'Daily gym workout logging and customizable exercise sets',
      'Streak tracking engine with daily motivational check-in reminders',
      'Visual progress analytics and monthly gym attendance charts',
      'Intuitive dark mode UI engineered to eliminate distraction'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    quote: "P. Swyom Sanjog is a remarkably dedicated developer. His work on cross-platform mobile apps and backend API design demonstrates high technical clarity and strong problem-solving skills.",
    author: "Hackathon Mentor",
    role: "Lead Architect",
    company: "Tech Innovation Sprint",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: '2',
    quote: "Swyom's ability to turn an idea into a working mobile prototype rapidly during hackathons and freelance sprints is incredible. Clean code, great UI, and high execution speed.",
    author: "Client & Collaborator",
    role: "Product Owner",
    company: "Freelance Client Project",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: '3',
    quote: "Abhyas and Finverse AI are prime examples of Swyom's commitment to building practical, everyday solutions. Smooth performance, great user experience!",
    author: "Peer Reviewer",
    role: "Software Developer",
    company: "BTech Tech Forum",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: 'cert-codsoft',
    title: 'Mobile App Development Internship',
    issuer: 'CodSoft',
    issueDate: 'Aug 2025',
    credentialId: 'CODSOFT-MOBILE-2025',
    image: getAssetUrl('assets/android-internship.webp'),
    skills: ['React Native', 'Expo', 'Mobile UI/UX', 'REST API Integration'],
    featured: true
  },
  {
    id: 'cert-yhills',
    title: 'Web Development Internship',
    issuer: 'YHills',
    issueDate: 'Jul 2025',
    credentialId: 'YHILLS-WEB-2025',
    image: getAssetUrl('assets/webdev-internship.webp'),
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    featured: true
  },
  {
    id: 'cert-gift-hackathon',
    title: 'Top 6 Team Finish — GIFT College Hackathon',
    issuer: 'GIFT College Tech Summit',
    issueDate: '2025',
    credentialId: 'GIFT-HACK-TOP6',
    image: getAssetUrl('assets/festronix-hackathon.webp'),
    skills: ['Rapid Prototyping', 'React Native', 'Mobile Innovation', 'Problem Solving'],
    featured: true
  },
  {
    id: 'cert-google-arcade',
    title: 'Top 30 Finish — Google Arcade Program',
    issuer: 'Google Cloud / Google Arcade',
    issueDate: '2024',
    credentialId: 'GOOGLE-ARCADE-TOP30',
    image: getAssetUrl('assets/GEN AI certificate.png'),
    skills: ['Cloud Computing', 'Google Cloud', 'Problem Solving'],
    featured: true
  },
  {
    id: 'cert-chaicode',
    title: 'Mobile Dev Cohort Certification',
    issuer: 'Chai aur Code',
    issueDate: '2025',
    credentialId: 'CHAICODE-MOBILE-COHORT',
    image: getAssetUrl('assets/big-data-integration.webp'),
    skills: ['React Native', 'Mobile Architecture', 'JavaScript (ES6+)'],
    featured: true
  },
  {
    id: 'cert-genai',
    title: 'Generative AI Certification',
    issuer: 'GenAI & Artificial Intelligence',
    issueDate: '2024',
    credentialId: 'GEN-AI-2024',
    image: getAssetUrl('assets/GEN AI certificate.png'),
    skills: ['Generative AI', 'Prompt Engineering', 'AI Solutions', 'LLMs'],
    featured: true
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'building-react-native-apps',
    title: 'Building Cross-Platform Mobile Apps with React Native & Expo',
    excerpt: 'Key architectural insights, state management patterns, and performance optimizations for shipping production-ready mobile applications.',
    content: `Building mobile applications with React Native and Expo has evolved significantly. In this article, I share my experience building habit tracking and productivity apps like Abhyas and Finverse AI.

### Key Topics Covered:
1. **Component Architecture**: Organizing UI components into reusable atomic blocks.
2. **State Management**: Choosing between Context API and lightweight state handling.
3. **Performance Optimization**: Reducing JS bridge overhead and optimizing image loading.
4. **Native APIs Integration**: Handling push notifications and local storage smoothly.

By focusing on clean component separation and efficient state hooks, cross-platform apps can feel just as responsive as native Swift and Kotlin applications.`,
    coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80',
    date: 'Jul 15, 2025',
    readTime: '5 min read',
    category: 'Mobile Apps',
    tags: ['React Native', 'Expo', 'Mobile Dev', 'Architecture'],
    featured: true
  },
  {
    id: 'fastapi-high-performance-backend',
    title: 'Connecting React Native Frontends to High-Performance REST APIs',
    excerpt: 'How async endpoints, structured serialization, and database pooling deliver sub-50ms response times for mobile apps.',
    content: `Mobile applications demand fast, predictable API responses. Integrating React Native with well-structured REST APIs and databases like Supabase and PostgreSQL provides high throughput and rock-solid reliability.

### Core Highlights:
- **Async API Requests**: Non-blocking network queries for snappy app performance.
- **Data Caching**: Offline-first storage and optimistic UI updates.
- **Strict Data Validation**: Consistent schema validation between client and server.
- **Database Indexing**: Optimizing query speeds for real-time mobile feeds.`,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    date: 'Jun 28, 2025',
    readTime: '6 min read',
    category: 'Backend',
    tags: ['REST APIs', 'Supabase', 'PostgreSQL', 'Mobile'],
    featured: true
  },
  {
    id: 'designing-habit-tracker-ux',
    title: 'Designing Abhyas: Lessons in Mobile Habit Tracking & UI/UX Consistency',
    excerpt: 'Designing dark-mode first mobile interfaces that promote daily user engagement and habit discipline.',
    content: `Designing an app for daily habit consistency requires removing friction at every single step. In Abhyas, the goal was to make logging a workout take less than 2 seconds.

### UX Design Decisions:
- **Single-Tap Actions**: One-click check-ins directly from the home feed.
- **Visual Micro-Feedback**: Gratifying checkmark animations and streak counters.
- **Minimalist Dark Aesthetics**: Reduced eye strain during late-night and morning habit tracking.

Great user experience isn't about adding features; it's about eliminating friction so users focus on what matters most.`,
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    date: 'May 10, 2025',
    readTime: '4 min read',
    category: 'Mobile Apps',
    tags: ['UI/UX', 'Mobile Design', 'React Native', 'Tailwind CSS'],
    featured: true
  }
];

export const CONTACT_INFO = {
  name: "P Swyom Sanjog",
  email: "pswayamsanjog0@gmail.com",
  phone: "+91 8018072417",
  whatsapp: "+91 8018072417",
  whatsappUrl: "https://wa.me/918018072417",
  location: "Odisha, India",
  availability: "Open for full-time roles, internships & freelance projects"
};
