import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'
// import CursorGlow from './components/CursorGlow'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-dark-500 overflow-hidden">
        <ParticleBackground />
        {/* <CursorGlow /> */}
        <div className="bg-grid fixed inset-0 pointer-events-none z-0" />
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(123,47,255,0.08) 0%, transparent 60%)'
          }}
        />
        <Navbar />
        <main className="relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#141829',
              color: '#e2e8f0',
              border: '1px solid rgba(0,212,255,0.2)'
            }
          }}
        />
      </div>
    </Router>
  )
}
