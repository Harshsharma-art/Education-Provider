'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReviewCard from './ReviewCard'
import { mockReviews } from '@/components/lib/reviews/mockData'

export default function ReviewCarousel() {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScroll) return

    const interval = setInterval(() => {
      if (scrollContainer.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10

        scrollContainer.current.scrollBy({
          left: 400,
          behavior: 'smooth',
        })

        if (isAtEnd) {
          setTimeout(() => {
            if (scrollContainer.current) {
              scrollContainer.current.scrollTo({ left: 0, behavior: 'smooth' })
            }
          }, 500)
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoScroll])

  const scroll = (direction: 'left' | 'right') => {
    setIsAutoScroll(false)
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      })
    }
    setTimeout(() => setIsAutoScroll(true), 8000)
  }

  useEffect(() => {
    const container = scrollContainer.current
    if (!container) return
    container.addEventListener('scroll', checkScroll)
    return () => container.removeEventListener('scroll', checkScroll)
  }, [])

  // Apply scrollbar hiding styles on client mount
  useEffect(() => {
    if (typeof document === 'undefined') return
    const style = document.createElement('style')
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Carousel Container */}
      <div className="relative group">
        <div
          ref={scrollContainer}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {mockReviews.map((review, index) => (
            <div key={review.id} className="snap-center">
              <ReviewCard review={review} index={index} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}

        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2">
        {mockReviews.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary/50 transition-colors"
            onClick={() => {
              if (scrollContainer.current) {
                scrollContainer.current.scrollTo({
                  left: index * 400,
                  behavior: 'smooth',
                })
              }
              setIsAutoScroll(false)
            }}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
