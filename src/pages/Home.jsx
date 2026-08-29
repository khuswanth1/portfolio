import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import {
  GitHub,
  LinkedIn,
  ArrowForward,
  FileDownload,
  Person,
  Bolt,
  BusinessCenter,
  RocketLaunch,
  EmojiEvents,
  Send,
  Stars,
  Palette,
  Code,
  Layers,
  TrendingUp
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import { portfolioData } from '../data'
import profileImg from '../assets/Khuswanth.png'
import resume from '../assets/Khuswanth_Rao.pdf'

const { personal } = portfolioData

const containerVariants = {
  animate: { transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function Home() {
  return (
    <PageWrapper>
      {/* 1. Hero Section (Transparent background, refined smaller typography) */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Content (Text & CTAs) */}
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
            >
              {/* Role Badge - Clean Transparent */}
              <motion.div variants={itemVariants} className="mb-3 sm:mb-4 flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold tracking-wide px-3.5 py-1 rounded-full border border-[#00f2ff]/40 text-[#00f2ff]">
                  &lt; React Developer & UI/UX Designer /&gt;
                </span>
              </motion.div>

              {/* Name - Reduced Font Size */}
              <motion.div
                variants={itemVariants}
                className="mb-3 sm:mb-4"
              >
                <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[50px] tracking-tight leading-tight text-white">
                  {personal.name}
                </h1>
              </motion.div>

              {/* Specialization with Typewriter - Reduced Font Size */}
              <motion.div variants={itemVariants} className="mb-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1.5">
                  <div className="h-px w-6 bg-[#00f2ff]/40" />
                  <span className="font-mono text-[#00f2ff]/90 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Engineering Focus</span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold tracking-wide text-white leading-snug min-h-[2.5rem] sm:min-h-[2rem]">
                  Architecting{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#00ff88] to-[#00d4ff] font-extrabold">
                    <TypeAnimation
                      sequence={[
                        'Responsive React Web Apps',
                        2500,
                        'Intuitive UI/UX Design Systems',
                        2500,
                        'Mobile Apps with React Native',
                        2500,
                        'Scalable Full-Stack Systems',
                        2500,
                        'High-Performance Frontend UIs',
                        2500
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </span>
                </h2>
              </motion.div>

              {/* Short Bio Paragraph - Reduced Font Size */}
              <motion.p 
                variants={itemVariants}
                className="text-white/75 font-body text-xs sm:text-[13px] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6 font-normal"
              >
                Associate Software Engineer specializing in building pixel-perfect, accessible, and high-performance user interfaces with React.js, Tailwind CSS, and modern JavaScript architectures.
              </motion.p>
              {/* CTA Action Buttons - Clean Transparent Borders without Heavy Solid Backgrounds */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                <Link to="/projects" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, borderColor: '#00f2ff', backgroundColor: 'rgba(0, 242, 255, 0.08)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 border border-[#00f2ff]/60 text-[#00f2ff] hover:text-white font-heading font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    <span>View Projects</span>
                    <ArrowForward sx={{ fontSize: 16 }} />
                  </motion.button>
                </Link>

                <a href={resume} download className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 border border-white/15 text-white font-heading font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                  >
                    <FileDownload sx={{ fontSize: 16 }} />
                    <span>Download CV</span>
                  </motion.button>
                </a>

              </motion.div>

              {/* Social Channels Bar - Clean Transparent */}
              <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3">
                <span className="text-white/40 font-mono text-[11px] font-bold uppercase mr-1">Find Me On</span>
                <motion.a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, borderColor: '#00f2ff' }}
                  className="w-9 h-9 border border-white/10 rounded-xl flex items-center justify-center text-[#00f2ff] hover:text-white transition-all"
                  title="GitHub Profile"
                >
                  <GitHub sx={{ fontSize: 18 }} /> 
                </motion.a>
                <motion.a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, borderColor: '#00f2ff' }}
                  className="w-9 h-9 border border-white/10 rounded-xl flex items-center justify-center text-[#00f2ff] hover:text-white transition-all"
                  title="LinkedIn Profile"
                >
                  <LinkedIn sx={{ fontSize: 18 }} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Content: Profile Image Card - Transparent without Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="relative z-10 w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px]">
                <div className="relative rounded-2xl overflow-hidden p-1.5 border border-white/10 group">
                  <div className="overflow-hidden rounded-xl relative">
                    <img
                      src={profileImg}
                      alt="Khuswanth Rao Jadav"
                      className="w-full h-auto rounded-xl block object-cover"
                    />
                  </div>

                  {/* Status Overlay Badge - Clean Transparent */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl border border-white/15 bg-black/60 backdrop-blur-md flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                    <span className="text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      Associate Engineer
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 2. Core Pillars: What I Bring & Growth Mindset (2 Cards with Animated Points) */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-[#00f2ff] font-mono text-[11px] font-bold tracking-widest uppercase block mb-1">
              Engineering Ethos
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide">
              Core Capabilities & Growth Mindset
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: What I Bring (Main container stays stationary) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-lg"
            >
              {/* Top Laser Accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, #00f2ff, transparent)',
                  boxShadow: '0 0 10px #00f2ff'
                }}
              />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3.5">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
                      transition={{ duration: 0.3 }}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-md cursor-pointer"
                      style={{ color: '#00f2ff', border: '1px solid #00f2ff35' }}
                    >
                      <Code fontSize="inherit" />
                    </motion.div>
                    <div>
                      <span className="text-[#00f2ff] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider block">
                        Core Strengths
                      </span>
                      <h4 className="font-heading font-black text-lg sm:text-xl text-white tracking-wide">
                        What I Bring
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Animated Interactive Sub-Cards */}
                <div className="space-y-3.5">
                  {[
                    {
                      label: "Frontend & Mobile Engineering",
                      desc: "Building responsive, high-performance web and mobile applications with React.js, React Native, Vite, and modern JavaScript (ES6+)."
                    },
                    {
                      label: "UI/UX & Design Systems",
                      desc: "Translating complex Figma wireframes and design mockups into pixel-perfect, accessible, and user-friendly interface components."
                    },
                    {
                      label: "Modular State & Styling",
                      desc: "Architecting component-driven design systems with Tailwind CSS, Context API state management, and micro-animations using Framer Motion."
                    },
                    {
                      label: "API & Version Control",
                      desc: "Seamless RESTful API integration, decoupled client-server architecture, and disciplined Git-based team version control workflows."
                    }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                      whileHover={{ x: 6, scale: 1.01, borderColor: 'rgba(0, 242, 255, 0.45)', backgroundColor: 'rgba(0, 242, 255, 0.03)' }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-start gap-3 p-3.5 rounded-2xl border border-white/5 transition-all duration-300 group/point cursor-pointer shadow-sm"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.25, ease: "easeInOut" }}
                        className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff] group-hover/point:scale-130 transition-transform" 
                      />
                      <p className="text-white/80 font-body text-xs sm:text-[13px] leading-relaxed">
                        <strong className="text-white font-bold font-heading">{item.label}:</strong>{' '}
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2: Growth Mindset (Main container stays stationary) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-lg"
            >
              {/* Top Laser Accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
                  boxShadow: '0 0 10px #00ff88'
                }}
              />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3.5">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
                      transition={{ duration: 0.3 }}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-md cursor-pointer"
                      style={{ color: '#00ff88', border: '1px solid #00ff8835' }}
                    >
                      <TrendingUp fontSize="inherit" />
                    </motion.div>
                    <div>
                      <span className="text-[#00ff88] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider block">
                        Continuous Evolution
                      </span>
                      <h4 className="font-heading font-black text-lg sm:text-xl text-white tracking-wide">
                        Growth Mindset
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Animated Interactive Sub-Cards */}
                <div className="space-y-3.5">
                  {[
                    {
                      label: "AI Tools & Modern Tooling",
                      desc: "Rapidly adopting modern frontend tooling, emerging design trends, and AI-assisted workflows (ChatGPT, GitHub Copilot) to accelerate delivery."
                    },
                    {
                      label: "Full-Stack Expansion",
                      desc: "Continuously exploring full-stack capabilities including Next.js, advanced TypeScript patterns, and cloud fundamentals."
                    },
                    {
                      label: "Agile Collaboration",
                      desc: "Thriving in Agile cross-functional team environments with proactive collaboration, constructive peer reviews, and clear communication."
                    },
                    {
                      label: "Engineering Rigor",
                      desc: "Deep dedication to clean code principles, performance optimization, accessibility standards, and relentless problem solving."
                    }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                      whileHover={{ x: 6, scale: 1.01, borderColor: 'rgba(0, 255, 136, 0.45)', backgroundColor: 'rgba(0, 255, 136, 0.03)' }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-start gap-3 p-3.5 rounded-2xl border border-white/5 transition-all duration-300 group/point cursor-pointer shadow-sm"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.25, ease: "easeInOut" }}
                        className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-[#00ff88] shadow-[0_0_10px_#00ff88] group-hover/point:scale-130 transition-transform" 
                      />
                      <p className="text-white/80 font-body text-xs sm:text-[13px] leading-relaxed">
                        <strong className="text-white font-bold font-heading">{item.label}:</strong>{' '}
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Explore Portfolio Navigation Matrix - Clean Side-by-Side Professional Layout */}
      <section className="py-8 pb-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <div className="h-px w-8 bg-[#00f2ff]/40" />
              <span className="font-mono text-[#00f2ff] text-[10px] sm:text-xs font-bold tracking-widest uppercase">Explore Portfolio</span>
              <div className="h-px w-8 bg-[#00f2ff]/40" />
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide">
              Detailed Portfolio Sections
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {[
              { path: '/about', label: 'About Me', desc: 'Background, education & vision', icon: <Person fontSize="inherit" />, color: '#00f2ff' },
              { path: '/skills', label: 'Technical Skills', desc: 'Frontend, React & tools matrix', icon: <Bolt fontSize="inherit" />, color: '#7b2fff' },
              { path: '/experience', label: 'Experience', desc: 'Enterprise roles & internships', icon: <BusinessCenter fontSize="inherit" />, color: '#00ff88' },
              { path: '/projects', label: 'Featured Projects', desc: 'Full-stack web & React apps', icon: <RocketLaunch fontSize="inherit" />, color: '#ffd700' },
              { path: '/certifications', label: 'Certifications', desc: 'Verified technical badges', icon: <EmojiEvents fontSize="inherit" />, color: '#ff00f7' },
              { path: '/contact', label: 'Let\'s Connect', desc: 'Direct message & social links', icon: <Send fontSize="inherit" />, color: '#00d4ff' }
            ].map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={item.path} className="block h-full">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.015, borderColor: `${item.color}65` }}
                    whileTap={{ scale: 0.99 }}
                    className="p-6 sm:p-7 rounded-3xl border border-white/10 transition-all duration-300 h-full flex items-center justify-between gap-4 group cursor-pointer relative overflow-hidden shadow-md"
                  >
                    {/* Left Accent Indicator on Hover */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}` }}
                    />

                    {/* Side-by-side Icon & Text */}
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0 flex-1 pl-1">
                      <div 
                        className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-[26px] shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md"
                        style={{ color: item.color, border: `1px solid ${item.color}35`, backgroundColor: `${item.color}0a` }}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-heading font-black text-base sm:text-lg text-white tracking-wide truncate group-hover:text-white transition-colors mb-0.5">
                          {item.label}
                        </h4>
                        <p className="text-white/65 text-xs sm:text-[13px] font-body leading-relaxed truncate group-hover:text-white/85 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right Arrow Action Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/30 transition-all shrink-0">
                      <ArrowForward sx={{ fontSize: 18 }} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
