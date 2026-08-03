// 1. Imports (Only define these ONCE at the top)
import cp1 from '../assets/projects/images/cafe-project/cp1.webp'
import cp2 from '../assets/projects/images/cafe-project/cp2.webp'
import cp3 from '../assets/projects/images/cafe-project/cp3.webp'

import ca1 from '../assets/projects/images/chat-app/ca1.webp'
import ca2 from '../assets/projects/images/chat-app/ca2.webp'

import co1 from '../assets/projects/images/crud-operation/co1.webp'
import co2 from '../assets/projects/images/crud-operation/co2.webp'
import co3 from '../assets/projects/images/crud-operation/co3.webp'

import pg1 from '../assets/projects/images/password-generator/pg1.webp'
import pg2 from '../assets/projects/images/password-generator/pg2.webp'
import pg3 from '../assets/projects/images/password-generator/pg3.webp'
import pg4 from '../assets/projects/images/password-generator/pg4.webp'

import pc1 from '../assets/projects/images/plutto/pc1.webp'
import pc2 from '../assets/projects/images/plutto/pc2.webp'
import pc3 from '../assets/projects/images/plutto/pc3.webp'
import pc4 from '../assets/projects/images/plutto/pc4.webp'
import pc5 from '../assets/projects/images/plutto/pc5.webp'
import pc6 from '../assets/projects/images/plutto/pc6.webp'
import pc7 from '../assets/projects/images/plutto/pc7.webp'
import pc8 from '../assets/projects/images/plutto/pc8.webp'
import pc9 from '../assets/projects/images/plutto/pc9.webp'

import su1 from '../assets/projects/images/sign-up-form/su1.webp'
import su2 from '../assets/projects/images/sign-up-form/su2.webp'
import su3 from '../assets/projects/images/sign-up-form/su3.webp'

import wa1 from '../assets/projects/images/weather-app/wa1.webp'
import wa2 from '../assets/projects/images/weather-app/wa2.webp'
import wa3 from '../assets/projects/images/weather-app/wa3.webp'
import wa4 from '../assets/projects/images/weather-app/wa4.webp'

import whc1 from '../assets/projects/images/website-health-checker/whc1.webp'
import whc2 from '../assets/projects/images/website-health-checker/whc2.webp'
import whc3 from '../assets/projects/images/website-health-checker/whc3.webp'
import whc4 from '../assets/projects/images/website-health-checker/whc4.webp'

// 2. Projects Data
// tags array drives the Frontend/Backend filter tabs.
// All projects appear in Full Stack. Additionally tagged projects
// appear in Frontend or Backend tabs respectively.
export const projects = [
  {
    id: 1, category: 'fullstack', tags: ['fullstack', 'backend'],
    title: 'Website Health Checker',
    desc: 'Audits any business website for SEO, SSL, mobile readiness and missed opportunities.',
    stack: ['React', 'Node.js', 'Express', 'Cheerio', 'Axios'],
    images: [whc1, whc2, whc3, whc4],
    github: 'https://github.com/haseebcodess',
    demo: 'https://websitehealthchecker.netlify.app',
    linkedin: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',
  },
  {
    id: 2, category: 'fullstack', tags: ['fullstack', 'backend'],
    title: 'Full-Stack CRUD App',
    desc: 'Complete data lifecycle — GET, POST, PUT, DELETE. MongoDB schema from scratch, MVC backend.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Axios', 'Postman'],
    images: [co1, co2, co3],
    github: 'https://github.com/haseebcodess/crud-operation',
    demo: null,
    linkedin: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',
  },
  {
    id: 3, category: 'fullstack', tags: ['fullstack', 'frontend'],
    title: 'Pluto Coffee & Art',
    desc: 'Live client project for a real café in DHA Y-Block, Lahore. Dark luxury UI with glassmorphism.',
    stack: ['React', 'Node.js', 'Express', 'CSS3'],
    images: [pc1, pc2, pc3, pc4, pc5, pc6, pc7, pc8, pc9],
    github: 'https://github.com/haseebcodess',
    demo: null,
    linkedin: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',
  },
  {
    id: 4, category: 'fullstack', tags: ['fullstack', 'backend'],
    title: 'Real-Time Chat App',
    desc: 'Live bidirectional messaging with Socket.io. Room-based chat, real-time event broadcasting.',
    stack: ['Node.js', 'Socket.io', 'Express', 'React'],
    images: [ca1, ca2],
    github: 'https://github.com/haseebcodess',
    demo: 'https://openchat-live.vercel.app',
    linkedin: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',
  },
  {
    id: 5, category: 'fullstack', tags: ['fullstack', 'frontend'],
    title: 'RJ Cafe Website',
    desc: 'Complete restaurant website with dynamic JS menu — no page reloads.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    images: [cp1, cp2, cp3],
    github: 'https://github.com/haseebcodess/cafe',
    demo: 'https://rjcafe.netlify.app',
    linkedin: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',
  },
  {
    id: 6, category: 'fullstack', tags: ['fullstack', 'frontend'],
    title: 'Weather Application',
    desc: 'Real-time weather from OpenWeatherMap API. Light/dark mode toggle.',
    stack: ['React', 'Axios', 'OpenWeather API', 'CSS3'],
    images: [wa1, wa2, wa3, wa4],
    github: 'https://github.com/haseebcodess/weather-app',
    demo: 'https://haseeb-weather-app.netlify.app',
    linkedin: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',
  },
  {
    id: 7, category: 'fullstack', tags: ['fullstack', 'frontend'],
    title: 'Password Generator',
    desc: 'Configurable password generator with one-click clipboard copy using the Clipboard API.',
    stack: ['React', 'Vite', 'React Hooks', 'Clipboard API'],
    images: [pg1, pg2, pg3, pg4],
    github: 'https://github.com/haseebcodess/Random-Password-Generator',
    demo: 'https://rjpasswordchanger.netlify.app',
    linkedin: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',
  },
  {
    id: 8, category: 'fullstack', tags: ['fullstack', 'backend'],
    title: 'Sign Up Form API',
    desc: 'RESTful Node/Express backend with POST and GET endpoints for user registration.',
    stack: ['Node.js', 'Express', 'Axios', 'REST API'],
    images: [su1, su2, su3],
    github: 'https://github.com/haseebcodess/react-backend',
    demo: null,
    linkedin: 'https://linkedin.com/in/muhammad-haseeb-ur-rehman',
  }
];

