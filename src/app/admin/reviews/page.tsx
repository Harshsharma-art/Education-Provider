'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Star, CheckCircle, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getPendingReviews, approveReview, rejectReview } from '@/lib/supabase/reviews'

interface PendingReview {
  id: string
  college: string
  course: string
  rating: number
  title: string
  review: string
  created_at: string
}

const ADMIN_PASSWORD = 'edupath2024' // In production, use proper auth

export default function AdminReviewsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [reviews, setReviews] = useState<PendingReview[]>([])
  const [approvedCount, setApprovedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      loadReviews()
    } else {
      alert('Invalid password')
    }
  }

  const loadReviews = async () => {
    setIsLoading(true)
    try {
      const { reviews: pendingReviews, total } = await getPendingReviews(page)
      setReviews(pendingReviews)
      setApprovedCount(total)
    } catch (error) {
      console.error('[v0] Error loading pending reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (reviewId: string) => {
    try {
      await approveReview(reviewId)
      setReviews(reviews.filter((r) => r.id !== reviewId))
    } catch (error) {
      console.error('[v0] Error approving review:', error)
    }
  }

  const handleReject = async (reviewId: string) => {
    if (confirm('Are you sure you want to reject this review?')) {
      try {
        await rejectReview(reviewId)
        setReviews(reviews.filter((r) => r.id !== reviewId))
      } catch (error) {
        console.error('[v0] Error rejecting review:', error)
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>Review Moderation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Admin Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                className="mt-2"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Moderation</h1>
          <p className="text-muted-foreground">Approve or reject pending reviews</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Pending Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{reviews.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Total Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{approvedCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review Preview</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">Review</TableCell>
                      <TableCell>{review.college}</TableCell>
                      <TableCell>{review.course}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-muted-foreground'
                              }
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-sm">
                        {review.title}: {review.review.slice(0, 30)}...
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(review.id)}
                          className="gap-1"
                        >
                          <CheckCircle size={16} />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(review.id)}
                          className="gap-1"
                        >
                          <Trash2 size={16} />
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {reviews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pending reviews</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
