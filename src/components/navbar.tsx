'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, GraduationCap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setIsAuthenticated(!!user)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [supabase])

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      setIsAuthenticated(false)
      router.push('/')
    } catch (error) {
      // Silently fail
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div className="text-2xl font-bold font-heading text-primary">Education Provider</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/colleges" className="text-foreground hover:text-primary transition-colors">
              Colleges
            </Link>
            <Link href="/courses" className="text-foreground hover:text-primary transition-colors">
              Courses
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading && !isAuthenticated && (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={isLoading}
              >
                {isLoading ? 'Signing out...' : 'Sign Out'}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              href="/colleges"
              className="block text-foreground hover:text-primary transition-colors py-2"
            >
              Colleges
            </Link>
            <Link
              href="/courses"
              className="block text-foreground hover:text-primary transition-colors py-2"
            >
              Courses
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="block text-foreground hover:text-primary transition-colors py-2"
              >
                Dashboard
              </Link>
            )}
            <div className="flex gap-2 pt-2">
              {!isLoading && !isAuthenticated && (
                <>
                  <Link href="/auth/login" className="flex-1">
                    <Button variant="outline" className="w-full">Log In</Button>
                  </Link>
                  <Link href="/auth/sign-up" className="flex-1">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing out...' : 'Sign Out'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
