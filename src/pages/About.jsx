import { motion } from 'framer-motion'
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
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { personal, education } = portfolioData

export default function About() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="Who I Am"
          title="About Me"
          subtitle="A passionate developer from Tirupati building the future, one commit at a time."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex items-center justify-center p-4"
          >
            <div
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 glass-card group"
              style={{ boxShadow: '0 20px 50px -20px rgba(0,212,255,0.3)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay" />

              <img
                src="/profile.jpg"
                alt="Khuswanth Rao Jadav"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
                }}
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="mb-8 sm:mb-10 block">
              <h3 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-white mb-3 tracking-tighter uppercase leading-none break-words">
                {personal.name || "Khuswanth Rao Jadav"}
              </h3>
              <div className="flex items-center gap-3 sm:gap-5 flex-wrap sm:flex-nowrap">
                <div className="h-[2px] w-8 sm:w-12 bg-primary/60 shrink-0" />
                <span className="text-primary font-mono text-[10px] sm:text-xs md:text-sm font-black tracking-[0.15em] sm:tracking-[0.3em] uppercase">
                  Full Stack Java Developer
                </span>
              </div>
            </div>

            <p className="text-white/80 font-body leading-relaxed mb-8 md:mb-12 text-sm sm:text-base md:text-[17px] border-l-[3px] border-primary/30 pl-4 sm:pl-6 lg:mr-10 font-light">
              {personal.objective}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 md:mb-12">
              {[
                { icon: <LocationOn />, label: 'Location', value: 'Tirupati, AP' },
                { icon: <Email />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                { icon: <Phone />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
                { icon: <GitHub />, label: 'GitHub', value: 'khuswanth1', href: personal.github }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 sm:gap-5 glass-card p-4 sm:p-5 group/info transition-all duration-300 hover:bg-white/5 border border-white/5 hover:border-primary/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/info:opacity-100 transition-opacity" />
                  <div className="text-primary text-2xl sm:text-[26px] group-hover/info:scale-110 transition-transform duration-300 relative z-10 shrink-0">{item.icon}</div>
                  <div className="relative z-10 min-w-0 flex-1">
                    <div className="text-white/40 text-[9px] sm:text-[10px] font-mono font-black tracking-[0.2em] uppercase mb-1 sm:mb-1.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="block text-white text-sm sm:text-[15px] font-bold hover:text-primary transition-colors duration-300 font-heading tracking-wider truncate">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-white text-sm sm:text-[15px] font-bold font-heading tracking-wider truncate">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5">
              <motion.a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 border border-primary/40 text-primary text-sm font-heading tracking-widest uppercase clip-corner transition-all duration-300 group/btn bg-primary/5 hover:border-primary"
              >
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity bg-primary blur-md" />
                <GitHub className="text-[18px] relative z-10" />
                <span className="relative z-10 font-bold tracking-[0.2em]">GitHub</span>
              </motion.a>
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 border border-secondary/40 text-secondary text-sm font-heading tracking-widest uppercase clip-corner transition-all duration-300 group/btn bg-secondary/5 hover:border-secondary"
              >
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity bg-secondary blur-md" />
                <LinkedIn className="text-[18px] relative z-10" />
                <span className="relative z-10 font-bold tracking-[0.2em]">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Education Timeline */}
        <div>
          <SectionHeader
            tag="Academic Journey"
            title="Education"
            align="left"
          />
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: '100%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[19px] md:left-[39px] top-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_15px_rgba(0,212,255,0.4)]"
            />

            <div className="space-y-8 md:space-y-12">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative pl-14 md:pl-24"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-5 top-8 z-10 flex items-center justify-center">
                    {/* Pulsing ring behind the dot */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                      className="absolute inset-0 rounded-xl border border-primary z-10 bg-transparent"
                    />

                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                      className="w-10 h-10 rounded-xl border border-primary bg-dark-400 flex items-center justify-center text-primary relative z-20"
                      style={{ boxShadow: '0 0 20px rgba(0,212,255,0.5)' }}
                    >
                      <motion.div
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute inset-0 bg-primary/20 blur-sm rounded-xl"
                      />
                      {edu.id === 1 ? <School className="text-xl relative z-10" /> :
                        edu.id === 2 ? <AutoStories className="text-xl relative z-10" /> :
                          <AccountBalance className="text-xl relative z-10" />}
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -5, boxShadow: '0 15px 30px -10px rgba(0, 212, 255, 0.15)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="glass-card p-6 md:p-8 min-h-[200px] md:min-h-[220px] flex flex-col justify-between relative overflow-hidden group gap-6 md:gap-0"
                  >
                    {/* Subtle decorative glow effect to match professional feel without changing core colors */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 z-10">
                      <div>
                        <h4 className="font-heading font-bold text-xl md:text-2xl text-white tracking-wide leading-tight mb-1 md:mb-0">{edu.degree}</h4>
                        <div className="text-primary text-sm md:text-base font-mono mt-1">{edu.field}</div>
                      </div>
                      <div className="md:text-right flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end mt-2 md:mt-0">
                        <div className="text-white/50 text-[11px] md:text-sm font-mono tracking-wider mb-0 md:mb-1">{edu.period}</div>
                        <div className="text-accent font-heading font-bold text-base md:text-xl">CGPA {edu.cgpa}</div>
                      </div>
                    </div>
                    <div className="text-white/70 text-sm md:text-base font-body border-t border-white/10 pt-4 z-10 w-full mt-auto flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="font-semibold text-white/90">{edu.institution}</span>
                      <span className="hidden sm:inline text-white/30">—</span>
                      <span className="text-white/60 text-xs sm:text-sm">{edu.location}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* At A Glance / Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative group"
        >
          <div
            className="glass-card p-6 sm:p-10 md:p-14 relative overflow-hidden backdrop-blur-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              boxShadow: '0 40px 100px -30px rgba(0,0,0,0.5)'
            }}
          >
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8 md:mb-12 relative z-10">
              <div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-[0.15em] sm:tracking-[0.3em] uppercase mb-2">
                  At A Glance
                </h3>
                <p className="text-primary font-mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase font-black opacity-80">Quick Technical & Personal Facts</p>
              </div>
              <div className="h-px flex-1 bg-white/10 mx-8 hidden lg:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
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
                  whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group/fact overflow-hidden relative"
                >
                  <div className="absolute inset-0 opacity-0 group-hover/fact:opacity-10 transition-opacity blur-md" style={{ backgroundColor: fact.color }} />

                  <div className="relative z-10 shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-dark-400 border border-white/5 text-xl sm:text-2xl group-hover/fact:scale-110 transition-transform duration-300" style={{ color: fact.color, boxShadow: `0 0 15px ${fact.color}30` }}>
                    {fact.icon}
                  </div>

                  <div className="relative z-10 overflow-hidden">
                    <span className="block text-white/40 text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-0.5 sm:mb-1">{fact.label}</span>
                    <span className="block text-white/90 text-sm sm:text-[15px] font-heading font-bold tracking-wide truncate">{fact.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Corner Decoration */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
