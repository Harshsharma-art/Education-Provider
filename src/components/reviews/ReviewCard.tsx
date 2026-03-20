'use client'

import { Star, ThumbsUp, CheckCircle } from 'lucide-react'
import { Review } from '@/src/components/lib/reviews/mockData'
import { getInitials, getGradient } from '@/src/components/lib/reviews/mockData'
import { useState, useEffect } from 'react'

interface ReviewCardProps {
  review: Review
  index: number
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful)
  const [isHelpful, setIsHelpful] = useState(false)

  useEffect(() => {
    // Check localStorage for previous helpful clicks
    const saved = localStorage.getItem(`helpful-${review.id}`)
    if (saved) setIsHelpful(true)
  }, [review.id])

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpful((prev) => prev + 1)
      setIsHelpful(true)
      localStorage.setItem(`helpful-${review.id}`, 'true')
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-full md:w-96">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGradient(
              index
            )} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
          >
            {getInitials(review.name)}
          </div>
          <div>
            <p className="font-semibold text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">
              {review.course} → {review.college}
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Date */}
      <p className="text-xs text-muted-foreground mb-3">{review.date}</p>

      {/* Title */}
      <h3 className="font-semibold text-foreground mb-2">{review.title}</h3>

      {/* Review Text */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        {review.review}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-600" />
          <span className="text-xs text-muted-foreground">Verified</span>
        </div>

        <button
          onClick={handleHelpful}
          disabled={isHelpful}
          className={`flex items-center gap-1 text-xs transition-colors ${isHelpful
              ? 'text-primary'
              : 'text-muted-foreground hover:text-primary'
            }`}
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{helpful} helpful</span>
        </button>
      </div>
    </div>
  )
}
