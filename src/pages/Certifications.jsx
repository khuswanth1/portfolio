import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  WorkspacePremium,
  CalendarMonth,
  FilterList,
  CloudQueue,
  SmartToy,
  Storage,
  Assessment,
  Language,
  Terminal,
  Coffee
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { certifications } = portfolioData

const allCategories = ['All', ...new Set(certifications.map(c => c.category))]

const getCertIcon = (category) => {
  switch (category) {
    case 'Cloud': return <CloudQueue fontSize="inherit" />
    case 'AI': return <SmartToy fontSize="inherit" />
    case 'Database': return <Storage fontSize="inherit" />
    case 'Java': return <Coffee fontSize="inherit" />
    case 'Development': return <Terminal fontSize="inherit" />
    default: return <WorkspacePremium fontSize="inherit" />
  }
}

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06
    }
  }
}

const itemVariants = {
  initial: { opacity: 0, scale: 0.9, y: 15 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
}

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = activeFilter === 'All'
    ? certifications
    : certifications.filter(c => c.category === activeFilter)

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="Credentials"
          title="Certifications"
          subtitle="Verifiable badges and credentials validating technical skill sets and domains of expertise."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {allCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 font-heading text-xs font-bold tracking-normal transition-all duration-300 rounded-lg border ${
                activeFilter === cat
                  ? 'bg-primary/10 text-white border-primary/30 shadow-[0_0_15px_rgba(0,212,255,0.15)] font-bold'
                  : 'bg-white/[0.01] border-white/5 text-white/40 hover:text-white hover:border-white/10 hover:bg-white/[0.03]'
              }`}
            >
              <FilterList className="text-[12px]" />
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Certs grid */}
        <motion.div 
          layout 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16 md:mb-24"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                whileHover={{ y: -8, borderColor: `${cert.color}40`, boxShadow: `0 20px 40px -20px ${cert.color}30` }}
                onHoverStart={() => setHoveredId(cert.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="glass-card p-5 sm:p-6 cursor-default relative overflow-hidden group transition-all duration-500 rounded-2xl border border-white/5 bg-white/[0.005]"
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${cert.color}15, transparent 70%)` }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                />

                <div className="relative z-10">
                  {/* Icon & category */}
                  <div className="flex items-start justify-between mb-4 sm:mb-5">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                      style={{
                        background: `${cert.color}15`,
                        border: `1px solid ${cert.color}30`,
                        color: cert.color,
                        boxShadow: `0 0 15px ${cert.color}20`
                      }}
                    >
                      {getCertIcon(cert.category)}
                    </div>
                    <span
                      className="text-[9px] sm:text-xs font-mono tracking-normal px-2.5 py-1 rounded group-hover:shadow-md transition-shadow duration-300"
                      style={{
                        background: `${cert.color}10`,
                        border: `1px solid ${cert.color}20`,
                        color: cert.color
                      }}
                    >
                      {cert.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-black text-base sm:text-lg text-white tracking-normal mb-1.5 leading-tight group-hover:text-white/95 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <div
                    className="font-body text-xs sm:text-sm font-bold mb-2.5 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                    style={{ color: cert.color, '--hover-color': cert.color }}
                  >
                    {cert.issuer}
                  </div>

                  {/* Year */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white/40 text-[10px] sm:text-xs font-mono group-hover:text-white/60 transition-colors">
                    <CalendarMonth fontSize="inherit" style={{ color: cert.color }} className="scale-75 sm:scale-100" />
                    {cert.year}
                  </div>

                  {/* Award badge */}
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-white/5 group-hover:text-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <WorkspacePremium className="text-2xl sm:text-3xl" style={{ color: cert.color }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Achievements Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8 md:p-10 mb-16 md:mb-24 relative overflow-hidden group border border-white/5 bg-white/[0.005] rounded-2xl"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-3xl -mr-24 sm:-mr-32 -mt-24 sm:-mt-32 transition-colors duration-500 group-hover:bg-primary/10" />
          <div className="absolute bottom-0 left-0 w-40 sm:w-48 h-40 sm:h-48 bg-purple-500/5 rounded-full blur-3xl -ml-20 sm:-ml-24 -mb-20 sm:-mb-24 transition-colors duration-500 group-hover:bg-purple-500/10" />
          
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 relative z-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <WorkspacePremium className="text-primary text-xs sm:text-sm" />
                <span className="font-mono text-[9px] sm:text-[10px] text-primary tracking-normal font-bold">Credential Dashboard</span>
              </div>
              
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-4 tracking-tight leading-tight">
                Academic & Professional <span className="text-primary">Excellence</span>
              </h3>
              
              <p className="text-white/75 font-body text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                A strategic accumulation of technical expertise across cloud architecture, 
                machine learning, and full-stack systems. My certifications from nationally 
                recognized bodies like <span className="text-white font-semibold">NPTEL (IITs)</span> and 
                global platforms validate a commitment to rigorous technical standards.
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 w-full lg:w-auto"
            >
              {[
                { 
                  label: 'Total Credentials', 
                  value: certifications.length, 
                  color: '#00d4ff',
                  subtitle: 'Global Recognition'
                },
                { 
                  label: 'Learning Partners', 
                  value: new Set(certifications.map(c => c.issuer)).size, 
                  color: '#7b2fff',
                  subtitle: 'Top Institutions'
                },
                { 
                  label: 'Major Focus', 
                  value: certifications.filter(c => c.year === '2023').length, 
                  color: '#ff6b35',
                  subtitle: 'Advanced Studies'
                },
                { 
                  label: 'Foundation', 
                  value: certifications.filter(c => c.year === '2022').length, 
                  color: '#ffd700',
                  subtitle: 'Core Competence'
                }
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group/stat p-5 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-500 bg-white/[0.01] border border-white/5 hover:border-white/10"
                >
                  {/* Hover Background Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${s.color}15, transparent 70%)` }}
                  />
                  
                  {/* Top Light Effect */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
                  />

                  {/* Value Number with Glow */}
                  <div 
                    className="relative z-10 font-heading font-black text-3xl sm:text-4xl mb-1.5 tracking-normal transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>

                  <div className="relative z-10 text-white/90 group-hover/stat:text-white font-bold font-mono text-[9px] sm:text-[11px] tracking-normal mb-1 transition-colors duration-300">
                    {s.label}
                  </div>
                  
                  <div className="relative z-10 text-white/40 text-[8px] sm:text-[9px] font-body italic tracking-normal transition-colors duration-300 group-hover/stat:text-white/70">
                    {s.subtitle}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="font-mono text-white text-xs tracking-normal mb-10 font-bold opacity-80">Certified by</div>
          
          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              { name: 'NPTEL', color: '#00d4ff' },
              { name: 'Coursera', color: '#2b6efd' },
              { name: 'SoloLearn', color: '#00ffa3' },
              { name: 'Lets Grow More', color: '#ffb300' },
              { name: 'Oasis Infobyte', color: '#9d50bb' }
            ].map((p) => (
              <motion.div
                key={p.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative group cursor-default w-[calc(50%-0.5rem)] sm:w-auto"
              >
                {/* Unique Asymmetrical Shape Wrapper */}
                <div 
                  className="px-6 sm:px-8 py-3 transition-all duration-500 relative z-10 font-heading text-xs font-black tracking-normal flex items-center justify-center overflow-hidden h-full rounded-xl"
                  style={{ 
                    clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: '#ffffff'
                  }}
                >
                  <span className="relative z-20 group-hover:scale-110 transition-all duration-300 break-words text-center">
                    {p.name}
                  </span>

                  {/* Hover Background Glow Filling from Left */}
                  <div 
                    className="absolute inset-0 z-10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none"
                    style={{ background: `linear-gradient(90deg, ${p.color}40, ${p.color}10)` }}
                  />
                </div>

                {/* Outer Neon Glow */}
                <div 
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-0 pointer-events-none"
                  style={{ background: p.color }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
