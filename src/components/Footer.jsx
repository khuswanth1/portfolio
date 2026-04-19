import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GitHub, LinkedIn, Mail, Phone, Email, KeyboardArrowUp, WhatsApp } from '@mui/icons-material'
import { portfolioData } from '../data'

const { personal } = portfolioData

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-primary/10 bg-dark-400/50 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="font-heading font-black text-2xl bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent mb-4 whitespace-nowrap">
              {personal.name}
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-body max-w-xs">
              Full Stack Developer passionate about building innovative solutions and meaningful digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white/60 text-xs tracking-widest uppercase mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {['/about', '/skills', '/experience', '/projects', '/certifications', '/contact'].map(path => (
                <Link
                  key={path}
                  to={path}
                  className="text-white/40 hover:text-primary text-sm font-body transition-colors duration-300 capitalize"
                >
                  {path.replace('/', '')}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading text-white/60 text-xs tracking-widest uppercase">Connect</h4>
            </div>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${personal.email}`} className="flex items-center gap-2 text-white/40 hover:text-primary text-sm transition-colors duration-300">
                <Email className="text-primary" sx={{ fontSize: '1.1rem' }} />
                {personal.email}
              </a>
              <a href={`tel:${personal.phone}`} className="flex items-center gap-2 text-white/40 hover:text-primary text-sm transition-colors duration-300">
                <Phone className="text-primary" sx={{ fontSize: '1.1rem' }} />
                {personal.phone}
              </a>
              <div className="flex items-end justify-between mt-6">
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 border border-primary/20 rounded flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    <GitHub sx={{ fontSize: '1.2rem' }} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 border border-primary/20 rounded flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    <LinkedIn sx={{ fontSize: '1.2rem' }} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={`https://wa.me/${personal.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 border border-primary/20 rounded flex items-center justify-center text-white/50 hover:text-[#25D366] hover:border-[#25D366]/50 transition-all duration-300"
                  >
                    <WhatsApp sx={{ fontSize: '1.2rem' }} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={`mailto:${personal.email}`}
                    className="w-9 h-9 border border-primary/20 rounded flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    <Mail sx={{ fontSize: '1.2rem' }} />
                  </motion.a>
                </div>

                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center bg-primary text-dark-500 rounded-sm shadow-[0_4px_15px_-5px_rgba(0,212,255,0.5)] transition-all duration-300"
                  aria-label="Back to Top"
                >
                  <KeyboardArrowUp />
                </motion.button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
