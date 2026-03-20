'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import ReviewStarRating from './ReviewStarRating'
import LoginPromptModal from './LoginPromptModal'
import { createClient } from '@/src/components/lib/supabase/client'
import { submitReview, getUserReview } from '@/src/components/lib/supabase/reviews'
import { CheckCircle } from 'lucide-react'

const COLLEGES = [
  'IIT Delhi',
  'IIT Bombay',
  'IIT Madras',
  'Delhi University',
  'BITS Pilani',
  'AIIMS Delhi',
  'Nirma University',
  'Vellore Institute',
  'Manipal University',
  'Amrita University',
]

const COURSES = [
  'Computer Science',
  'Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Medical',
  'Law',
  'Commerce',
  'Science',
  'Information Technology',
]

interface FormData {
  rating: number
  college: string
  course: string
  title: string
  review: string
}

interface FormErrors {
  rating?: string
  college?: string
  course?: string
  title?: string
  review?: string
}

const DRAFT_KEY = 'edupath_review_draft'

export default function ReviewForm() {
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    college: '',
    course: '',
    title: '',
    review: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isDraftRestored, setIsDraftRestored] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [existingReviewId, setExistingReviewId] = useState<string | null>(null)
  const supabase = createClient()

  // Load draft on mount and check for existing review
  useEffect(() => {
    const loadDraft = async () => {
      // Check if user is logged in and has existing review
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { review } = await getUserReview()
        if (review) {
          setFormData({
            rating: review.rating,
            college: review.college,
            course: review.course,
            title: review.title,
            review: review.review,
          })
          setExistingReviewId(review.id)
          setIsEditing(true)
          return
        }
      }

      // Restore draft from localStorage
      const draft = localStorage.getItem(DRAFT_KEY)
      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft)
          setFormData(parsedDraft)
          setIsDraftRestored(true)
        } catch (e) {
          console.error('[v0] Failed to parse draft:', e)
        }
      }
    }

    loadDraft()
  }, [supabase])

  // Save draft to localStorage as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.review || formData.title || formData.college) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formData))
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [formData])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a star rating'
    }
    if (!formData.college) {
      newErrors.college = 'Please select a college'
    }
    if (!formData.course) {
      newErrors.course = 'Please select a course'
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (formData.title.length > 80) {
      newErrors.title = 'Title must be less than 80 characters'
    }
    if (formData.review.length < 50) {
      newErrors.review = 'Review must be at least 50 characters'
    }
    if (formData.review.length > 500) {
      newErrors.review = 'Review must not exceed 500 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Check auth status
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setShowLoginModal(true)
      return
    }

    // Submit or update review
    setIsSubmitting(true)
    try {
      if (isEditing && existingReviewId) {
        // Update existing review (not implemented in this flow)
        console.log('[v0] Update review not implemented')
      } else {
        const result = await submitReview({
          college: formData.college,
          course: formData.course,
          rating: formData.rating,
          title: formData.title,
          review: formData.review,
        })

        if (result.error) {
          if (result.code === 'DUPLICATE') {
            setErrors({
              ...errors,
              review: 'You have already submitted a review. Contact support to edit it.',
            })
          } else {
            setErrors({
              ...errors,
              review: result.error,
            })
          }
        } else {
          // Success
          setSuccessMessage(`Thank you! Your review has been submitted and is under verification. It will go live within 24 hours.`)
          setSubmitSuccess(true)
          localStorage.removeItem(DRAFT_KEY)
          setFormData({
            rating: 0,
            college: '',
            course: '',
            title: '',
            review: '',
          })
          setTimeout(() => setSubmitSuccess(false), 8000)
        }
      }
    } catch (error) {
      console.error('[v0] Submit error:', error)
      setErrors({
        ...errors,
        review: 'An unexpected error occurred. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
            <CardTitle className="font-heading text-3xl">Rate Your Experience</CardTitle>
            <CardDescription>
              Your honest review helps thousands of students make better decisions
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {isDraftRestored && !isEditing && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  📝 We saved your draft! Continue where you left off.
                </p>
              </div>
            )}

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-900 dark:text-green-100">
                  ✅ {successMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Star Rating */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Your Rating</label>
                <ReviewStarRating
                  value={formData.rating}
                  onChange={(rating) =>
                    setFormData({ ...formData, rating })
                  }
                  error={!!errors.rating}
                />
                {errors.rating && (
                  <p className="text-sm text-destructive text-center">{errors.rating}</p>
                )}
              </div>

              {/* College and Course */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="college" className="text-sm font-medium">
                    College You Enrolled In
                  </label>
                  <Select
                    value={formData.college}
                    onValueChange={(value) =>
                      setFormData({ ...formData, college: value })
                    }
                  >
                    <SelectTrigger id="college" className={errors.college ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a college" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLLEGES.map((college) => (
                        <SelectItem key={college} value={college}>
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.college && (
                    <p className="text-sm text-destructive">{errors.college}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="course" className="text-sm font-medium">
                    Course / Degree
                  </label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) =>
                      setFormData({ ...formData, course: value })
                    }
                  >
                    <SelectTrigger id="course" className={errors.course ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSES.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.course && (
                    <p className="text-sm text-destructive">{errors.course}</p>
                  )}
                </div>
              </div>

              {/* Review Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Give Your Review a Title
                </label>
                <div className="relative">
                  <Input
                    id="title"
                    type="text"
                    placeholder="What's the main point of your review?"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value.slice(0, 80),
                      })
                    }
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  <span className="absolute right-3 top-3 text-xs text-muted-foreground">
                    {formData.title.length}/80
                  </span>
                </div>
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label htmlFor="review" className="text-sm font-medium">
                  Your Review
                </label>
                <div className="relative">
                  <Textarea
                    id="review"
                    placeholder="Share your experience in detail..."
                    value={formData.review}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        review: e.target.value.slice(0, 500),
                      })
                    }
                    className={`min-h-[120px] ${errors.review ? 'border-destructive' : ''}`}
                  />
                  <span className="absolute right-3 bottom-3 text-xs text-muted-foreground">
                    {formData.review.length}/500 characters
                  </span>
                </div>
                {errors.review && (
                  <p className="text-sm text-destructive">{errors.review}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Minimum 50 characters
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                size="lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit My Review 🚀'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        reviewData={formData}
      />
    </>
  )
}
