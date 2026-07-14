import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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
  initial: { opacity: 0, y: 25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
}

function SkillBar({ skill, delay, color }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="group"
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div 
            className="flex items-center justify-center w-7 h-7 shrink-0 rounded-lg bg-white/5 border border-white/10 group-hover:border-opacity-100 transition-all duration-300"
            style={{ color: `${color}`, borderColor: `${color}30` }}
          >
            <MuiIcon name={skill.icon} style={{ fontSize: '1rem' }} />
          </div>
          <span className="font-heading text-white/95 font-bold tracking-normal text-xs truncate">{skill.name}</span>
        </div>
        <span className="font-mono font-bold text-[10px] tracking-normal shrink-0" style={{ color: color }}>{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 10px ${color}33`
          }}
        >
          {/* Animated glow tip dot */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,1)] bg-white"
            style={{ boxShadow: `0 0 12px ${color}` }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

const categories = [
  { key: 'languages', label: 'Languages', icon: 'Terminal', color: '#00f2ff' }, // Electric Cyan
  { key: 'frontend', label: 'Frontend', icon: 'Web', color: '#ff00f7' },    // Neon Magenta
  { key: 'frameworks', label: 'Frameworks', icon: 'Settings', color: '#7b2fff' }, // Bright Violet
  { key: 'tools', label: 'Tools & DB', icon: 'Build', color: '#ffe600' }      // Laser Yellow
]

const techBadges = [
  'Java', 'Python', 'JavaScript', 'HTML5', 'CSS3', 'React js', 'Bootstrap',
  'Spring Boot', 'Hibernate', 'JDBC', 'Servlets', 'JSP', 'MySQL', 'GitHub',
  'REST APIs', 'Agile', 'OOP', 'DSA', 'Git', 'Low-Code'
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('languages')
  const activeColor = categories.find(c => c.key === activeCategory).color

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="Skills & Expertise"
          title="Technical Proficiency"
          subtitle="A comprehensive overview of my technical arsenal, specialized in full-stack Java development and modern web technologies."
        />

        {/* Level 1: Core Technical Categories */}
        <div className="mb-16 md:mb-24">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 md:mb-16 pb-2 border-b border-white/5">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-4 py-2 flex items-center gap-2 font-heading text-xs font-bold tracking-normal transition-all duration-300 rounded-lg border ${
                  activeCategory === cat.key 
                    ? 'text-white border-white/10' 
                    : 'text-white/30 border-transparent hover:text-white/60'
                }`}
                style={{
                  backgroundColor: activeCategory === cat.key ? `${cat.color}0a` : 'transparent'
                }}
              >
                <MuiIcon name={cat.icon} style={{ fontSize: '1.1rem', color: activeCategory === cat.key ? cat.color : 'inherit' }} />
                {cat.label}
                {activeCategory === cat.key && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: cat.color, boxShadow: `0 0 15px ${cat.color}` }}
                  />
                )}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="glass-card p-6 sm:p-8 md:p-12 relative overflow-hidden rounded-2xl border border-white/5"
          >
            <div 
              className="absolute -top-24 -right-24 w-40 sm:w-64 h-40 sm:h-64 rounded-full blur-[80px] sm:blur-[120px] opacity-10 pointer-events-none"
              style={{ background: activeColor }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-8 sm:gap-y-10 relative z-10">
              {skills[activeCategory].map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={i * 0.05} color={activeColor} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Level 2: Soft Skills & Learning Roadmap */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 md:mb-20"
        >
          {/* Soft Skills */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5"
          >
            <h3 className="font-heading font-black text-lg sm:text-xl text-white mb-6 sm:mb-8 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-[#00f2ff11] text-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                <MuiIcon name="Groups" />
              </span>
              Professional Qualities
            </h3>
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {portfolioData.skills.softSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#00f2ff]/40 hover:bg-[#00f2ff]/5 transition-all duration-300 group relative overflow-hidden"
                >
                  <MuiIcon name={skill.icon} className="text-[#00f2ff]/80 group-hover:text-[#00f2ff] transition-all duration-300 relative z-10" style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 0 8px rgba(0,242,255,0.3))' }} />
                  <span className="text-white/80 group-hover:text-white transition-all duration-300 text-xs sm:text-sm font-bold tracking-normal relative z-10">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Learning Roadmap */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5"
          >
            <h3 className="font-heading font-black text-lg sm:text-xl text-white mb-6 sm:mb-8 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-[#ff00f711] text-[#ff00f7] shadow-[0_0_15px_rgba(255,0,247,0.2)]">
                 <MuiIcon name="Timeline" />
              </span>
              Learning Roadmap
            </h3>
            <motion.div 
              variants={containerVariants}
              className="space-y-3 sm:space-y-4"
            >
              {portfolioData.skills.learning.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#ff00f7]/[0.01] border border-[#ff00f7]/20 hover:border-[#ff00f7]/60 hover:bg-[#ff00f7]/[0.05] transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-[#ff00f7]/10 group-hover:bg-[#ff00f7]/20 flex items-center justify-center text-[#ff00f7] transition-colors relative z-10">
                    <MuiIcon name={item.icon} style={{ fontSize: '1.2rem' }} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="min-w-0 relative z-10">
                    <div className="text-white/80 group-hover:text-white transition-colors duration-300 text-xs font-bold tracking-normal truncate">{item.name}</div>
                    <div className="text-white/30 group-hover:text-white/60 transition-colors duration-300 text-[9px] items-center gap-2 font-bold tracking-normal flex mt-1">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#ff00f7] opacity-60 group-hover:opacity-100 transition-all" />
                      <span className="truncate">Status: Specialized Focus</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Level 3: Full arsenal Overview */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
             <h3 className="font-heading font-black text-2xl md:text-3xl text-white tracking-normal mb-4">
               The Tech Arsenal
            </h3>
            <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-[#00f2ff] via-[#ff00f7] to-[#7b2fff] mx-auto rounded-full shadow-[0_0_15px_rgba(0,242,255,0.4)]" />
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {techBadges.map((tech) => (
              <motion.div
                key={tech}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group overflow-hidden px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 glass-card font-mono text-xs text-white/70 font-bold border border-white/5 transition-all duration-300 cursor-default tracking-normal rounded-xl hover:border-[#00f2ff]/40 shadow-lg hover:shadow-[0_10px_30px_rgba(0,242,255,0.1)] bg-white/[0.01]"
              >
                <div className="absolute inset-0 bg-[#00f2ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[10px] pointer-events-none" />
                <span className="relative z-10 group-hover:text-white transition-all duration-300 pointer-events-none tracking-normal">
                  {tech}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Proficiency Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-10 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f2ff] via-[#ff00f7] to-[#ffe600]" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sm:mb-16 md:px-4">
            <div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-normal mb-2 sm:mb-3 uppercase">
                Proficiency Matrix
              </h3>
              <p className="text-white/30 font-body text-xs max-w-lg leading-relaxed tracking-normal">
                A granular mapping of core technical competencies across the full-stack development lifecycle.
              </p>
            </div>
            <div className="h-px flex-1 bg-white/5 mx-10 hidden lg:block" />
            <div className="flex items-center gap-4 text-white/10 hidden sm:flex">
               <MuiIcon name="Settings" style={{ fontSize: '2rem' }} />
               <MuiIcon name="AutoGraph" style={{ fontSize: '2rem' }} />
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative z-10"
          >
            {categories.map((cat) => (
              <div key={cat.key} className="relative group/matrix flex flex-col">
                <div 
                  className="absolute -inset-x-4 -inset-y-6 opacity-0 group-hover/matrix:opacity-100 transition-opacity duration-700 pointer-events-none border-t border-transparent group-hover/matrix:border-white/5"
                  style={{ background: `radial-gradient(ellipse at top, ${cat.color}08, transparent 70%)` }}
                />

                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 relative z-10">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/matrix:scale-110 shadow-lg"
                    style={{ background: `${cat.color}22`, border: `2px solid ${cat.color}44` }}
                  >
                    <MuiIcon name={cat.icon} style={{ color: cat.color, fontSize: '1.2rem', filter: `drop-shadow(0 0 8px ${cat.color}66)` }} className="sm:text-[1.5rem]" />
                  </div>
                  <span 
                    className="font-heading font-black text-xs tracking-normal" 
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>
                <motion.div 
                  variants={containerVariants}
                  className="space-y-2 sm:space-y-3 relative z-10"
                >
                  {skills[cat.key].map((skill) => (
                    <motion.div 
                      key={skill.name}
                      variants={itemVariants}
                      className="flex items-center gap-3 sm:gap-4 group/skill relative p-2 md:p-3 -ml-2 md:-ml-3 rounded-xl transition-all duration-300 cursor-default overflow-hidden"
                    >
                      <div 
                        className="absolute inset-0 border border-transparent rounded-xl transition-all duration-500 opacity-0 group-hover/skill:opacity-100 pointer-events-none scale-95 group-hover/skill:scale-100"
                        style={{ borderColor: cat.color, boxShadow: `0 0 10px ${cat.color}30, inset 0 0 15px ${cat.color}10` }}
                      />

                      <MuiIcon 
                        name={skill.icon} 
                        style={{ color: cat.color }} 
                        className="opacity-40 group-hover/skill:opacity-100 transition-all duration-500 scale-75 sm:scale-90 group-hover/skill:scale-110 shrink-0 relative z-10" 
                      />
                      <span className="text-white/70 group-hover/skill:text-white transition-all duration-300 text-xs font-bold font-mono tracking-normal break-words min-w-0 relative z-10">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Level 4: Spoken Languages */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 glass-card p-6 sm:p-10 border border-white/5 relative overflow-hidden text-center rounded-2xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-[2px] bg-gradient-to-r from-transparent via-[#ffe600] to-transparent shadow-[0_0_15px_#ffe600]" />
          
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-normal mb-8 sm:mb-10">
            Linguistic Proficiency
          </h3>
          
          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            {portfolioData.skills.spokenLanguages.map((lang) => (
              <motion.div
                key={lang.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center w-[calc(50%-0.5rem)] sm:w-auto sm:min-w-[160px] md:min-w-[180px] p-4 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-[#ffe600]/40 transition-all duration-500 group relative overflow-hidden flex-grow sm:flex-grow-0 hover:shadow-[0_10px_30px_rgba(255,230,0,0.05)]"
              >
                <div className="absolute inset-0 bg-[#ffe600]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
                
                <span className="text-[#ffe600]/80 group-hover:text-[#ffe600] font-black text-sm sm:text-base md:text-lg tracking-normal mb-2 sm:mb-3 group-hover:scale-110 transition-all duration-300 relative z-10">
                  {lang.name}
                </span>
                <div className="h-[2px] w-6 sm:w-8 bg-white/10 mb-3 sm:mb-4 group-hover:w-16 group-hover:bg-[#ffe600] group-hover:shadow-[0_0_8px_#ffe600] transition-all duration-500 relative z-10 rounded-full" />
                <span className="text-white/40 group-hover:text-white/90 font-mono text-xs font-bold tracking-normal transition-colors duration-300 relative z-10">
                  {lang.level}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
      </div>
    </PageWrapper>
  )
}
