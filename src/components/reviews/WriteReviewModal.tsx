'use client'

import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import StarSelector from './StarSelector'

interface WriteReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const colleges = [
  'Chaudhary Charan Singh University',
  'Subharti University',
  'Mangalayatan University',
  'Shobhit University',
  'Mahaveer University',
  'Chaudhary Ranbir Singh University (CRSU), Rohtak',
  'Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur',
]

const courses = ['B.Tech', 'BCA', 'BBA', 'B.Com', 'B.Sc', 'MBA', 'M.Tech', 'MCA', 'LLB']

export default function WriteReviewModal({ isOpen, onClose }: WriteReviewModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [college, setCollege] = useState('')
  const [course, setCourse] = useState('')
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = 'Name is required'
    if (!email.includes('@')) newErrors.email = 'Valid email is required'
    if (!college) newErrors.college = 'Please select a college'
    if (!course) newErrors.course = 'Please select a course'
    if (!rating) newErrors.rating = 'Please select a rating'
    if (title.length < 5) newErrors.title = 'Title must be at least 5 characters'
    if (review.length < 50) newErrors.review = 'Review must be at least 50 characters'
    if (!isVerified) newErrors.verified = 'You must confirm you are a verified student'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would send this to Supabase
      console.log('Review submitted:', {
        name,
        email,
        college,
        course,
        rating,
        title,
        review,
      })

      setStep('success')
      setTimeout(() => {
        setStep('form')
        onClose()
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 pt-6 pb-4 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground mb-1">Share Your Experience</h2>
              <p className="text-sm text-muted-foreground">
                Help other students make the right choice
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  For verification only, not displayed publicly
                </p>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              {/* College */}
              <div>
                <Label htmlFor="college" className="text-sm font-medium">
                  College
                </Label>
                <select
                  id="college"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a college</option>
                  {colleges.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.college && (
                  <p className="text-xs text-destructive mt-1">{errors.college}</p>
                )}
              </div>

              {/* Course */}
              <div>
                <Label htmlFor="course" className="text-sm font-medium">
                  Course
                </Label>
                <select
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.course && (
                  <p className="text-xs text-destructive mt-1">{errors.course}</p>
                )}
              </div>

              {/* Rating */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Your Rating</Label>
                <StarSelector value={rating} onChange={setRating} />
                {errors.rating && (
                  <p className="text-xs text-destructive mt-1">{errors.rating}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Review Title
                  </Label>
                  <span className="text-xs text-muted-foreground">{title.length}/60</span>
                </div>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, 60))}
                  placeholder="e.g., Best decision of my life!"
                  className="mt-1"
                  maxLength={60}
                />
                {errors.title && (
                  <p className="text-xs text-destructive mt-1">{errors.title}</p>
                )}
              </div>

              {/* Review */}
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="review" className="text-sm font-medium">
                    Your Review
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {review.length}/500
                  </span>
                </div>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value.slice(0, 500))}
                  placeholder="Share your experience... (min 50 characters)"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                  maxLength={500}
                />
                {errors.review && (
                  <p className="text-xs text-destructive mt-1">{errors.review}</p>
                )}
              </div>

              {/* Verified Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="verified"
                  checked={isVerified}
                  onCheckedChange={(checked) => setIsVerified(checked as boolean)}
                />
                <Label
                  htmlFor="verified"
                  className="text-sm font-medium cursor-pointer"
                >
                  I am a verified student
                </Label>
              </div>
              {errors.verified && (
                <p className="text-xs text-destructive">{errors.verified}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit My Review'}
              </Button>
            </form>
          </>
        ) : (
          <>
            {/* Success Screen */}
            <div className="p-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">
                Thank you, {name}!
              </h3>
              <p className="text-muted-foreground mb-4">
                Your review has been submitted.
              </p>
              <p className="text-sm text-muted-foreground">
                It will appear after a quick verification. ✓
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
