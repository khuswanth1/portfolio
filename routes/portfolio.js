import express from 'express'
import rateLimit from 'express-rate-limit'

const router = express.Router()

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: { success: false, message: 'Too many requests' }
})

router.use(apiLimiter)

const portfolioData = {
  personal: {
    name: 'Khuswanth Rao Jadav',
    title: 'Full Stack Java Developer',
    email: 'khuswanthraojadav@gmail.com',
    phone: '+91 7671085912',
    location: 'Lakshmi Puram, Tirupati - 517501',
    linkedin: 'https://www.linkedin.com/in/khuswanth-rao-jadav-991686250/',
    github: 'https://github.com/khuswanth1'
  },
  stats: {
    projects: 5,
    internships: 3,
    certifications: 6,
    cgpa: 8.31
  }
}

// GET /api/portfolio
router.get('/', (req, res) => {
  res.json({ success: true, data: portfolioData })
})

// GET /api/portfolio/stats
router.get('/stats', (req, res) => {
  res.json({ success: true, data: portfolioData.stats })
})

// GET /api/portfolio/personal
router.get('/personal', (req, res) => {
  res.json({ success: true, data: portfolioData.personal })
})

export default router
