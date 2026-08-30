import { useState, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarToday, 
  Stars, 
  BusinessCenter
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { experience } = portfolioData

const ExperienceCard = forwardRef(function ExperienceCard({ item }, ref) {
  const NodeIcon = item.type === 'Professional' ? BusinessCenter : Stars

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
        borderColor: `${item.color}40`,
        boxShadow: `0 20px 40px -20px ${item.color}25`
      }}
      className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 ring-1 ring-white/5 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl bg-white/[0.015] flex flex-col justify-between shadow-2xl h-[490px] sm:h-[510px]"
    >
      {/* Top Accent Gradient Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
      />

      {/* Subtle Background Radial Glow */}
      <div
        className="absolute -right-20 -top-20 w-44 h-44 rounded-full opacity-10 blur-[80px] pointer-events-none group-hover:opacity-25 transition-opacity duration-700"
        style={{ backgroundColor: item.color }}
      />

      {/* Fixed Card Header */}
      <div className="shrink-0">
        {/* Badges & Period */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/5">
          <span
            className="px-2.5 py-1 rounded-full font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider border shadow-sm"
            style={{
              background: `${item.color}15`,
              color: item.color,
              borderColor: `${item.color}40`,
            }}
          >
            {item.type}
          </span>

          <div className="flex items-center gap-1.5 text-white/80 font-mono text-[11px] sm:text-xs bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/5">
            <CalendarToday className="text-[12px]" style={{ color: item.color }} />
            <span className="font-semibold">{item.period}</span>
          </div>
        </div>

        {/* Role & Company Header */}
        <div className="flex items-start gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center border text-lg group-hover:scale-105 transition-transform duration-300 shrink-0 shadow-lg mt-0.5"
            style={{ 
              color: item.color, 
              backgroundColor: `${item.color}15`, 
              borderColor: `${item.color}35` 
            }}
          >
            <NodeIcon fontSize="inherit" />
          </div>

          <div className="min-w-0 flex-1">
            <h5 className="font-heading font-black text-sm sm:text-base text-white tracking-wide leading-snug group-hover:text-white/95 transition-colors">
              {item.role}
            </h5>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-white/40 font-heading text-[11px]">at</span>
              <span className="font-heading text-xs sm:text-[13px] font-black tracking-normal uppercase" style={{ color: item.color }}>
                {item.company}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Middle Content Body with custom scrollbar */}
      <div className="flex-1 overflow-y-auto pr-1.5 my-2 custom-card-scrollbar space-y-4">
        {/* Description Paragraph */}
        <p className="text-white/80 font-body text-xs leading-relaxed pl-3 border-l-2" style={{ borderColor: `${item.color}50` }}>
          {item.description}
        </p>

        {/* Key Achievements & Highlights */}
        {item.points && item.points.length > 0 && (
          <div>
            <h4 className="font-heading font-bold text-[10px] uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5 sticky top-0 bg-[#040810]/90 backdrop-blur-md py-1 z-10">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              Key Highlights & Contributions
            </h4>
            <div className="space-y-1.5">
              {item.points.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-[11px] text-white/80 font-body leading-relaxed bg-white/[0.02] border border-white/[0.04] p-2 rounded-xl"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Tag Pills */}
        {item.technologies && item.technologies.length > 0 && (
          <div>
            <h4 className="font-heading font-bold text-[10px] uppercase tracking-wider text-white/60 mb-1.5">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border border-white/10 text-white/80 bg-white/[0.02] hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      <div className="border-t border-white/5 pt-3 mt-auto shrink-0 flex items-center justify-between text-xs font-mono text-white/50">
        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
          {item.type === 'Professional' ? 'Full-Time Role' : 'Internship Term'}
        </span>
        <span className="text-[10px] sm:text-[11px] text-white/40">{item.period.split('–')[0].trim()}</span>
      </div>
    </motion.div>
  )
})

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState('All')

  // Filter criteria options
  const filterOptions = [
    { label: 'All Experience', value: 'All' },
    { label: 'Professional', value: 'Professional' },
    { label: 'Internships', value: 'Internship' }
  ]

  const filteredExperience = activeFilter === 'All'
    ? experience
    : experience.filter(item => item.type === activeFilter)

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader
          tag="Work History"
          title="Professional Journey"
          subtitle="A comprehensive record of my engineering roles, enterprise frontend architectures, and professional internships."
        />

        {/* Filter Navigation Bar */}
        <div className="flex items-center justify-center gap-3 mb-12 sm:mb-16">
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

        {/* Experience 4-Column Responsive Grid */}
        <div className="mb-16 sm:mb-20">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredExperience.map((item) => (
                <ExperienceCard 
                  key={item.id} 
                  item={item} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
