import { useState, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarToday, 
  Stars, 
  BusinessCenter,
  OpenInNew
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { experience } = portfolioData

const ExperienceCard = forwardRef(function ExperienceCard({ item, onViewAchievements }, ref) {
  const NodeIcon = item.type === 'Professional' ? BusinessCenter : Stars

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        y: -6,
        borderColor: `${item.color}40`,
        boxShadow: `0 20px 40px -20px ${item.color}25`
      }}
      className="glass-card p-5 sm:p-6 lg:p-7 rounded-3xl border border-white/10 ring-1 ring-white/5 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl bg-white/[0.015] flex flex-col justify-between shadow-xl h-full"
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

      <div>
        {/* Header: Badges & Period */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span
              className="px-3 py-1 rounded-full font-mono text-[10px] font-extrabold tracking-normal border shadow-sm"
              style={{
                background: `${item.color}15`,
                color: item.color,
                borderColor: `${item.color}40`,
              }}
            >
              {item.type}
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/80 font-mono text-xs tracking-normal bg-white/[0.03] px-3 py-1 rounded-lg border border-white/5">
            <CalendarToday className="text-[13px]" style={{ color: item.color }} />
            <span className="font-semibold">{item.period}</span>
          </div>
        </div>

        {/* Role & Company Header */}
        <div className="flex items-start gap-4 mb-5">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center border text-xl group-hover:scale-105 transition-transform duration-300 shrink-0 shadow-lg mt-0.5"
            style={{ 
              color: item.color, 
              backgroundColor: `${item.color}15`, 
              borderColor: `${item.color}35` 
            }}
          >
            <NodeIcon />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight leading-snug group-hover:text-white/95 transition-colors">
              {item.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/40 font-heading text-xs">at</span>
              <span className="font-heading text-sm sm:text-base font-black tracking-normal uppercase" style={{ color: item.color }}>
                {item.company}
              </span>
            </div>
          </div>
        </div>

        {/* Description Paragraph */}
        <p className="text-white/70 text-xs sm:text-sm font-body leading-relaxed mb-6 pl-4 border-l-2" style={{ borderColor: `${item.color}50` }}>
          {item.description}
        </p>

        {/* Technologies Tag Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-[11px] font-mono font-semibold rounded-lg border border-white/10 text-white/75 bg-white/[0.02] hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* View Achievements Button */}
      {item.points && item.points.length > 0 && (
        <div className="border-t border-white/5 pt-5 mt-auto">
          <button
            onClick={onViewAchievements}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-normal hover:brightness-110 transition-all bg-white/[0.03] hover:bg-white/[0.07] px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 shadow-sm"
            style={{ color: item.color }}
          >
            <Stars className="text-sm" />
            <span>View </span>
            <OpenInNew className="scale-75 opacity-70 ml-0.5" />
          </button>
        </div>
      )}
    </motion.div>
  )
})

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedExperience, setSelectedExperience] = useState(null)

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

        {/* Experience Cards (3-Column Grid Layout) */}
        <div className="mb-16 sm:mb-20">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredExperience.map((item) => (
                <ExperienceCard 
                  key={item.id} 
                  item={item} 
                  onViewAchievements={() => setSelectedExperience(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Achievements Modal Popup Overlay */}
        <AnimatePresence>
          {selectedExperience && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              {/* Click outside to close */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                onClick={() => setSelectedExperience(null)}
              />

              {/* Modal Card Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto glass-card rounded-3xl border border-white/15 p-6 sm:p-8 z-10 bg-[#08090d]/98 shadow-[0_0_50px_rgba(0,212,255,0.15)] flex flex-col"
              >
                {/* Top Accent Gradient Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: selectedExperience.color }}
                />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 hover:border-white/25 flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/15 transition-all z-20 text-xs"
                >
                  ✕
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6 mt-2 pb-4 border-b border-white/10">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg shrink-0"
                    style={{
                      borderColor: `${selectedExperience.color}40`,
                      boxShadow: `0 0 20px ${selectedExperience.color}25`,
                      color: selectedExperience.color,
                      backgroundColor: `${selectedExperience.color}15`
                    }}
                  >
                    {selectedExperience.type === 'Professional' ? <BusinessCenter /> : <Stars />}
                  </div>
                  <div>
                    <span 
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-white/5 border-white/10"
                      style={{ color: selectedExperience.color }}
                    >
                      {selectedExperience.type}
                    </span>
                    <h3 className="font-heading font-black text-xl text-white mt-1">
                      {selectedExperience.role}
                    </h3>
                    <p className="text-white/65 font-mono text-xs tracking-normal mt-0.5">
                      {selectedExperience.company} ({selectedExperience.period})
                    </p>
                  </div>
                </div>

                {/* Body - Description & Achievements points */}
                <div className="space-y-5 overflow-y-auto pr-1">
                  <div>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-normal mb-2 text-white/80">Role Overview</h4>
                    <p className="text-white/75 font-body text-xs sm:text-sm leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                      {selectedExperience.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-normal mb-3 text-white/80">Key Achievements & Highlights</h4>
                    <div className="space-y-2.5">
                      {selectedExperience.points.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] p-3.5 rounded-xl"
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-lg"
                            style={{ backgroundColor: selectedExperience.color }}
                          />
                          <p className="text-xs sm:text-sm text-white/85 font-body leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer close button */}
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="px-5 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-xs font-mono font-bold text-white/70 hover:text-white transition-all bg-white/5 hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  )
}
