import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarToday, 
  ExpandMore, 
  ExpandLess, 
  EmojiEvents, 
  Stars, 
  BusinessCenter,
  School
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { experience, education } = portfolioData

function TimelineCard({ item, index, isLeft }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row-reverse' : ''} gap-0 mb-12 sm:mb-16 w-full`}
    >
      {/* Node Dot (Mobile + Desktop) */}
      <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 bg-dark-500 z-10 relative"
            style={{
              borderColor: item.color,
              boxShadow: `0 0 20px ${item.color}60`
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border bg-transparent"
            style={{ borderColor: item.color }}
          />
        </div>
      </div>

      {/* Card Wrapper */}
      <div className={`w-full md:w-[45%] pl-16 pr-0 sm:pl-20 sm:pr-6 md:px-0 ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
        <motion.div
          whileHover={{
            y: -8,
            borderColor: `${item.color}66`,
            boxShadow: `0 20px 40px -20px ${item.color}30`
          }}
          className="glass-card p-6 sm:p-8 md:p-10 border border-white/10 ring-1 ring-white/5 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl"
        >
          {/* Subtle background glow */}
          <div
            className="absolute -right-20 -top-20 w-40 h-40 rounded-full opacity-10 blur-[80px] pointer-events-none group-hover:opacity-20 transition-opacity duration-700"
            style={{ backgroundColor: item.color }}
          />

          {/* Badge & Period */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <span
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em]"
                style={{
                  background: `${item.color}10`,
                  color: item.color,
                  border: `1px solid ${item.color}40`,
                  boxShadow: `0 0 20px -5px ${item.color}30`
                }}
              >
                {item.type}
              </span>
              <div className="h-[1px] w-6 sm:w-12 bg-white/20 hidden sm:block" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-white/90 font-mono text-[9px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.2em] uppercase bg-white/5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md border border-white/5 self-start sm:self-auto">
              <CalendarToday className="text-[12px] sm:text-sm" style={{ color: item.color }} />
              <span>{item.period}</span>
            </div>
          </div>

          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight mb-2 sm:mb-3 uppercase leading-tight sm:leading-none"
          >
            {item.role}
          </motion.h3>

          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <span className="text-white/60 font-heading text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-light">at</span>
            <span className="font-heading text-base sm:text-lg md:text-xl font-black tracking-wider sm:tracking-widest uppercase" style={{ color: item.color }}>
              {item.company}
            </span>
          </div>

          {/* Description */}
          <p className="text-white/80 text-xs sm:text-[13px] font-body leading-relaxed mb-8 sm:mb-10 tracking-wide font-light border-l-2 pl-4 sm:pl-6" style={{ borderColor: `${item.color}40` }}>
            {item.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8 sm:mb-10">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border rounded transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Achievements Dropdown */}
          {item.points && item.points.length > 0 && (
            <div className="border-t border-white/10 pt-8 mt-auto">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group/btn flex items-center gap-3 text-[11px] font-mono font-black uppercase tracking-[0.3em] transition-all duration-300"
                style={{ color: item.color }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover/btn:opacity-50 transition-opacity" style={{ backgroundColor: item.color }} />
                  {isExpanded ? (
                    <ExpandLess className="text-lg relative z-10" />
                  ) : (
                    <ExpandMore className="text-lg relative z-10" />
                  )}
                </div>
                <span className="group-hover/btn:tracking-[0.4em] transition-all">
                  {isExpanded ? 'Hide Achievements' : 'View Achievements'}
                </span>
              </button>

              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 space-y-5">
                      {item.points.map((point, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 shadow-lg"
                            style={{
                              backgroundColor: item.color,
                              boxShadow: `0 0 10px ${item.color}`
                            }}
                          />
                          <p className="text-[12px] text-white/80 font-body leading-relaxed tracking-wide font-medium">
                            {point}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

    </motion.div>
  )
}

export default function Experience() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="Work History"
          title="Professional Journey"
          subtitle="My professional evolution from technical intern to Associate Software Engineer."
        />

        {/* Experience Timeline */}
        <div className="relative mb-16 sm:mb-20">
          {/* Central timeline line (mobile & desktop) */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, transparent, #ffe600, #00d4ff, #ff00f7, transparent)',
              boxShadow: '0 0 20px rgba(255,255,255,0.05)'
            }}
          />

          {experience.map((item, i) => (
            <TimelineCard key={item.id} item={item} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>


        {/* Beyond the Code Module */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 sm:mt-32 relative group"
        >
          {/* Main Container Card */}
          <div
            className="glass-card p-6 sm:p-8 md:p-12 overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              boxShadow: '0 40px 100px -30px rgba(0,0,0,0.5)'
            }}
          >
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20 relative z-10">
              <div className="text-center md:text-left">
                <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-3 leading-tight sm:leading-none">
                  Beyond the Code
                </h3>
                <p className="text-[#00d4ff] font-mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase font-black opacity-80">Strategic Impact & Technical Prowess</p>
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
                  whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.04)' }}
                  className="relative p-8 rounded-2xl bg-white/2 backdrop-blur-md transition-all duration-500 overflow-hidden group/sub"
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
                      <h4 className="font-heading font-black text-white tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
                        {act.title}
                      </h4>
                      <p className="text-white/80 text-xs sm:text-[13px] font-body leading-relaxed tracking-wide font-light border-l border-white/10 pl-4 sm:pl-5">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.02] pointer-events-none select-none">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
