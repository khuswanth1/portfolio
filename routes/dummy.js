try {
  // 🚀 STEP 1: Respond immediately (NO WAIT)
  res.status(200).json({
    success: true,
    message: 'Message received successfully!',
    transmission_mode: 'instant'
  })

  // 🚀 STEP 2: Send emails in background (NO await)

  // Notify Owner
  mailService.sendContactNotification({ name, email, subject, message })
    .then(() => console.log("✅ Owner email sent"))
    .catch(err => console.error("❌ Owner email failed:", err.message))

  // Acknowledge User
  mailService.sendAcknowledgement({ name, email })
    .then(() => console.log("✅ Acknowledgement sent"))
    .catch(err => console.error("❌ Acknowledgement failed:", err.message))

} catch (err) {
  console.error(`CRITICAL SYSTEM ERROR: ${err.message}`)

  return res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again.'
  })
}