'use client'

import { Button } from '@/src/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function CounsellorSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-background to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex flex-col items-center gap-6">
              {/* Profile Photo with gradient border */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-xl opacity-50" />
                <img
                  id="counsellor-photo"
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80"
                  alt="Senior Education Counsellor"
                  className="relative w-56 h-56 rounded-full border-4 border-transparent bg-gradient-to-br from-primary via-secondary to-accent p-1 bg-clip-padding object-cover"
                />
              </div>

              {/* Profile Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold font-heading text-foreground">Rajesh Kumar</h3>
                <p className="text-sm text-primary font-medium mt-1">Senior Education Counsellor</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 justify-center mt-4 text-xs font-medium text-muted-foreground">
                  <span className="bg-primary/10 px-3 py-1 rounded-full">🎓 10+ Years</span>
                  <span className="bg-primary/10 px-3 py-1 rounded-full">🏫 500+ Admits</span>
                  <span className="bg-accent/10 px-3 py-1 rounded-full">⭐ 4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - About Text */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">Meet Your Guide</p>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mt-3">
                Helping Students Find Their Perfect College Since 2014
              </h2>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed">
              With over a decade of experience in education counselling, I have helped 500+ students secure admissions in their dream colleges across India. From choosing the right course to cracking entrance exams — I guide you at every step, completely free of cost.
            </p>

            {/* Highlight Points */}
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Personalized one-on-one counselling sessions</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Expert knowledge of 100+ colleges across India</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground">End-to-end support from application to admission</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="#query-form">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                Book a Free Session →
              </Button>
            </Link>

            {/* Social Proof */}
            <div className="pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Featured in</p>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
                <span className="flex items-center gap-2">📰 Times of India</span>
                <span className="flex items-center gap-2">📰 Hindustan Times</span>
                <span className="flex items-center gap-2">📰 Shiksha.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
