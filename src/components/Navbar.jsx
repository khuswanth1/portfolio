import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Close, ArrowForward } from '@mui/icons-material'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/certifications', label: 'Certs' },
  { path: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
          ? 'py-3 bg-dark-500/90 backdrop-blur-2xl border-b border-primary/20 shadow-[0_10px_30px_-10px_rgba(0,212,255,0.1)]'
          : 'py-6 bg-transparent'
        }`}
    >
      {/* Background Scanning Animation (Only when scrolled) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent animate-scan" style={{ animationDuration: '3s' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Professional Shield Logo */}
        <Link to="/">
          <motion.div
            whileHover="hover"
            initial="initial"
            className="flex items-center gap-3 group"
          >
            <motion.div
              variants={{
                initial: { rotate: 0 },
                hover: { rotate: 90, transition: { duration: 0.8, ease: "circOut" } }
              }}
              className="w-10 h-10 relative"
            >
              {/* Complex Shield Geometry */}
              <div className="absolute inset-0 bg-primary/20 rounded-lg transform rotate-45 border border-primary/30 group-hover:border-primary transition-colors duration-500" />
              <div className="absolute inset-2 bg-primary/10 rounded-md transform -rotate-12 border border-primary/20" />
              <motion.div
                variants={{
                  initial: { rotate: 0 },
                  hover: { rotate: -90 }
                }}
                className="absolute inset-0 flex items-center justify-center font-heading font-black text-primary text-xl tracking-tighter"
              >
                K
              </motion.div>
              {/* Pulse Effect */}
              <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse" />
            </motion.div>

            <div className="flex flex-col leading-tight hidden sm:block">
              <span className="font-heading font-extrabold text-lg tracking-[0.2em] uppercase text-white group-hover:text-primary transition-colors duration-300">
                KHUSWANTH
              </span>
              <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-px w-3 bg-primary" />
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase">SYSTEMS.DEV</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`relative px-3 xl:px-4 py-2 font-heading text-[11px] xl:text-sm tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-primary font-bold' : 'text-white/60 hover:text-white'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      style={{ boxShadow: '0 0 8px #00d4ff' }}
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 xl:ml-4 px-4 xl:px-5 py-2 border border-primary/50 text-primary font-heading text-[11px] xl:text-sm tracking-widest uppercase hover:bg-primary/10 transition-all duration-300 clip-corner relative overflow-hidden group"
              style={{ boxShadow: '0 0 15px rgba(0,212,255,0.1)' }}
            >
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Contact Me</span>
            </motion.button>
          </Link>
        </div>

        {/* Mobile / Tablet Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-primary p-2 hover:bg-primary/10 rounded-md transition-colors duration-300 focus:outline-none"
        >
          {menuOpen ? <Close className="text-3xl drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]" /> : <Menu className="text-3xl drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]" />}
        </button>
      </div>

      {/* Responsive Mobile / Tablet Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="lg:hidden absolute top-full left-0 right-0 bg-dark-500/95 backdrop-blur-2xl border-t border-primary/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-y-auto"
            style={{ height: 'calc(100vh - 100%)' }}
          >
            <div className="px-6 py-8 flex flex-col gap-2 max-w-7xl mx-auto h-full pb-24">
              {/* Background Accent in Menu */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-6 py-4 font-heading tracking-widest uppercase text-sm md:text-base border-l-2 transition-all duration-300 relative overflow-hidden group ${isActive
                          ? 'border-primary text-primary bg-primary/10'
                          : 'border-transparent text-white/50 hover:border-primary/50 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {isActive && (
                         <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                      )}
                      <div className="flex items-center justify-between">
                        <span className="relative z-10 font-medium tracking-[0.2em]">{link.label}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="mobile-indicator"
                            className="w-2 h-2 rounded-full bg-primary relative z-10"
                            style={{ boxShadow: '0 0 8px #00d4ff' }}
                          />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.2, duration: 0.4 }}
                className="mt-6 pt-6 border-t border-primary/20"
              >
                <Link to="/contact" onClick={() => setMenuOpen(false)} className="block w-full">
                  <div className="relative group">
                    {/* Deep dynamic glow underneath */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" />
                    
                    <button className="relative w-full py-4 bg-dark-500 border-2 border-primary/80 group-hover:bg-primary group-hover:border-primary text-primary group-hover:text-dark-500 font-heading text-sm tracking-[0.3em] font-extrabold uppercase transition-all duration-500 clip-corner overflow-hidden">
                      {/* Diagonal sweep light effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-12" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] group-hover:drop-shadow-none">
                        Contact Me
                        <ArrowForward className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
