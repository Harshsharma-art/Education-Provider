'use client'

import { Star, CheckCircle } from 'lucide-react'
import { reviewStats } from '@/components/lib/reviews/mockData'

export default function TrustBar() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Rating */}
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-primary">{reviewStats.average}</span>
            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <CheckCircle className="w-4 h-4" />
              Based on {reviewStats.total}+ student reviews
            </p>
          </div>
        </div>

        {/* Right: Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-medium w-12">{stars} star</span>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full transition-all"
                  style={{
                    width: `${reviewStats.distribution[stars as keyof typeof reviewStats.distribution]}%`,
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-10 text-right">
                {reviewStats.distribution[stars as keyof typeof reviewStats.distribution]}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
        <CheckCircle className="w-4 h-4" />
        <span>All reviews are from verified students</span>
      </div>
    </div>
  )
}
