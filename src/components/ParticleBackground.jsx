import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationId
    let particles = []
    let isTabActive = true

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 22 : 42
    const connectionDistSq = isMobile ? 6400 : 10000 // 80px / 100px squared
    const maxDist = isMobile ? 80 : 100

    const resize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * (canvas.width || window.innerWidth)
        this.y = Math.random() * (canvas.height || window.innerHeight)
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.25
        this.speedY = (Math.random() - 0.5) * 0.25
        this.opacity = Math.random() * 0.4 + 0.1
        this.color = Math.random() > 0.5
          ? `rgba(0, 212, 255, ${this.opacity})`
          : `rgba(123, 47, 255, ${this.opacity})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    resize()
    particles = Array.from({ length: particleCount }, () => new Particle())

    // High-performance batched connection drawing using squared distance (no Math.sqrt in loop)
    function drawConnections() {
      const len = particles.length
      ctx.lineWidth = 0.5

      for (let i = 0; i < len; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / maxDist) * 0.12
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!isTabActive) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      
      drawConnections()
      animationId = requestAnimationFrame(animate)
    }

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden
      if (isTabActive) {
        cancelAnimationFrame(animationId)
        animationId = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(animationId)
      }
    }

    animate()
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      style={{ opacity: 0.55 }}
    />
  )
}
