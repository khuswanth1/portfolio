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
  AccountBalance,
  Lightbulb,
  CloudQueue,
  TrackChanges,
  Handshake
} from '@mui/icons-material'
import profiles from '../assets/KhuswanthRao.jpeg'
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-20">
          {/* Profile Picture Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex items-center justify-center p-4"
          >
            <div
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-[2.5rem] overflow-hidden border border-white/5 glass-card group bg-[#08090c]"
              style={{ boxShadow: '0 20px 50px -20px rgba(0,212,255,0.2)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />

              <img
                src={profiles}
                alt="Khuswanth Rao Jadav"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Biography Information */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="mb-8 sm:mb-10 block text-center lg:text-left">
              <h3 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-white mb-3 tracking-tight leading-none">
                {personal.name || "Khuswanth Rao Jadav"}
              </h3>
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-5 flex-wrap sm:flex-nowrap">
                <div className="h-[2px] w-8 sm:w-12 bg-primary/60 shrink-0" />
                <span className="text-primary font-mono text-[10px] sm:text-xs md:text-sm font-black tracking-normal uppercase">
                  Full Stack Java Developer
                </span>
              </div>
            </div>

            <p className="text-white/80 font-body leading-relaxed mb-8 md:mb-12 text-sm sm:text-base md:text-[16px] border-l-[3px] border-primary/30 pl-4 sm:pl-6 lg:mr-10 font-light">
              {personal.objective}
            </p>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 md:mb-12">
              {[
                { icon: <LocationOn />, label: 'Location', value: 'Tirupati, AP', color: '#ff6b35' },
                { icon: <Email />, label: 'Email', value: personal.email, href: `mailto:${personal.email}`, color: '#00d4ff' },
                { icon: <Phone />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}`, color: '#7b2fff' },
                { icon: <GitHub />, label: 'GitHub', value: 'khuswanth1', href: personal.github, color: '#ffd700' }
              ].map((item) => (
                <div 
                  key={item.label} 
                  className="flex items-center gap-4 glass-card p-5 group/info transition-all duration-300 hover:bg-white/[0.02] border border-white/5 hover:border-white/10 relative overflow-hidden rounded-2xl"
                >
                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/info:opacity-[0.03] transition-opacity duration-500 pointer-events-none" 
                    style={{ background: `radial-gradient(circle at 10% 20%, ${item.color} 0%, transparent 60%)` }} 
                  />
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 text-xl group-hover/info:scale-105 transition-transform duration-300 relative z-10 shrink-0"
                    style={{ color: item.color, backgroundColor: `${item.color}0a`, borderColor: `${item.color}20` }}
                  >
                    {item.icon}
                  </div>
                  <div className="relative z-10 min-w-0 flex-1">
                    <div className="text-white/40 text-[9px] font-mono font-bold tracking-normal mb-1 uppercase">{item.label}</div>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="block text-white text-xs sm:text-sm font-bold transition-colors duration-300 font-heading tracking-wider truncate group-hover/info:text-[var(--hover-color)]"
                        style={{ '--hover-color': item.color }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div 
                        className="text-white text-xs sm:text-sm font-bold font-heading tracking-wider truncate transition-colors duration-300 group-hover/info:text-[var(--hover-color)]"
                        style={{ '--hover-color': item.color }}
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
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 212, 255, 0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 border border-primary/40 text-primary text-xs font-heading tracking-normal rounded-xl transition-all duration-300 group/btn bg-primary/5 hover:bg-primary hover:text-dark-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-12" />
                <GitHub className="text-[18px] relative z-10" />
                <span className="font-bold tracking-normal relative z-10">GitHub</span>
              </motion.a>
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 212, 255, 0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 border border-[#00d4ff]/40 text-[#00d4ff] text-xs font-heading tracking-normal rounded-xl transition-all duration-300 group/btn bg-[#00d4ff]/5 hover:bg-[#00d4ff] hover:text-dark-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-12" />
                <LinkedIn className="text-[18px] relative z-10" />
                <span className="font-bold tracking-normal relative z-10">LinkedIn</span>
              </motion.a>
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

        {/* At A Glance / Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-20"
        >
          <div
            className="glass-card p-6 sm:p-10 md:p-12 relative overflow-hidden backdrop-blur-3xl rounded-2xl border border-white/5 bg-white/[0.005]"
            style={{
              boxShadow: '0 30px 70px -20px rgba(0,0,0,0.6)'
            }}
          >
            {/* Top accent gradient border line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 relative z-10">
              <div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-normal mb-2 uppercase">
                  At A Glance
                </h3>
                <p className="text-primary/70 font-mono text-[9px] sm:text-[10px] tracking-normal font-black uppercase">Quick Technical & Personal Facts</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
              {[
                { icon: <School />, label: 'Graduated', value: '2024 — B.Tech CSE', color: '#00d4ff' },
                { icon: <LocationOn />, label: 'Based In', value: 'Tirupati, AP', color: '#7b2fff' },
                { icon: <Lightbulb />, label: 'Speciality', value: 'Full Stack Java', color: '#ffe600' },
                { icon: <CloudQueue />, label: 'Learning', value: 'Cloud & DevOps', color: '#00d4ff' },
                { icon: <TrackChanges />, label: 'Goal', value: 'Enterprise Dev', color: '#ff00f7' },
                { icon: <Handshake />, label: 'Available', value: 'Open to Offers', color: '#00ff88' }
              ].map((fact, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  className="relative p-5 pl-7 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all duration-300 group/fact overflow-hidden"
                >
                  {/* Left Accent indicator bar */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-[3px] opacity-40 group-hover/fact:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: fact.color }}
                  />

                  {/* Radial hover glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/fact:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 10% 20%, ${fact.color}33 0%, transparent 65%)`
                    }}
                  />

                  <div className="flex items-center gap-4 relative z-10">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 text-lg group-hover/fact:scale-105 transition-transform duration-300 shrink-0" 
                      style={{ color: fact.color, backgroundColor: `${fact.color}0a`, borderColor: `${fact.color}15` }}
                    >
                      {fact.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="block text-white/40 text-[9px] font-mono font-bold tracking-normal mb-0.5 uppercase">{fact.label}</span>
                      <span 
                        className="block text-white/90 text-xs sm:text-sm font-heading font-bold tracking-wide truncate transition-colors duration-300 group-hover/fact:text-[var(--hover-color)]"
                        style={{ '--hover-color': fact.color }}
                      >
                        {fact.value}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
