import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    let mouseX = 0, mouseY = 0
    let trailX = 0, trailY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.1
      trailY += (mouseY - trailY) * 0.1
      trail.style.left = trailX + 'px'
      trail.style.top = trailY + 'px'
      requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateTrail()

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 pointer-events-none z-50 rounded-full"
        style={{
          background: 'rgba(0, 212, 255, 0.8)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
          transition: 'none'
        }}
      />
      <div
        ref={trailRef}
        className="fixed w-8 h-8 pointer-events-none z-50 rounded-full"
        style={{
          border: '1px solid rgba(0, 212, 255, 0.3)',
          transform: 'translate(-50%, -50%)',
          transition: 'none'
        }}
      />
    </>
  )
}