// 3. Skills Data
export const skills = {
  proficient: [
    { name: 'HTML5', icon: 'H5', iconBg: '#FFF3E0', iconColor: '#E44D26' },
    { name: 'CSS3', icon: 'C3', iconBg: '#E3F2FD', iconColor: '#1572B6' },
    { name: 'JavaScript', icon: 'JS', iconBg: '#FFFDE7', iconColor: '#9A7500' },
    { name: 'React.js', icon: 'Re', iconBg: '#E3F2FD', iconColor: '#0088CC' },
    { name: 'Node.js', icon: 'No', iconBg: '#E8F5E9', iconColor: '#339933' },
    { name: 'Express.js', icon: 'Ex', iconBg: '#F3F3F3', iconColor: '#555555' },
    { name: 'MongoDB', icon: 'Mg', iconBg: '#E8F5E9', iconColor: '#47A248' },
    { name: 'REST APIs', icon: 'AP', iconBg: '#EDE7F6', iconColor: '#7C3AED' },
    { name: 'Git', icon: 'Gt', iconBg: '#FFF3E0', iconColor: '#F05032' },
    { name: 'GitHub', icon: 'Gh', iconBg: '#E8E8E8', iconColor: '#333333' },
    { name: 'Postman', icon: 'Po', iconBg: '#FFF0E6', iconColor: '#FF6C37' },
    { name: 'Bootstrap', icon: 'Bs', iconBg: '#EEF0FF', iconColor: '#7952B3' },
    { name: 'Axios', icon: 'Ax', iconBg: '#E3F2FD', iconColor: '#1A56DB' },
  ],
  familiar: [
    { name: 'Socket.io', icon: 'SK', iconBg: '#F0F0F0', iconColor: '#333333' },
    { name: 'Vite', icon: 'Vi', iconBg: '#EEF0FF', iconColor: '#646CFF' },
    { name: 'MVC Pattern', icon: 'MV', iconBg: '#E3F2FD', iconColor: '#1A56DB' },
    { name: 'Netlify', icon: 'Nl', iconBg: '#E8F5E9', iconColor: '#00AD9F' },
  ],
  learning: [
    { name: 'TypeScript', icon: 'Ts', iconBg: '#E3F2FD', iconColor: '#3178C6' },
    { name: 'Next.js', icon: 'Nx', iconBg: '#F0F0F0', iconColor: '#333333' },
    { name: 'Docker', icon: 'Dk', iconBg: '#E3F2FD', iconColor: '#2496ED' },
    { name: 'PostgreSQL', icon: 'Pg', iconBg: '#E8F5E9', iconColor: '#336791' },
    { name: 'AWS', icon: 'AW', iconBg: '#FFF3E0', iconColor: '#FF9900' },
  ],
};

// 4. Other Metadata
export const education = [
  { degree: 'BS Computer Science', inst: 'University of the Punjab, Lahore', year: '2025 – 2029' },
  { degree: 'Intermediate — ICS (Physics)', inst: 'Govt M.A.O College, Lahore', year: '2025' },
  { degree: 'Matriculation — General Science', inst: 'Govt. Central Model School, Samnabad', year: '2023' },
  { degree: 'Web Development Certificate', inst: 'Peak Solution, Lahore', year: 'Aug 2023' },
];

export const proficiency = [
  { label: 'React.js', pct: 82 },
  { label: 'JavaScript ES6+', pct: 80 },
  { label: 'HTML5 / CSS3', pct: 88 },
  { label: 'Node.js / Express', pct: 68 },
  { label: 'MongoDB', pct: 62 },
];