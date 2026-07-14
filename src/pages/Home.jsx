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
  Send,
  Stars
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

const StatsIcon = ({ name, ...props }) => {
  const iconMap = {
    RocketLaunch: RocketLaunch,
    BusinessCenter: BusinessCenter,
    EmojiEvents: EmojiEvents,
    Stars: Stars
  }
  const IconComponent = iconMap[name] || Stars
  return <IconComponent {...props} />
}

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Decorative rings - hidden on smaller mobile */}
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
                <span className="font-mono text-primary/70 text-[10px] sm:text-xs md:text-sm tracking-normal border border-primary/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded inline-block bg-primary/5">
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
                  {personal.name}
                </h1>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8 px-4 lg:px-0">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="h-px w-8 bg-primary/30" />
                  <span className="font-mono text-primary/60 text-[10px] tracking-normal uppercase">Specialization</span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-black tracking-wide text-white/95 leading-relaxed min-h-[4rem] sm:min-h-[2.5rem]">
                  Architecting{' '}
                  <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 drop-shadow-[0_0_8px_rgba(0,212,255,0.2)]">
                    <TypeAnimation
                      sequence={[
                        'Spring Boot Microservices',
                        2500,
                        'Responsive React Web Apps',
                        2500,
                        'Scalable RESTful Architectures',
                        2500,
                        'Enterprise-grade Java Solutions',
                        2500
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </span>
                </h2>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-10 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-white/60 font-mono text-[9px] sm:text-[10px] tracking-normal uppercase">
                    Available for New Roles
                  </span>
                </div>
                <span className="text-white/20 font-mono text-[9px] sm:text-[10px] tracking-normal uppercase">
                  Tirupati, India
                </span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <Link to="/projects" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-dark-500 font-heading font-bold tracking-normal text-sm clip-corner transition-all duration-300"
                  >
                    View Projects
                    <ArrowForward sx={{ fontSize: 18 }} />
                  </motion.button>
                </Link>
                <a href={resume} download className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 border border-primary/50 text-white font-heading font-semibold tracking-normal text-sm clip-corner hover:bg-primary/10 transition-all duration-300"
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

            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-5 relative order-first lg:order-none flex justify-center lg:justify-end"
            >
              <div className="relative z-10 w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
                {/* Fixed position glowing aura */}
                <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full opacity-40 lg:opacity-60 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/5 to-transparent blur-3xl rounded-full opacity-50 lg:opacity-100 pointer-events-none" />

                <div className="relative">

                  <div className="relative rounded-[2rem] overflow-hidden p-2.5 shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-700 hover:scale-[1.02] bg-[#08090c]/90 border border-white/5 backdrop-blur-md">
                    <img
                      src={profileImg}
                      alt="Khuswanth Rao Jadav"
                      className="w-full h-auto rounded-xl block object-cover"
                    />
                  </div>

                  {/* High-tech status indicator overlay */}
                  <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 px-3 py-1.5 lg:px-4 lg:py-2 bg-dark-500/80 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]" />
                      <span className="text-white/60 font-mono text-[8px] lg:text-[9px] tracking-normal uppercase">Verified Expert</span>
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
              <span className="font-mono text-primary/40 text-xs tracking-normal uppercase">Explore Portfolio</span>
              <div className="h-px w-8 sm:w-12 bg-primary/20" />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { path: '/about', label: 'About Me', desc: 'Education & background', icon: <Person />, color: '#00d4ff' },
              { path: '/skills', label: 'Technical Skills', desc: 'Languages & frameworks', icon: <Bolt />, color: '#7b2fff' },
              { path: '/experience', label: 'Experience', desc: 'Professional journey', icon: <BusinessCenter />, color: '#ff6b35' },
              { path: '/projects', label: 'Projects', desc: 'Full-stack applications', icon: <RocketLaunch />, color: '#ffd700' },
              { path: '/certifications', label: 'Certifications', desc: 'Credentials & courses', icon: <EmojiEvents />, color: '#00ff88' },
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
                    whileHover={{ y: -6, borderColor: `${item.color}40` }}
                    className="glass-card p-6 cursor-pointer group border border-white/5 rounded-2xl transition-all duration-500 bg-white/[0.01] relative overflow-hidden"
                    style={{
                      boxShadow: `0 4px 20px rgba(0,0,0,0.15)`
                    }}
                  >
                    {/* Radial hover glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 10% 20%, ${item.color}33 0%, transparent 65%)`
                      }}
                    />

                    <div className="flex items-start justify-between mb-5">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-opacity-100 transition-colors shrink-0"
                        style={{ color: item.color, backgroundColor: `${item.color}0a`, borderColor: `${item.color}20` }}
                      >
                        {item.icon}
                      </div>
                      <ArrowForward
                        sx={{ fontSize: 18 }}
                        className="text-white/20 group-hover:text-white/80 group-hover:translate-x-1.5 transition-all duration-300"
                      />
                    </div>
                    <h3 className="font-heading font-black text-lg text-white mb-1.5 tracking-wide group-hover:text-white/90 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-white/40 text-xs sm:text-[13px] font-body leading-relaxed group-hover:text-white/60 transition-colors">{item.desc}</p>
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
