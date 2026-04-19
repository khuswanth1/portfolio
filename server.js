import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import contactRouter from './routes/contact.js'
import portfolioRouter from './routes/portfolio.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false // disable for development
}))

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}))

// ─── Body Parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// ─── Request Logger ────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const ts = new Date().toISOString()
  console.log(`[${ts}] ${req.method} ${req.originalUrl}`)
  next()
})

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRouter)
app.use('/api/portfolio', portfolioRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Khuswanth Portfolio API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// ─── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  })
})

// ─── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  })
})

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════╗')
  console.log('║   Khuswanth Portfolio Backend — Online    ║')
  console.log(`╠═══════════════════════════════════════════╣`)
  console.log(`║  Port    : ${PORT}                             ║`)
  console.log(`║  Mode    : ${process.env.NODE_ENV || 'development'}               ║`)
  console.log(`║  Health  : http://localhost:${PORT}/api/health ║`)
  console.log('╚═══════════════════════════════════════════╝\n')
})

export default app
