import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { 
  CalendarToday, 
  EmojiEvents, 
  Stars, 
  BusinessCenter,
  OpenInNew
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { experience } = portfolioData

function TimelineCard({ item, index, isLeft, onViewAchievements }) {
  // Select custom icon based on the experience type
  const NodeIcon = item.type === 'Professional' ? BusinessCenter : Stars

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row-reverse' : ''} gap-0 mb-12 sm:mb-16 w-full`}
    >
      {/* Node Dot (Mobile + Desktop) */}
      <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
        <div className="relative flex items-center justify-center">
          {/* Glowing outer wave */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-10 h-10 rounded-full border pointer-events-none"
            style={{ borderColor: item.color }}
          />

          {/* Node Icon Circle */}
          <div
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center bg-[#08090c] z-10 shadow-lg text-sm transition-transform duration-300 hover:scale-110"
            style={{
              borderColor: item.color,
              boxShadow: `0 0 15px ${item.color}33`,
              color: item.color
            }}
          >
            <NodeIcon className="scale-95" fontSize="inherit" />
          </div>
        </div>
      </div>

      {/* Card Wrapper */}
      <div className={`w-full md:w-[45%] pl-16 pr-0 sm:pl-20 sm:pr-6 md:px-0 ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
        <motion.div
          whileHover={{
            y: -6,
            borderColor: `${item.color}40`,
            boxShadow: `0 20px 40px -20px ${item.color}25`
          }}
          className="glass-card p-6 sm:p-8 md:p-10 border border-white/5 ring-1 ring-white/5 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl rounded-2xl bg-white/[0.01]"
        >
          {/* Subtle background gradient glow */}
          <div
            className="absolute -right-20 -top-20 w-40 h-40 rounded-full opacity-5 blur-[80px] pointer-events-none group-hover:opacity-15 transition-opacity duration-700"
            style={{ backgroundColor: item.color }}
          />

          {/* Badge & Period Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6">
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full font-mono text-[9px] font-black tracking-normal border"
                style={{
                  background: `${item.color}0a`,
                  color: item.color,
                  borderColor: `${item.color}30`,
                }}
              >
                {item.type}
              </span>
              <div className="h-[1px] w-6 bg-white/10 hidden sm:block" />
            </div>
            <div className="flex items-center gap-2 text-white/75 font-mono text-[10px] tracking-normal bg-white/[0.03] px-3 py-1 rounded-lg border border-white/5 self-start sm:self-auto">
              <CalendarToday className="text-[12px]" style={{ color: item.color }} />
              <span>{item.period}</span>
            </div>
          </div>

          {/* Role Title */}
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight mb-2 group-hover:text-white/95 transition-colors">
            {item.role}
          </h3>

          {/* Company Details */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-white/40 font-heading text-xs tracking-normal font-light">at</span>
            <span className="font-heading text-sm sm:text-base font-black tracking-normal uppercase" style={{ color: item.color }}>
              {item.company}
            </span>
          </div>

          {/* Description Paragraph */}
          <p className="text-white/60 text-xs sm:text-[13px] font-body leading-relaxed mb-6 pl-4 border-l-2" style={{ borderColor: `${item.color}40` }}>
            {item.description}
          </p>

          {/* Technologies Tag Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-medium rounded-md border border-white/5 text-white/50 bg-white/[0.01] hover:text-white hover:border-white/10 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Achievements Button */}
          {item.points && item.points.length > 0 && (
            <div className="border-t border-white/5 pt-6 mt-auto">
              <button
                onClick={onViewAchievements}
                className="flex items-center justify-center gap-2 text-[10px] font-mono font-bold tracking-normal hover:brightness-110 transition-all bg-white/[0.02] hover:bg-white/[0.05] px-4 py-2.5 rounded-xl border border-white/5 hover:border-white/10"
                style={{ color: item.color }}
              >
                <Stars className="text-xs" />
                <span>View Achievements</span>
                <OpenInNew className="scale-75 opacity-60 ml-0.5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedExperience, setSelectedExperience] = useState(null)
  const timelineRef = useRef(null)

  // Track scroll position inside the timeline list for the glowing progress bar
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  })

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="Work History"
          title="Professional Journey"
          subtitle="My professional evolution from technical intern to Associate Software Engineer."
        />

        {/* Filter Navigation Bar */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-4 py-2 text-xs font-mono font-bold tracking-normal uppercase rounded-full transition-all duration-300 border ${
                activeFilter === opt.value
                  ? 'text-white border-primary/40 bg-primary/10 shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                  : 'text-white/40 border-white/5 hover:text-white hover:border-white/10 bg-white/[0.01]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Experience Timeline */}
        <div ref={timelineRef} className="relative mb-16 sm:mb-20">
          {/* Central timeline background line (vertical connector) */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10"
          />

          {/* Central glowing scroll progress line (only active when All Experience is selected) */}
          {activeFilter === 'All' && (
            <motion.div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top"
              style={{
                scaleY,
                background: 'linear-gradient(180deg, #ffe600, #00d4ff, #ff00f7)',
                boxShadow: '0 0 15px rgba(0,212,255,0.8)'
              }}
            />
          )}

          <AnimatePresence mode="popLayout">
            {filteredExperience.map((item, i) => (
              <TimelineCard 
                key={item.id} 
                item={item} 
                index={i} 
                isLeft={i % 2 === 0} 
                onViewAchievements={() => setSelectedExperience(item)}
              />
            ))}
          </AnimatePresence>
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

              {/* Modal Card Content - Reduced/Compact size */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-md max-h-[80vh] overflow-y-auto glass-card rounded-2xl border border-white/10 p-5 sm:p-6 md:p-8 z-10 bg-[#08090d]/98 shadow-[0_0_50px_rgba(0,212,255,0.12)] flex flex-col"
              >
                {/* Top Accent Gradient Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: selectedExperience.color }}
                />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-white/50 hover:text-white bg-white/5 hover:bg-white/15 transition-all z-20 text-xs"
                >
                  ✕
                </button>

                {/* Header */}
                <div className="flex items-center gap-3.5 mb-5 mt-2">
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 shadow-lg shrink-0"
                    style={{
                      borderColor: `${selectedExperience.color}40`,
                      boxShadow: `0 0 15px ${selectedExperience.color}20`,
                      color: selectedExperience.color
                    }}
                  >
                    {selectedExperience.type === 'Professional' ? <BusinessCenter /> : <Stars />}
                  </div>
                  <div>
                    <span 
                      className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white/5 border-white/10"
                      style={{ color: selectedExperience.color }}
                    >
                      {selectedExperience.type}
                    </span>
                    <h3 className="font-heading font-black text-lg text-white mt-1">
                      {selectedExperience.role}
                    </h3>
                    <p className="text-white/55 font-mono text-[10px] tracking-normal">
                      {selectedExperience.company} ({selectedExperience.period})
                    </p>
                  </div>
                </div>

                {/* Body - Description & Achievements points */}
                <div className="space-y-5 overflow-y-auto pr-1">
                  <div>
                    <h4 className="font-heading font-bold text-[10px] uppercase tracking-normal mb-2">Role Overview</h4>
                    <p className="text-white/70 font-body text-xs sm:text-[13px] leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                      {selectedExperience.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-[10px] uppercase tracking-normal mb-3">Key Achievements</h4>
                    <div className="space-y-2.5">
                      {selectedExperience.points.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 shadow-lg"
                            style={{ backgroundColor: selectedExperience.color }}
                          />
                          <p className="text-xs text-white/75 font-body leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer close button */}
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 text-xs font-mono font-bold text-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Beyond the Code Module */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 sm:mt-32 relative group"
        >
          {/* Main Container Card */}
          <div
            className="glass-card p-6 sm:p-8 md:p-12 overflow-hidden relative rounded-2xl border border-white/5"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.005) 100%)',
              boxShadow: '0 40px 100px -30px rgba(0,0,0,0.5)'
            }}
          >
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20 relative z-10">
              <div className="text-center md:text-left">
                <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white tracking-normal mb-3 leading-tight sm:leading-none">
                  Beyond the Code
                </h3>
                <p className="text-[#00d4ff] font-mono text-[8px] sm:text-[10px] tracking-normal font-black opacity-80 uppercase">Strategic Impact & Technical Prowess</p>
              </div>
            </div>

            {/* Sub Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 relative z-10">
              {[
                { 
                  icon: <EmojiEvents className="text-3xl" />, 
                  title: 'Academic Excellence', 
                  text: 'Recognized for high-impact technical prowess across multiple university-level symposiums and innovative workshops, specializing in complex problem-solving and rapid technology adoption.',
                  color: '#ffe600'
                },
                { 
                  icon: <Stars className="text-3xl" />, 
                  title: 'Strategic Leadership', 
                  text: 'Commanded the planning and execution of large-scale institutional events, optimizing team coordination and driving community engagement through professional excellence.',
                  color: '#ff00f7'
                }
              ].map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.015)', borderColor: 'rgba(255,255,255,0.1)' }}
                  className="relative p-8 rounded-2xl bg-white/[0.005] border border-white/5 backdrop-blur-md transition-all duration-500 overflow-hidden group/sub"
                >
                  {/* Subtle Side Accent */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[3px] opacity-30 group-hover/sub:opacity-100 transition-opacity"
                    style={{ backgroundColor: act.color }}
                  />

                  <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/sub:border-white/20 transition-all duration-500 shadow-xl relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 opacity-0 group-hover/sub:opacity-20 transition-opacity blur-md" style={{ backgroundColor: act.color }} />
                      <div className="relative z-10 scale-90 sm:scale-100" style={{ color: act.color }}>{act.icon}</div>
                    </div>

                    <div className="pt-1">
                      <h4 className="font-heading font-black text-white tracking-normal text-xs sm:text-sm mb-3 sm:mb-4">
                        {act.title}
                      </h4>
                      <p className="text-white/60 text-xs sm:text-[13px] font-body leading-relaxed tracking-wide font-light border-l border-white/10 pl-4 sm:pl-5">
                        {act.text}
                      </p>
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div
                    className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover/sub:opacity-10 transition-opacity"
                    style={{ backgroundColor: act.color }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Background Texture Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.01] pointer-events-none select-none">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
