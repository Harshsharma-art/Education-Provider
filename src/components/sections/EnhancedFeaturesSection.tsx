'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Target, UserCheck, BookOpen, Bot, CalendarDays, Coins, PhoneCall, Trophy } from 'lucide-react'

const features = [
  {
    id: 1,
    icon: Target,
    title: 'Smart College Comparison',
    description: 'Compare colleges on 30+ factors including academics, costs, placements, infrastructure, and student life. Make data-driven decisions, not guesswork.',
    span: 'lg:col-span-2',
    bgGradient: 'bg-gradient-to-br from-blue-600 to-blue-400',
    cta: 'Compare Now →',
  },
  {
    id: 2,
    icon: UserCheck,
    title: 'Expert Guidance',
    description: 'Get personalized advice from education experts and successful alumni who\'ve been where you are.',
    span: 'lg:col-span-1',
    bgGradient: 'bg-card border border-border',
  },
  {
    id: 3,
    icon: BookOpen,
    title: 'Admission Resources',
    description: 'Access essays, application tips, and interview preparation materials curated by experts.',
    span: 'lg:col-span-1',
    bgGradient: 'bg-card border border-border',
  },
  {
    id: 4,
    icon: Bot,
    title: 'AI-Powered Matches',
    description: 'Our algorithm finds colleges that match your goals, budget, and academic profile perfectly.',
    span: 'lg:col-span-1',
    bgGradient: 'bg-gradient-to-br from-amber-600 to-amber-400',
  },
  {
    id: 5,
    icon: CalendarDays,
    title: 'Admission Deadline Tracker',
    description: 'Never miss an application deadline. Get automated reminders for all your target colleges.',
    span: 'lg:col-span-1',
    bgGradient: 'bg-card border border-border',
  },
  {
    id: 6,
    icon: Coins,
    title: 'Fee & Scholarship Finder',
    description: 'Discover hidden scholarships and compare true cost of attendance including hostel and living expenses.',
    span: 'lg:col-span-1',
    bgGradient: 'bg-card border border-border',
  },
  {
    id: 7,
    icon: PhoneCall,
    title: 'Free One-on-One Counselling',
    description: 'Book a personal session with our senior counsellor. No fees, no pressure, just honest guidance tailored to your goals and background.',
    span: 'lg:col-span-2',
    bgGradient: 'bg-gradient-to-br from-purple-600 to-purple-400',
    cta: 'Book Free Session →',
  },
  {
    id: 8,
    icon: Trophy,
    title: 'Placement Track Record',
    description: '500+ students placed in top colleges. View our verified success stories and outcomes.',
    span: 'lg:col-span-1',
    bgGradient: 'bg-card border-2 border-amber-500/30',
  },
]

export default function EnhancedFeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0')
          setVisibleCards((prev) => [...new Set([...prev, cardId])])
        }
      })
    })

    document.querySelectorAll('[data-card-id]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase">Why Choose Education Provider</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mt-3 mb-4">
            Everything You Need for College Admissions, in One Place
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From discovery to enrollment — we've got you covered
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
          {features.map((feature, idx) => {
            const isVisible = visibleCards.includes(feature.id)
            const isGradient = feature.bgGradient.includes('gradient')
            const textColor = isGradient ? 'text-white' : 'text-foreground'

            return (
              <div
                key={feature.id}
                data-card-id={feature.id}
                className={`
                  ${feature.span} p-8 rounded-2xl transition-all duration-700 transform
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
                  ${feature.bgGradient}
                  hover:scale-105 hover:shadow-xl
                `}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                <div className="flex flex-col h-full">
                  <div className={`mb-4 ${textColor}`}>
                    <feature.icon className="w-12 h-12" />
                  </div>
                  <h3 className={`text-xl font-bold font-heading mb-3 ${textColor}`}>
                    {feature.title}
                  </h3>
                  <p className={`${isGradient ? 'text-white/90' : 'text-muted-foreground'} flex-1 mb-4`}>
                    {feature.description}
                  </p>
                  {feature.cta && (
                    <Link href="#query-form">
                      <Button
                        variant={isGradient ? 'secondary' : 'outline'}
                        className="w-full"
                      >
                        {feature.cta}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
