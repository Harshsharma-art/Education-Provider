'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/src/components/navbar'
import Footer from '@/src/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'
import { User, FileText, Heart, Loader } from 'lucide-react'
import { createClient } from '@/src/components/lib/supabase/client'

interface UserData {
  email?: string
  created_at?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/auth/login')
          return
        }
        setUser(user)
      } catch (error) {
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router, supabase])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader className="w-8 h-8 text-primary animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Welcome back, {user.email?.split('@')[0]}!
            </h1>
            <p className="text-muted-foreground">
              Manage your profile and track your college journey
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="queries">
                <FileText className="w-4 h-4 mr-2" />
                My Queries
              </TabsTrigger>
              <TabsTrigger value="saved">
                <Heart className="w-4 h-4 mr-2" />
                Saved Colleges
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg font-semibold">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                    <p className="text-lg font-semibold">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Queries Tab */}
            <TabsContent value="queries">
              <Card>
                <CardHeader>
                  <CardTitle>Your Queries</CardTitle>
                  <CardDescription>
                    Track your admission inquiries and guidance requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No queries yet. Submit your first question!</p>
                    <Button className="mt-4">Submit Query</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Tab */}
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Colleges</CardTitle>
                  <CardDescription>
                    Colleges you've marked for further exploration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No saved colleges yet. Start exploring!</p>
                    <Button className="mt-4">Browse Colleges</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
