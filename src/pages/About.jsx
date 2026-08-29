import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  LocationOn,
  Email,
  Phone,
  GitHub,
  LinkedIn,
  School,
  AutoStories,
  AccountBalance
} from '@mui/icons-material'
import profiles from '../assets/Khuswanth.png'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { personal, education } = portfolioData

const MuiIcon = ({ name, ...props }) => {
  const iconMap = {
    School: School,
    AutoStories: AutoStories,
    AccountBalance: AccountBalance
  }
  const IconComponent = iconMap[name] || School
  return <IconComponent {...props} />
}

export default function About() {
  const eduTimelineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: eduTimelineRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  })

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="Who I Am"
          title="About Me"
          subtitle="A passionate developer from Tirupati building the future, one commit at a time."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-24 items-center mb-20 md:mb-24">
          {/* Left: Biography Information with Enhanced Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Role Badge & Name */}
            <div className="mb-6 sm:mb-8 text-center lg:text-left">
              <h3 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                {personal.name || "Khuswanth Rao Jadav"}
              </h3>
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-3">
                <div className="h-[2px] w-8 sm:w-12 bg-primary shrink-0 shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                <span className="text-primary font-mono text-xs sm:text-sm md:text-base font-black tracking-normal uppercase">
                  React.js Developer & UI/UX Designer
                </span>
              </div>
  
            </div>

            {/* Objective Statement Card with Increased Font Size */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden mb-8 border-l-4 border-l-primary shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <p className="text-white/90 font-body leading-relaxed text-base sm:text-lg md:text-[18px] font-light relative z-10">
                {personal.objective}
              </p>
            </div>

            {/* Contact Info Items (No Card Background, No Underlines, Vibrant Colors) */}
            <div className="flex flex-row gap-8 mb-6">
              {[
                { icon: <Email />, label: 'Email', value: personal.email, href: `mailto:${personal.email}`, color: '#00f2ff' },
                { icon: <Phone />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}`, color: '#00ff88' },
              ].map((item) => (
                <div 
                  key={item.label} 
                  className="flex items-center gap-4 group/info transition-all duration-300 py-1"
                >
                  <div 
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg group-hover/info:scale-110 transition-all duration-300 shrink-0 shadow-lg"
                    style={{ 
                      color: item.color, 
                      backgroundColor: `${item.color}15`, 
                      borderColor: `${item.color}45`,
                      borderWidth: '1px',
                      boxShadow: `0 0 15px ${item.color}20`
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    {item.href ? (
                      <a 
                        href={item.href} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="block text-white/90 text-sm sm:text-base font-bold transition-colors duration-300 font-heading tracking-wide truncate no-underline"
                        onMouseEnter={(e) => { e.currentTarget.style.color = item.color }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div 
                        className="text-white/90 text-sm sm:text-base font-bold font-heading tracking-wide truncate no-underline"
                      >
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <motion.a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(0, 212, 255, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 border border-primary/40 text-primary text-sm font-heading tracking-normal rounded-xl transition-all duration-300 group/btn bg-primary/5 hover:bg-primary hover:text-dark-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-12" />
                <GitHub className="text-[20px] relative z-10" />
                <span className="font-bold tracking-normal relative z-10">GitHub</span>
              </motion.a>
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(0, 212, 255, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 border border-[#00d4ff]/40 text-[#00d4ff] text-sm font-heading tracking-normal rounded-xl transition-all duration-300 group/btn bg-[#00d4ff]/5 hover:bg-[#00d4ff] hover:text-dark-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-12" />
                <LinkedIn className="text-[20px] relative z-10" />
                <span className="font-bold tracking-normal relative z-10">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Profile Picture Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end lg:pl-4"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[400px]">
              {/* Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-[#7b2fff]/15 to-transparent blur-3xl rounded-3xl opacity-70 pointer-events-none" />

              <div
                className="relative rounded-[2.5rem] overflow-hidden border border-white/10 glass-card bg-[#08090c] p-3 shadow-2xl"
              >
                <div className="relative rounded-[2rem] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                  <img
                    src={profiles}
                    alt={personal.name || "Khuswanth Rao Jadav"}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education Section */}
        <div className="mb-20">
          <SectionHeader
            tag="Academic Journey"
            title="Education"
            align="left"
          />
          <div ref={eduTimelineRef} className="relative">
            {/* Timeline center line background */}
            <div className="absolute left-[20px] md:left-[39px] top-0 bottom-0 w-[2px] bg-white/10" />

            {/* Timeline center line progress fill */}
            <motion.div
              className="absolute left-[20px] md:left-[39px] top-0 bottom-0 w-[2px] origin-top"
              style={{
                scaleY,
                background: 'linear-gradient(180deg, #00d4ff, #7b2fff, #ff00f7)',
                boxShadow: '0 0 15px rgba(0,212,255,0.8)'
              }}
            />

            <div className="space-y-8 md:space-y-12">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative pl-14 md:pl-24"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute left-0 md:left-5 top-6 z-10 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                      className="absolute inset-0 rounded-xl border border-primary z-10 bg-transparent"
                    />

                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                      className="w-10 h-10 rounded-xl border border-white/10 bg-[#08090c] flex items-center justify-center text-primary relative z-20 shadow-lg"
                    >
                      <MuiIcon name={edu.icon} className="text-xl relative z-10" />
                    </motion.div>
                  </div>

                  {/* Education Detail Card */}
                  <motion.div
                    whileHover={{ scale: 1.01, y: -4, borderColor: 'rgba(0,212,255,0.2)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-500 bg-white/[0.01] relative overflow-hidden group flex flex-col gap-4 justify-between"
                  >
                    {/* Background glow */}
                    <div className="absolute -right-20 -top-20 w-44 h-44 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:opacity-10 transition-opacity" />

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 z-10">
                      <div>
                        <h4 className="font-heading font-black text-lg sm:text-xl text-white tracking-wide leading-snug">{edu.degree}</h4>
                        <div className="text-primary text-xs sm:text-sm font-mono mt-1">{edu.field}</div>
                      </div>
                      <div className="md:text-right flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end mt-1 md:mt-0">
                        <div className="text-white/40 text-[10px] sm:text-xs font-mono tracking-wider mb-0 md:mb-1">{edu.period}</div>
                        <div className="text-white bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-lg font-heading font-bold text-xs sm:text-sm">CGPA {edu.cgpa}</div>
                      </div>
                    </div>
                    <div className="text-white/70 text-xs sm:text-sm font-body border-t border-white/5 pt-4 z-10 w-full mt-auto flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="font-bold text-white/80">{edu.institution}</span>
                      <span className="hidden sm:inline text-white/20">—</span>
                      <span className="text-white/40 text-[11px] sm:text-xs font-mono">{edu.location}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
