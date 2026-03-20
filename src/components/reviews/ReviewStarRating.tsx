'use client'

import { Star } from 'lucide-react'

interface ReviewStarRatingProps {
  value: number
  onChange: (rating: number) => void
  error?: boolean
}

const ratingLabels: Record<number, { label: string; emoji: string }> = {
  1: { label: 'Poor', emoji: '😞' },
  2: { label: 'Fair', emoji: '😐' },
  3: { label: 'Good', emoji: '🙂' },
  4: { label: 'Very Good', emoji: '😊' },
  5: { label: 'Excellent!', emoji: '🤩' },
}

export default function ReviewStarRating({
  value,
  onChange,
  error,
}: ReviewStarRatingProps) {
  const label = value > 0 ? ratingLabels[value] : null

  return (
    <div className={`flex flex-col items-center gap-4 ${error ? 'shake' : ''}`}>
      <div className="flex gap-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => {
              if (value === 0) {
                // Highlight stars on hover
                document.querySelectorAll('[data-star]').forEach((el, idx) => {
                  if (idx < star) {
                    el.classList.add('hover-fill')
                  } else {
                    el.classList.remove('hover-fill')
                  }
                })
              }
            }}
            onMouseLeave={() => {
              document
                .querySelectorAll('[data-star]')
                .forEach((el) => el.classList.remove('hover-fill'))
            }}
            className="p-1 transition-transform hover:scale-110"
            aria-label={`Rate ${star} stars`}
            type="button"
          >
            <Star
              data-star={star}
              size={48}
              className={`transition-all duration-200 ${
                star <= value
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground hover-fill:fill-amber-400 hover-fill:text-amber-400'
              }`}
            />
          </button>
        ))}
      </div>

      {label && (
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {label.label} {label.emoji}
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">
          Please select a star rating to continue
        </p>
      )}

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }

        .shake {
          animation: shake 0.5s;
        }

        :global([data-star].hover-fill) {
          @apply fill-amber-400 text-amber-400;
        }
      `}</style>
    </div>
  )
}
