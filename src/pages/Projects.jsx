import { useState, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GitHub, 
  OpenInNew, 
  Code, 
  Check, 
  AccountBalance, 
  SportsEsports, 
  LocalPharmacy, 
  TaskAlt, 
  Psychology, 
  VerifiedUser, 
  Layers
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { projects } = portfolioData

const ProjectCard = forwardRef(function ProjectCard({ project }, ref) {
  const accentColor = project.color || '#00f2ff'

  const getProjectIcon = (id) => {
    switch (id) {
      case 1: return <LocalPharmacy fontSize="inherit" style={{ color: '#00ff88' }} />
      case 2: return <TaskAlt fontSize="inherit" style={{ color: '#00f2ff' }} />
      case 3: return <AccountBalance fontSize="inherit" style={{ color: '#ff00f7' }} />
      case 4: return <SportsEsports fontSize="inherit" style={{ color: '#ffe600' }} />
      default: return <Code fontSize="inherit" style={{ color: accentColor }} />
    }
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{
        y: -6,
        borderColor: `${accentColor}40`,
        boxShadow: `0 20px 40px -20px ${accentColor}25`
      }}
      className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 ring-1 ring-white/5 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl bg-white/[0.015] flex flex-col justify-between shadow-2xl h-[490px] sm:h-[510px]"
    >
      {/* Top Accent Gradient Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Subtle Background Glow */}
      <div
        className="absolute -right-20 -top-20 w-48 h-48 rounded-full opacity-10 blur-[90px] pointer-events-none group-hover:opacity-30 transition-opacity duration-700"
        style={{ backgroundColor: accentColor }}
      />

      {/* Fixed Card Header */}
      <div className="shrink-0">
        {/* Category Pill & GitHub Direct Link */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span 
              className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm"
              style={{ 
                color: accentColor, 
                backgroundColor: `${accentColor}15`, 
                borderColor: `${accentColor}40` 
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              {project.category}
            </span>
          </div>

          {/* GitHub Direct Link */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 shrink-0 bg-white/[0.02] shadow-sm"
            title="View Source on GitHub"
          >
            <GitHub className="text-sm" />
          </motion.a>
        </div>

        {/* Project Icon & Title */}
        <div className="flex items-start gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center border text-lg group-hover:scale-105 transition-transform duration-300 shrink-0 shadow-lg mt-0.5"
            style={{ 
              borderColor: `${accentColor}35`,
              backgroundColor: `${accentColor}15`
            }}
          >
            {getProjectIcon(project.id)}
          </div>

          <div className="min-w-0 flex-1">
            <h5 className="font-heading font-black text-sm sm:text-base text-white tracking-wide leading-snug group-hover:text-white/95 transition-colors">
              {project.title}
            </h5>
          </div>
        </div>
      </div>

      {/* Scrollable Middle Content Body with custom scrollbar */}
      <div className="flex-1 overflow-y-auto pr-1.5 my-2 custom-card-scrollbar space-y-4">
        {/* Description */}
        <p className="text-white/80 font-body text-xs leading-relaxed pl-3 border-l-2" style={{ borderColor: `${accentColor}50` }}>
          {project.description}
        </p>

        {/* Key Features directly inside card */}
        {project.features && project.features.length > 0 && (
          <div>
            <h4 className="font-heading font-bold text-[10px] uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5 sticky top-0 bg-[#040810]/90 backdrop-blur-md py-1 z-10">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              Key Features
            </h4>
            <div className="space-y-1.5">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2 text-[11px] text-white/80 font-body leading-relaxed bg-white/[0.02] border border-white/[0.04] p-2 rounded-xl"
                >
                  <Check 
                    className="flex-shrink-0 mt-0.5 text-xs" 
                    fontSize="inherit" 
                    style={{ color: accentColor }} 
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div>
          <h4 className="font-heading font-bold text-[10px] uppercase tracking-wider text-white/60 mb-1.5">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border border-white/10 text-white/80 bg-white/[0.02] hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Card Action Button: Direct Source Repository */}
      <div className="border-t border-white/5 pt-3.5 mt-auto shrink-0">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="w-full py-2.5 px-3 rounded-xl border border-white/10 hover:border-white/25 text-xs font-mono font-bold text-white/80 hover:text-white transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.08] flex items-center justify-center gap-2 shadow-sm group/btn"
        >
          <GitHub fontSize="small" className="group-hover/btn:scale-110 transition-transform" />
          <span>View Repository</span>
          <OpenInNew fontSize="small" className="scale-75 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
        </a>
      </div>
    </motion.div>
  )
})

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  // Filter Categories
  const filterOptions = [
    { label: 'All Projects', value: 'All' },
    { label: 'Microservices & Full Stack', value: 'FullStack' },
    { label: 'Java Applications', value: 'Java' }
  ]

  const filteredProjects = activeFilter === 'All'
    ? projects
    : activeFilter === 'FullStack'
    ? projects.filter(p => p.category.includes('Microservices') || p.category.includes('Full Stack'))
    : projects.filter(p => p.category.includes('Java'))

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader
          tag="Featured Engineering"
          title="Projects & Architectures"
          subtitle="Production-ready web applications, responsive frontend interfaces, and scalable full-stack systems engineered with React.js, Tailwind CSS, and robust backend services."
        />

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 sm:mb-16">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-5 py-2.5 text-xs font-mono font-bold tracking-normal uppercase rounded-full transition-all duration-300 border ${
                activeFilter === opt.value
                  ? 'text-white border-primary/50 bg-primary/15 shadow-[0_0_20px_rgba(0,212,255,0.2)]'
                  : 'text-white/50 border-white/10 hover:text-white hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Projects 4-Column Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Development Philosophy / Engineering Principles */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 sm:p-8 md:p-10 mb-16 rounded-3xl border border-white/15 bg-white/[0.02] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff]/60 to-transparent" />
          
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide mb-1">
              Engineering Principles
            </h3>
            <p className="text-cyan-300/90 font-mono text-xs sm:text-sm font-semibold uppercase">
              Core Technical Standards Applied Across Every Application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Psychology fontSize="inherit" />,
                title: 'User-Centric UI/UX',
                color: '#00f2ff',
                desc: 'Designing intuitive, accessible, and high-performance interfaces with micro-interactions and smooth responsiveness.'
              },
              {
                icon: <Layers fontSize="inherit" />,
                title: 'Modular Architecture',
                color: '#00ff88',
                desc: 'Component-driven frontend design, reusable state management patterns, and decoupled microservices backend logic.'
              },
              {
                icon: <VerifiedUser fontSize="inherit" />,
                title: 'Code Quality & Robustness',
                color: '#ffe600',
                desc: 'Strict adherence to clean code, secure RESTful API integrations, rigorous error handling, and cross-browser testing.'
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white/[0.02] hover:bg-white/[0.04] p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 shadow-md"
                    style={{ color: item.color, backgroundColor: `${item.color}15`, border: `1px solid ${item.color}35` }}
                  >
                    {item.icon}
                  </div>
                  <h4 className="font-heading font-black text-white text-base mb-2 tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-white/70 text-xs sm:text-sm font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
