'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

interface StarSelectorProps {
  value: number
  onChange: (rating: number) => void
}

export default function StarSelector({ value, onChange }: StarSelectorProps) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform hover:scale-110"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={`w-8 h-8 transition-all ${
              star <= (hovered || value)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
