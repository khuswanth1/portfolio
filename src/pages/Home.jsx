import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import {
  GitHub,
  LinkedIn,
  ArrowForward,
  FileDownload,
  Person,
  Bolt,
  BusinessCenter,
  RocketLaunch,
  EmojiEvents,
  Send
} from '@mui/icons-material'
import PageWrapper from '../components/PageWrapper'
import { portfolioData } from '../data'
import profileImg from '../assets/Khuswanth.jpeg'
import resume from '../assets/Khuswanth_Rao.pdf'

const { personal, stats } = portfolioData

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Decorative rings - hidden on smaller mobile to save performance/clarity */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {[400, 600, 800].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
              className={`absolute rounded-full border border-primary/5 ${i === 2 ? 'hidden sm:block' : ''}`}
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 py-10 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="lg:col-span-7 text-center lg:text-left"
            >
              {/* Tag line */}
              <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <span className="font-mono text-primary/70 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase border border-primary/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded inline-block bg-primary/5">
                  &lt; Full Stack Developer /&gt;
                </span>
              </motion.div>

              {/* Name */}
              <motion.div
                variants={itemVariants}
                className="mb-6 lg:mb-8"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight bg-gradient-to-b from-primary/40 via-white via-50% to-primary/40 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:drop-shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all duration-500 cursor-default px-2 sm:px-0">
                  Khuswanth Rao Jadav
                </h1>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8 min-h-[3rem] px-4 lg:px-0">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="h-px w-8 bg-primary/30" />
                  <span className="font-mono text-primary/60 text-[10px] tracking-[0.3em] uppercase">Specialization</span>
                </div>
                <span className="font-mono text-white/50 text-xs sm:text-base md:text-lg leading-relaxed block">
                  <TypeAnimation
                    sequence={[
                      'Building enterprise applications with Java & Spring Boot',
                      2500,
                      'Designing RESTful APIs for scalable backends',
                      2500,
                      'Crafting responsive frontends with React',
                      2500,
                      'Solving problems, one line of code at a time',
                      2500
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-white/80 font-medium whitespace-normal md:whitespace-nowrap"
                  />
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-10 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-white/60 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase">
                    Available for New Roles
                  </span>
                </div>
                <span className="text-white/20 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
                  Tirupati, India
                </span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-14">
                <Link to="/projects" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-dark-500 font-heading font-bold tracking-widest text-sm uppercase clip-corner transition-all duration-300"
                  >
                    View Projects
                    <ArrowForward sx={{ fontSize: 18 }} />
                  </motion.button>
                </Link>
                <a href={resume} download className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 border border-primary/50 text-white font-heading font-semibold tracking-widest text-sm uppercase clip-corner hover:bg-primary/10 transition-all duration-300"
                  >
                    <FileDownload sx={{ fontSize: 18 }} />
                    Resume
                  </motion.button>
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="hidden md:block h-[1px] w-12 bg-gradient-to-r from-transparent to-[#00d4ff40]" />
                <motion.a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-xl flex items-center justify-center text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all duration-400 group"
                >
                  <GitHub sx={{ fontSize: 20 }} className="sm:text-[22px]" />
                </motion.a>
                <motion.a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-xl flex items-center justify-center text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all duration-400"
                >
                  <LinkedIn sx={{ fontSize: 20 }} className="sm:text-[22px]" />
                </motion.a>
                <div className="h-[1px] w-12 sm:w-32 bg-gradient-to-r from-[#00d4ff40] to-transparent" />
              </motion.div>

            </motion.div>

            {/* Unified Profile Image Section (Handles both Mobile & Desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-5 relative order-first lg:order-none flex justify-center lg:justify-end"
            >
              <div className="relative z-10 w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
                {/* Fixed position glowing aura - responsive intensity */}
                <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full opacity-40 lg:opacity-60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/5 to-transparent blur-3xl rounded-full opacity-50 lg:opacity-100" />

                <div className="relative">
                  {/* Premium Framing */}
                  <div className="absolute -inset-1 border-t border-l border-primary/20 rounded-3xl" />
                  <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md rounded-3xl" />

                  <div className="relative rounded-3xl overflow-hidden p-3 shadow-[0_0_80px_rgba(0,0,0,0.4)] transition-all duration-700 hover:scale-[1.02]">
                    <img
                      src={profileImg}
                      alt="Khuswanth Rao Jadav"
                      className="w-full h-auto rounded-2xl block object-cover"
                    />
                  </div>

                  {/* High-tech status indicator overlay */}
                  <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 px-3 py-1.5 lg:px-4 lg:py-2 bg-dark-500/80 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]" />
                      <span className="text-white/60 font-mono text-[8px] lg:text-[9px] tracking-widest uppercase">Verified Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Quick Nav Cards */}
      <section className="py-10 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 sm:w-12 bg-primary/20" />
              <span className="font-mono text-primary/40 text-xs tracking-widest uppercase">Explore Portfolio</span>
              <div className="h-px w-8 sm:w-12 bg-primary/20" />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { path: '/about', label: 'About Me', desc: 'Education & background', icon: <Person />, color: '#00d4ff' },
              { path: '/skills', label: 'Technical Skills', desc: 'Languages & frameworks', icon: <Bolt />, color: '#7b2fff' },
              { path: '/experience', label: 'Experience', desc: '4 Professional Roles', icon: <BusinessCenter />, color: '#ff6b35' },
              { path: '/projects', label: 'Projects', desc: 'Java applications', icon: <RocketLaunch />, color: '#ffd700' },
              { path: '/certifications', label: 'Certifications', desc: '6 credentials earned', icon: <EmojiEvents />, color: '#00ff88' },
              { path: '/contact', label: 'Contact', desc: 'Let\'s work together', icon: <Send />, color: '#ff4757' }
            ].map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={item.path}>
                  <motion.div
                    whileHover={{ y: -5, borderColor: item.color }}
                    className="glass-card p-6 cursor-pointer group border border-white/5 transition-all duration-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl text-white/40 group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </div>
                      <ArrowForward
                        sx={{ fontSize: 18 }}
                        className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white mb-1 tracking-wide" style={{ color: item.color }}>
                      {item.label}
                    </h3>
                    <p className="text-white/30 text-sm font-body">{item.desc}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </PageWrapper>
  )
}
