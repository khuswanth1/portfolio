import { motion } from 'framer-motion'
import * as Icons from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { skills } = portfolioData

const MuiIcon = ({ name, ...props }) => {
  const IconComponent = Icons[name] || Icons.Code
  return <IconComponent {...props} />
}

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
}

const categories = [
  { 
    key: 'frontend', 
    label: 'Frontend & UI Engineering', 
    subtitle: 'Component Architecture & Mobile Apps', 
    icon: 'Devices', 
    color: '#00f2ff' 
  },
  { 
    key: 'languages', 
    label: 'Programming Languages', 
    subtitle: 'Core Coding Foundations', 
    icon: 'Terminal', 
    color: '#00d4ff' 
  },
  { 
    key: 'frameworks', 
    label: 'Frameworks & Libraries', 
    subtitle: 'Ecosystem & Server Solutions', 
    icon: 'Settings', 
    color: '#a855f7' 
  },
  { 
    key: 'tools', 
    label: 'Tools & Databases', 
    subtitle: 'Development Workflows & Data', 
    icon: 'Build', 
    color: '#ffe600' 
  }
]

export default function Skills() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader
          tag="Skills & Architecture"
          title="Technical Expertise"
          subtitle="A comprehensive overview of my core technical competencies across modern frontend engineering, React development, and scalable web technologies."
        />

        {/* 1. Primary Technical Competencies Matrix (4-Column Responsive Grid) */}
        <div className="mb-16 md:mb-20">
          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.key}
                variants={itemVariants}
                className="glass-card rounded-3xl border border-white/10 bg-white/[0.015] p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-white/25 shadow-2xl h-[490px] sm:h-[510px] group"
              >
                {/* Top accent gradient bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
                />

                {/* Subtle top-right glow */}
                <div 
                  className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-[80px] opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: cat.color }}
                />

                {/* Fixed Category Header with Full Typography */}
                <div className="shrink-0">
                  <div className="flex items-start gap-3 mb-4 pb-3 border-b border-white/5">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border text-lg group-hover:scale-105 transition-transform duration-300 shrink-0 shadow-lg mt-0.5"
                      style={{ 
                        color: cat.color, 
                        backgroundColor: `${cat.color}20`, 
                        borderColor: `${cat.color}50` 
                      }}
                    >
                      <MuiIcon name={cat.icon} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="font-heading font-black text-sm sm:text-base text-white tracking-wide leading-snug">
                        {cat.label}
                      </h5>
                      <span className="text-white/70 text-[11px] sm:text-xs font-mono font-medium block mt-0.5 leading-tight">
                        {cat.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scrollable Skills List Body */}
                <div className="flex-1 overflow-y-auto pr-1.5 my-2 custom-card-scrollbar space-y-2">
                  {skills[cat.key]?.map((skill) => (
                    <div 
                      key={skill.name}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.07] transition-all duration-300 group/item"
                    >
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                        style={{ color: cat.color, backgroundColor: `${cat.color}18` }}
                      >
                        <MuiIcon name={skill.icon} style={{ fontSize: '1rem' }} />
                      </div>
                      <span className="text-white group-hover/item:text-white font-mono text-xs font-bold tracking-normal transition-colors duration-300 leading-tight">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 2. Qualities */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-8 md:p-10 rounded-3xl border border-white/15 bg-white/[0.02] shadow-2xl relative overflow-hidden group/card hover:border-[#00f2ff]/40 transition-all duration-500"
          >
            {/* Top Cyan Light Beam */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent shadow-[0_0_20px_#00f2ff]" />
            
            {/* Ambient Background Aura */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#00f2ff]/15 rounded-full blur-[100px] pointer-events-none group-hover/card:opacity-40 transition-opacity duration-700" />

            <div>
              {/* Card Header with Bright Colors */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00f2ff]/15 border border-[#00f2ff]/40 flex items-center justify-center text-xl text-[#00f2ff] shadow-[0_0_25px_rgba(0,242,255,0.25)] group-hover/card:scale-105 transition-transform duration-300 shrink-0">
                    <MuiIcon name="Groups" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2">
                      Qualities
                    </h3>
                    <span className="text-cyan-300/90 font-mono text-xs sm:text-sm font-semibold block mt-0.5">
                      Core Engineering Strengths, Agile Collaboration & Mindset
                    </span>
                  </div>
                </div>
              </div>

              {/* 6 Interactive Qualities in 3-Column Balanced Grid with Bright Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {portfolioData.skills.softSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all duration-300 group/item overflow-hidden flex flex-col justify-between"
                    style={{
                      boxShadow: '0 4px 20px -5px rgba(0,0,0,0.6)'
                    }}
                  >
                    {/* Left Indicator Accent Bar */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-[4px] opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-r"
                      style={{ 
                        backgroundColor: skill.color || '#00f2ff',
                        boxShadow: `0 0 10px ${skill.color || '#00f2ff'}`
                      }}
                    />

                    {/* Radial hover glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/item:opacity-15 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 15% 50%, ${skill.color || '#00f2ff'}40 0%, transparent 70%)`
                      }}
                    />

                    <div className="flex items-center gap-3.5 relative z-10 mb-2.5">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110 shadow-lg"
                        style={{ 
                          color: skill.color || '#00f2ff', 
                          backgroundColor: `${skill.color || '#00f2ff'}22`,
                          borderColor: `${skill.color || '#00f2ff'}50`,
                          borderWidth: '1px'
                        }}
                      >
                        <MuiIcon name={skill.icon} style={{ fontSize: '1.25rem' }} />
                      </div>
                      <span className="text-white group-hover/item:text-white text-sm sm:text-base font-extrabold tracking-normal">
                        {skill.name}
                      </span>
                    </div>

                    {skill.tag && (
                      <span 
                        className="text-xs font-mono font-bold pl-[54px] tracking-wide transition-colors duration-300"
                        style={{ color: skill.color || '#00f2ff' }}
                      >
                        {skill.tag}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
