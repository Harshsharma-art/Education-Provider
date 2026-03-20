import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Sparkles, TrendingUp, Users, FileText } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TrustBadgesStrip from '@/components/reviews/TrustBadgesStrip'
import ReviewsSection from '@/components/reviews/ReviewsSection'
import ReviewForm from '@/components/reviews/ReviewForm'
import CounsellorSection from '@/components/sections/CounsellorSection'
import StudentSuccessSection from '@/components/sections/StudentSuccessSection'
import EnhancedFeaturesSection from '@/components/sections/EnhancedFeaturesSection'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TrustBadgesStrip />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Welcome to Education Provider</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect College Match
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover colleges, compare programs, and get personalized admission guidance. Our AI-powered platform makes college selection simple and effective.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/sign-up">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/colleges">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Colleges
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground">Top Colleges</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary">10K+</div>
              <p className="text-sm text-muted-foreground">Students Guided</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary">98%</div>
              <p className="text-sm text-muted-foreground">Admission Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Counsellor Section - NEW */}
      <CounsellorSection />

      {/* Student Success Section - NEW */}
      <StudentSuccessSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Enhanced Features Section - REDESIGNED */}
      <EnhancedFeaturesSection />


      {/* Review Submission Form Section */}
      <section id="query-form" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
              Share Your Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help other students make informed decisions about their college choice
            </p>
          </div>
          <ReviewForm />
        </div>
      </section>

      {/* CTA Section */}
      <section id="explore" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Ready to Find Your Dream College?</h2>
          <p className="text-primary-foreground/80 mb-8">
            Join thousands of students who've successfully navigated their college journey with Education Provider
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Today
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
