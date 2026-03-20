'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { X } from 'lucide-react'

interface LoginPromptModalProps {
  isOpen: boolean
  onClose: () => void
  reviewData: {
    rating: number
    college: string
    course: string
    title: string
    review: string
  }
}

export default function LoginPromptModal({
  isOpen,
  onClose,
  reviewData,
}: LoginPromptModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen)

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div
          className="bg-white dark:bg-card rounded-lg shadow-2xl max-w-md w-full pointer-events-auto animate-in slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="font-heading text-2xl font-bold">Almost There! 🎓</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-foreground/80">
              To submit your review, please login or create a free account. Your
              review is saved and will be submitted automatically after you sign
              in.
            </p>

            {/* Review Preview */}
            <div className="bg-muted rounded-lg p-4 space-y-2 border border-border">
              <p className="text-sm text-muted-foreground">Your review</p>
              <p className="font-semibold text-sm">
                {reviewData.rating}★ - {reviewData.title}
              </p>
              <p className="text-sm text-foreground/70 line-clamp-2">
                {reviewData.review}
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Link href="/auth/login?redirect=/" className="block">
                <Button className="w-full" size="lg">
                  Login to Submit
                </Button>
              </Link>
              <Link href="/auth/sign-up?redirect=/" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Create Free Account
                </Button>
              </Link>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted-foreground text-center">
              It takes less than 1 minute
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
