import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHub, OpenInNew, Code, Check, Settings, AccountBalance, SportsEsports, FactCheck, Architecture, Person, LocalPharmacy, TaskAlt } from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import { portfolioData } from '../data'

const { projects } = portfolioData

function ProjectCard({ project, index, onViewDetails }) {
  // Map project ID to a solid/accent color for custom glow styling
  const getAccentColor = (id) => {
    switch (id) {
      case 1: return '#00d4ff' // Cyan
      case 2: return '#ff00f7' // Pink
      case 3: return '#10b981' // Emerald
      case 4: return '#f59e0b' // Amber
      default: return '#6366f1' // Indigo
    }
  }

  const accentColor = getAccentColor(project.id)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card overflow-hidden group relative transition-all duration-500 hover:-translate-y-2.5 border border-white/5 hover:border-white/10 rounded-2xl flex flex-col h-full bg-white/[0.01]"
      style={{
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`,
      }}
    >
      {/* Dynamic Radial Background Glow on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 10%, ${accentColor}15 0%, transparent 60%)`
        }}
      />

      {/* Top Accent Neon Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="p-6 sm:p-8 relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-5 gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-4">
              {/* Icon Container with Glow */}
              <div 
                className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-inner group-hover:border-white/20 transition-colors"
                style={{
                  boxShadow: `0 0 15px ${accentColor}1a`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-15`} />
                <div className="text-2xl drop-shadow-md z-10 flex items-center justify-center">
                  {project.id === 1 ? <AccountBalance fontSize="inherit" style={{ color: '#00d4ff' }} /> :
                    project.id === 2 ? <SportsEsports fontSize="inherit" style={{ color: '#ff00f7' }} /> :
                    project.id === 3 ? <LocalPharmacy fontSize="inherit" style={{ color: '#10b981' }} /> :
                    project.id === 4 ? <TaskAlt fontSize="inherit" style={{ color: '#f59e0b' }} /> :
                      <Code fontSize="inherit" className="text-primary" />}
                </div>
              </div>

              {/* Category Tag */}
              <span 
                className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border bg-white/5 border-white/10"
                style={{ color: accentColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                {project.category}
              </span>
            </div>

            <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide leading-tight group-hover:text-white/95 transition-colors">
              {project.title}
            </h3>
            <div className="text-white/50 font-mono text-[10px] tracking-wider mt-1">
              {project.subtitle}
            </div>
          </div>

          {/* GitHub Icon Link */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, rotate: 5, backgroundColor: 'rgba(255,255,255,0.08)' }}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 flex-shrink-0 backdrop-blur-md"
            style={{
              boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`
            }}
          >
            <GitHub fontSize="small" />
          </motion.a>
        </div>

        {/* Description */}
        <p className="text-white/60 font-body text-xs sm:text-[13px] leading-relaxed mb-6 pt-5 border-t border-white/5">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] font-mono font-medium rounded-md border border-white/5 text-white/60 bg-white/[0.02] group-hover:border-white/10 hover:text-white transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Features toggle / Open Modal */}
        <button
          onClick={onViewDetails}
          className="w-full py-3 flex items-center justify-center gap-2 text-[10px] font-mono font-bold text-white/50 hover:text-white transition-all duration-300 tracking-wider bg-white/[0.02] hover:bg-white/[0.05] rounded-xl border border-white/5 hover:border-white/10 mt-2"
        >
          <Code className="text-white/30" fontSize="small" />
          View Details
          <OpenInNew fontSize="small" className="scale-75 opacity-60 ml-0.5" />
        </button>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  // Helper to retrieve project specific theme color for modal elements
  const getModalAccentColor = (id) => {
    switch (id) {
      case 1: return '#00d4ff'
      case 2: return '#ff00f7'
      case 3: return '#10b981'
      case 4: return '#f59e0b'
      default: return '#6366f1'
    }
  }

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="What I've Built"
          title="My Projects"
          subtitle="Real-world web applications and backend architectures showcasing end-to-end design, database persistence, and system logic."
        />

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={i} 
                onViewDetails={() => setSelectedProject(project)}
              />
            ))}

            {/* More Coming Soon Card */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 flex flex-col items-center justify-center text-center min-h-[320px] border-dashed border-white/10 hover:border-primary/20 rounded-2xl cursor-default hover:bg-white/[0.01] transition-all duration-500"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="text-5xl mb-5 text-white/30"
              >
                <Settings fontSize="inherit" />
              </motion.div>
              <h3 className="font-heading font-black text-lg text-white/50 tracking-wider mb-2 uppercase">More Coming Soon</h3>
              <p className="text-white/30 text-xs sm:text-[13px] font-body max-w-xs leading-relaxed">
                Currently architecting new enterprise applications with Spring Boot & React.js.
              </p>
              <div className="mt-5 flex gap-2">
                <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Modal Popup Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              {/* Click outside to close */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                onClick={() => setSelectedProject(null)}
              />

              {/* Modal Card Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto glass-card rounded-2xl border border-white/10 p-5 sm:p-6 md:p-8 z-10 bg-[#08090d]/98 shadow-[0_0_50px_rgba(0,212,255,0.12)] flex flex-col"
              >
                {/* Top Accent Gradient Border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedProject.gradient}`}
                />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-white/50 hover:text-white bg-white/5 hover:bg-white/15 transition-all z-20"
                >
                  ✕
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6 mt-2">
                  <div 
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-lg"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} opacity-20`} />
                    <div className="text-3xl z-10 flex items-center justify-center">
                      {selectedProject.id === 1 ? <AccountBalance fontSize="inherit" style={{ color: '#00d4ff' }} /> :
                        selectedProject.id === 2 ? <SportsEsports fontSize="inherit" style={{ color: '#ff00f7' }} /> :
                        selectedProject.id === 3 ? <LocalPharmacy fontSize="inherit" style={{ color: '#10b981' }} /> :
                        selectedProject.id === 4 ? <TaskAlt fontSize="inherit" style={{ color: '#f59e0b' }} /> :
                          <Code fontSize="inherit" className="text-primary" />}
                    </div>
                  </div>
                  <div>
                    <span 
                      className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border bg-white/5 border-white/10"
                      style={{ color: getModalAccentColor(selectedProject.id) }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getModalAccentColor(selectedProject.id) }} />
                      {selectedProject.category}
                    </span>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1.5">
                      {selectedProject.title}
                    </h3>
                    <p className="text-white/50 font-mono text-xs tracking-wider mt-0.5">
                      {selectedProject.subtitle}
                    </p>
                  </div>
                </div>

                {/* Scrollable Details Body */}
                <div className="space-y-6 overflow-y-auto pr-1">
                  <div>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white/40 mb-2">About the Project</h4>
                    <p className="text-white/70 font-body text-[13px] leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white/40 mb-3">Key Features & Implementations</h4>
                    <div className="space-y-2.5">
                      {selectedProject.features.map((feature, i) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3.5 text-xs sm:text-[13px] text-white/80 font-body leading-relaxed bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl"
                        >
                          <Check 
                            className="flex-shrink-0 mt-[2px]" 
                            fontSize="small" 
                            style={{ color: getModalAccentColor(selectedProject.id) }} 
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white/40 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-white/5 text-white/70 bg-white/[0.03]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 pt-5 border-t border-white/5 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-xs font-mono font-bold text-white/50 hover:text-white transition-all bg-white/5 hover:bg-white/10"
                  >
                    Close
                  </button>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-black hover:text-black bg-white hover:bg-white/90 transition-all flex items-center gap-2"
                  >
                    <GitHub fontSize="small" />
                    <span>View Source</span>
                    <OpenInNew fontSize="small" className="scale-75" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Project Highlights / Development Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 relative overflow-hidden rounded-2xl border border-white/5"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-8 sm:mb-10 tracking-[0.2em] text-center uppercase">
            Development Philosophy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
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
                className="text-center group bg-white/[0.005] hover:bg-white/[0.015] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="text-4xl mb-4 text-white/50 group-hover:scale-110 group-hover:text-primary transition-all duration-500">{item.icon}</div>
                <h4 className="font-heading font-black text-white text-base mb-2 tracking-wider uppercase">{item.title}</h4>
                <p className="text-white/40 text-xs sm:text-[13px] font-body leading-relaxed group-hover:text-white/60 transition-colors">{item.desc}</p>
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
          <p className="text-white/30 font-body text-xs sm:text-sm mb-4 tracking-wider font-bold uppercase">Find all my work on GitHub</p>
          <motion.a
            href="https://github.com/khuswanth1"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 py-4 border border-primary/40 text-primary font-heading font-black tracking-[0.2em] text-xs sm:text-sm rounded-xl hover:bg-primary/10 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] w-full sm:w-auto max-w-[320px] mx-auto"
          >
            <GitHub fontSize="small" />
            <span>View All Repositories</span>
            <OpenInNew fontSize="small" />
          </motion.a>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
