import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHub, OpenInNew, Code, Check, Settings, AccountBalance, SportsEsports, FactCheck, Architecture, Person } from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { projects } = portfolioData

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="glass-card overflow-hidden group relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(0,212,255,0.3)] border border-white/5"
    >
      {/* Dynamic Background Glow on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none`}
      />

      {/* Top Accent Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 sm:h-1 bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="p-5 sm:p-7 md:p-8 relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-5 gap-3 sm:gap-4">
          <div>
            <div className="text-[28px] sm:text-[32px] md:text-[36px] mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 origin-left drop-shadow-md">
              {project.id === 1 ? <AccountBalance fontSize="inherit" style={{ color: '#00d4ff' }} /> :
                project.id === 2 ? <SportsEsports fontSize="inherit" style={{ color: '#ff00f7' }} /> :
                  <Code fontSize="inherit" className="text-primary" />}
            </div>
            <span className="inline-block font-mono text-[8px] sm:text-[9px] text-white/50 tracking-[0.15em] sm:tracking-[0.2em] uppercase border border-white/10 bg-white/5 px-2 sm:px-2.5 py-1 rounded-sm shadow-sm">
              {project.category}
            </span>
            <h3 className="font-heading font-black text-lg sm:text-xl lg:text-2xl text-white mt-3 sm:mt-4 tracking-widest sm:tracking-wider uppercase leading-tight group-hover:text-white/90 transition-colors drop-shadow-sm">{project.title}</h3>
            <div className="text-primary font-mono text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-widest uppercase mt-1.5 sm:mt-2 opacity-80">{project.subtitle}</div>
          </div>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, rotate: 5, boxShadow: '0 0 15px rgba(0,212,255,0.2)' }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex-shrink-0 backdrop-blur-md"
          >
            <GitHub fontSize="small" className="scale-75 sm:scale-100" />
          </motion.a>
        </div>

        {/* Description */}
        <p className="text-white/60 font-body text-xs sm:text-[13px] leading-relaxed mb-5 sm:mb-6 pt-4 sm:pt-5 border-t border-white/5">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-2.5 py-1 text-[8px] sm:text-[10px] font-mono font-bold tracking-widest uppercase rounded-sm border border-white/5 text-white/70 bg-white/5 group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Features toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2.5 sm:py-3 flex items-center justify-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono font-bold text-primary/60 hover:text-primary transition-all duration-300 tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-black/20 hover:bg-primary/5 rounded-md border border-white/5 hover:border-primary/30"
        >
          <Code className={`${expanded ? "text-primary" : "text-white/40"} scale-75 sm:scale-100`} fontSize="small" />
          {expanded ? 'Hide Details' : 'View Details'}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            className="text-[8px] sm:text-[10px] ml-1"
          >▼</motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-3"
            >
              <div className="p-4 sm:p-5 bg-black/30 rounded-md border border-primary/10">
                <div className="space-y-2.5 sm:space-y-3">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13px] text-primary/80 font-body leading-relaxed"
                    >
                      <Check className="text-primary flex-shrink-0 mt-[1px] sm:mt-0.5 scale-90 sm:scale-100" fontSize="small" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="What I've Built"
          title="My Projects"
          subtitle="Real-world Java applications showcasing backend logic, OOP principles, and user-centric design."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {/* More Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[250px] border-dashed border-primary/20 cursor-default hover:bg-white/[0.01] transition-colors duration-500"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="text-[40px] sm:text-[50px] mb-3 sm:mb-4 text-primary/50"
            >
              <Settings fontSize="inherit" />
            </motion.div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-white/40 tracking-[0.15em] sm:tracking-widest uppercase mb-2">More Coming Soon</h3>
            <p className="text-white/20 text-xs sm:text-[13px] font-body px-4">
              Currently building new projects with Spring Boot & React.
            </p>
            <div className="mt-4 flex gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
          </motion.div>
        </div>

        {/* Project Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <h3 className="font-heading font-black text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-10 tracking-[0.2em] uppercase text-center sm:text-left">
            Development Philosophy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                icon: <Person fontSize="inherit" />,
                title: 'User-Centric',
                desc: 'Every project starts with the end-user in mind. Clean interfaces, intuitive flows.'
              },
              {
                icon: <Architecture fontSize="inherit" />,
                title: 'Clean Architecture',
                desc: 'OOP principles, separation of concerns, and maintainable code are non-negotiable.'
              },
              {
                icon: <FactCheck fontSize="inherit" />,
                title: 'Tested & Reviewed',
                desc: 'Code reviews, unit testing, and iterative refinement ensure quality output.'
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group bg-white/[0.01] hover:bg-white/[0.03] p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,212,255,0.05)]"
              >
                <div className="text-[40px] sm:text-[50px] mb-4 sm:mb-5 text-primary opacity-80 group-hover:scale-110 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all duration-500">{item.icon}</div>
                <h4 className="font-heading font-black text-white text-base sm:text-lg mb-2 sm:mb-3 tracking-[0.15em] sm:tracking-widest uppercase">{item.title}</h4>
                <p className="text-white/50 text-xs sm:text-[13px] md:text-sm font-body leading-relaxed group-hover:text-white/70 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/30 font-body text-xs sm:text-sm mb-3 sm:mb-4 tracking-wider uppercase font-bold">Find all my work on GitHub</p>
          <motion.a
            href="https://github.com/khuswanth1"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 border border-primary/40 text-primary font-heading font-black tracking-[0.1em] sm:tracking-[0.2em] text-[10px] sm:text-sm uppercase clip-corner hover:bg-primary/10 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] w-full sm:w-auto max-w-[300px] mx-auto"
          >
            <GitHub fontSize="small" className="scale-75 sm:scale-100" />
            <span className="truncate">View All Repositories</span>
            <OpenInNew fontSize="small" className="scale-75 sm:scale-100" />
          </motion.a>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
