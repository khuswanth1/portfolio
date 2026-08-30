import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  WorkspacePremium,
  CalendarToday,
  CloudQueue,
  SmartToy,
  Storage,
  Language,
  VerifiedUser,
  Code,
  Terminal
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { certifications } = portfolioData

const getCertIcon = (category) => {
  switch (category) {
    case 'Frontend': return <Code fontSize="inherit" />
    case 'Engineering':
    case 'Programming': return <Terminal fontSize="inherit" />
    case 'Cloud': return <CloudQueue fontSize="inherit" />
    case 'AI/ML': return <SmartToy fontSize="inherit" />
    case 'Database': return <Storage fontSize="inherit" />
    case 'Web': return <Language fontSize="inherit" />
    default: return <WorkspacePremium fontSize="inherit" />
  }
}

const filterOptions = [
  { label: 'All Credentials', value: 'All' },
  { label: 'Frontend & React', value: 'Frontend' },
  { label: 'Software Engineering', value: 'Engineering' },
  { label: 'Cloud & AI', value: 'CloudAI' },
  { label: 'Database & SQL', value: 'Database' }
]

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? certifications
    : activeFilter === 'Frontend'
    ? certifications.filter(c => c.category === 'Frontend' || c.category === 'Web')
    : activeFilter === 'Engineering'
    ? certifications.filter(c => c.category === 'Engineering' || c.category === 'Programming')
    : activeFilter === 'CloudAI'
    ? certifications.filter(c => c.category === 'Cloud' || c.category === 'AI/ML')
    : certifications.filter(c => c.category === 'Database')

  return (
    <PageWrapper>
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader
          tag="Credentials"
          title="Certifications"
          subtitle="Industry-recognized certifications validating core competencies in frontend development, cloud architecture, and database systems."
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

        {/* Certifications 5-Column Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-4 md:mb-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  y: -6,
                  borderColor: `${cert.color}45`,
                  boxShadow: `0 20px 40px -20px ${cert.color}30`
                }}
                className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 ring-1 ring-white/5 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl bg-white/[0.015] flex flex-col justify-between shadow-xl"
              >
                {/* Top Accent Gradient Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                />

                {/* Subtle Radial Glow */}
                <div
                  className="absolute -right-20 -top-20 w-44 h-44 rounded-full opacity-10 blur-[80px] pointer-events-none group-hover:opacity-30 transition-opacity duration-700"
                  style={{ backgroundColor: cert.color }}
                />

                <div>
                  {/* Category Pill & Year Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/5">
                    <span
                      className="inline-flex items-center gap-1 font-mono text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-sm"
                      style={{
                        background: `${cert.color}15`,
                        color: cert.color,
                        borderColor: `${cert.color}40`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cert.color }} />
                      {cert.category}
                    </span>

                    <div className="flex items-center gap-1 text-white/80 font-mono text-[10px] sm:text-[11px] tracking-normal bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/5">
                      <CalendarToday className="text-[11px]" style={{ color: cert.color }} />
                      <span className="font-semibold">{cert.year}</span>
                    </div>
                  </div>

                  {/* Icon & Title Header */}
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-lg mt-0.5"
                      style={{
                        background: `${cert.color}15`,
                        border: `1px solid ${cert.color}35`,
                        color: cert.color,
                        boxShadow: `0 0 15px ${cert.color}20`
                      }}
                    >
                      {getCertIcon(cert.category)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h5 className="font-heading font-black text-xs sm:text-sm text-white tracking-wide leading-snug group-hover:text-white transition-colors">
                        {cert.title}
                      </h5>
                      <div className="flex items-center gap-1 text-white/85 text-[11px] font-bold font-heading mt-1">
                        <VerifiedUser className="text-[11px] shrink-0" style={{ color: cert.color }} />
                        <span className="truncate">{cert.issuer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
