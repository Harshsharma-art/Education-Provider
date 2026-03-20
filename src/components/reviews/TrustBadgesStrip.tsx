'use client'

import { Lock, Users, Star, CheckCircle, Globe } from 'lucide-react'

export default function TrustBadgesStrip() {
  const badges = [
    { icon: Lock, label: 'Verified Reviews' },
    { icon: Users, label: 'Real Students Only' },
    { icon: Star, label: '4.8/5 Average Rating' },
    { icon: CheckCircle, label: '1,240+ Reviews' },
    { icon: Globe, label: 'Trusted Across India' },
  ]

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-y border-primary/10 py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {badges.map(({ icon: Icon, label }, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
