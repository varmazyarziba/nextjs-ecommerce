'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const images = [
  '/images/ardunio.png',
  '/images/elec2.png',
  '/images/sensor.png',
  
]

export default function Slider() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)
  const startX = useRef(0)
  const isHovering = useRef(false)

  /* ---------- autoplay ---------- */
  useEffect(() => {
    if (isHovering.current) return

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(intervalRef.current)
  }, [current])

  /* ---------- handlers ---------- */
  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  /* ---------- swipe ---------- */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX
    const diff = startX.current - endX

    if (diff > 50) nextSlide()
    if (diff < -50) prevSlide()
  }
 
  return (
    <div
      className="relative w-full max-w-3xl mt-12 mb-12 overflow-hidden shadow-xl inset-ring-2 inset-ring-purple-500 border-4 border-gray-300 rounded-2xl"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image */}
      <Image
        src={images[current]}
        alt="Slider image"
        width={1200}
        height={600}
        priority
        className="w-full h-auto object-cover transition-all duration-700 ease-in-out"
      />

      {/* Prev */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full"
      >
        <Image src="/images/previous.png" alt="prev" width={20} height={20} />
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full"
      >
        <Image src="/images/next.png" alt="next" width={20} height={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? 'bg-white scale-110' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
