'use client'

import { useState, useEffect } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SortBar from './SortBar'
import { getApprovedReviews } from '@/components/lib/supabase/reviews'

interface Review {
  id: string
  college: string
  course: string
  rating: number
  title: string
  review: string
  is_verified: boolean
  helpful_count: number
  created_at: string
}

export default function ReviewGrid() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [sort, setSort] = useState<'recent' | 'helpful' | 'highest' | 'lowest'>('recent')
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null)

  useEffect(() => {
    loadReviews()
  }, [sort, page])

  const loadReviews = async () => {
    setIsLoading(true)
    try {
      const { reviews: newReviews, total: totalCount } = await getApprovedReviews(sort, page)
      setReviews(newReviews)
      setTotal(totalCount)
    } catch (error) {
      console.error('[v0] Error loading reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSortChange = (newSort: 'recent' | 'helpful' | 'highest' | 'lowest') => {
    setSort(newSort)
    setPage(0)
  }

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const getInitials = (review: Review) => {
    return review.college.split(' ').slice(0, 2).map(w => w[0]).join('')
  }

  const getAvatarColor = (review: Review) => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500']
    return colors[review.id.charCodeAt(0) % colors.length]
  }

  const isReviewExpanded = (reviewId: string) => expandedReviewId === reviewId
  const shouldTruncate = (text: string) => text.length > 150

  if (isLoading && reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading reviews...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <SortBar activeSort={sort} onSortChange={handleSortChange} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            {/* Avatar and Header */}
            <div className="flex gap-4 mb-4">
              <div className={`${getAvatarColor(review)} rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {getInitials(review)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold truncate">
                    {review.college}
                  </p>
                  {review.is_verified && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded-full flex-shrink-0">
                      Verified ✓
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{review.course}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground'
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{review.rating}.0</span>
            </div>

            {/* Review Date */}
            <p className="text-xs text-muted-foreground mb-3">
              {new Date(review.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>

            {/* Title */}
            <h3 className="font-semibold text-foreground mb-2">{review.title}</h3>

            {/* Review Text */}
            <p className="text-sm text-foreground/80 mb-4">
              {isReviewExpanded(review.id)
                ? review.review
                : shouldTruncate(review.review)
                  ? review.review.slice(0, 150) + '...'
                  : review.review}
            </p>

            {/* Read More Toggle */}
            {shouldTruncate(review.review) && (
              <button
                onClick={() =>
                  setExpandedReviewId(
                    isReviewExpanded(review.id) ? null : review.id
                  )
                }
                className="text-sm text-primary hover:underline mb-4"
              >
                {isReviewExpanded(review.id) ? 'Read less' : 'Read more'}
              </button>
            )}

            {/* Helpful Button */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-primary"
              >
                <ThumbsUp size={16} />
                <span className="text-xs">{review.helpful_count}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {reviews.length < total && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More Reviews'}
          </Button>
        </div>
      )}

      {reviews.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No reviews yet. Be the first to share your experience!
          </p>
        </div>
      )}
    </div>
  )
}
