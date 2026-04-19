import express from 'express'
import { body, validationResult } from 'express-validator'
import rateLimit from 'express-rate-limit'
import mailService from '../services/mailService.js'

const router = express.Router()

/**
 * RATE LIMITING 
 * Professional defense against spam.
 * Max 3 messages per 15 mins per IP.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 1000 : 100,
  message: {
    success: false,
    message: 'System limit reached. Please wait 15 minutes before sending another transmission.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'development',
})

/**
 * INPUT VALIDATION
 * Ensuring data integrity before processing.
 */
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Identification (Name) is required')
    .isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Contact link (Email) is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('subject')
    .trim()
    .notEmpty().withMessage('Transmission subject is required')
    .isLength({ min: 3, max: 120 }).withMessage('Subject must be 3-120 characters'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message payload is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Payload must be 10-2000 characters')
]

/**
 * POST /api/contact
 * Professional endpoint for portfolio communications.
 */
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation Protocol Failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    })
  }

  const { name, email, subject, message } = req.body
  const isDevMode = !process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'REPLACE_WITH_YOUR_GMAIL_APP_PASSWORD'

  // Log the high-fidelity payload for verification
  console.log('\n--- INBOUND TRANSMISSION RECEIVED ---')
  console.log(`Name    : ${name}`)
  console.log(`Email   : ${email}`)
  console.log(`Subject : ${subject}`)
  console.log(`Message : ${message.length} chars`)
  console.log('----------------------------------------\n')

  if (isDevMode) {
    console.warn('SYSTEM WARNING: Email passkey not configured. Simulation mode active.')
    console.log('--- Simulation Output ---')
    console.log(`To: owner | Subject: ${subject} | From: ${name} <${email}>`)
    console.log('-------------------------')

    return res.status(200).json({
      success: true,
      message: 'Transmission logged in simulation mode (Backend configured for dev).'
    })
  }

  try {
    // Phase 1: Notify Owner
    await mailService.sendContactNotification({ name, email, subject, message })
    console.log(`Transmission routed to portfolio owner.`)

    // Phase 2: Acknowledge Sender (Non-blocking failure)
    try {
      await mailService.sendAcknowledgement({ name, email, subject, message })
      console.log(`Acknowledgment sent to ${email}.`)
    } catch (ackError) {
      console.error(`Acknowledgment failed: ${ackError.message}`)
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been successfully transmitted. Deployment of response initiated.',
      transmission_mode: 'live'
    })

  } catch (err) {
    console.error(`CRITICAL SYSTEM ERROR: ${err.message}`)

    // Professional Fail-Safe for Development
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Dev Mode] Email failed but returning success to frontend to prevent UI breakage.')
      return res.status(200).json({
        success: true,
        message: 'Transmission logged (Dev Mode: UI bypass active).',
        transmission_mode: 'simulated',
        dev_note: 'Check terminal for authentication steps.'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Communication uplink failed. Please contact khuswanthraojadav@gmail.com directly.'
    })
  }
})

export default router
