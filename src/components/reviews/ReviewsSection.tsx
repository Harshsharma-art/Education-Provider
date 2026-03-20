'use client'

import { useState } from 'react'
import TrustBar from './TrustBar'
import ReviewGrid from './ReviewGrid'
import WriteReviewModal from './WriteReviewModal'

export default function ReviewsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-accent/5 to-background">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who have already found their perfect college with Education Provider
            </p>
          </div>

          {/* Trust Bar */}
          <TrustBar />

          {/* Review Grid */}
          <div className="mt-12">
            <ReviewGrid />
          </div>
        </div>
      </section>

      {/* Floating Write Review Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-medium flex items-center gap-2"
        aria-label="Write a review"
      >
        <span>✍️</span>
        <span className="hidden sm:inline">Write a Review</span>
        <span className="sm:hidden">Review</span>
      </button>

      {/* Modal */}
      <WriteReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
