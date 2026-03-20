import { createClient } from './client'
import { mockReviews } from '../reviews/mockData'

export interface ReviewData {
  college: string
  course: string
  rating: number
  title: string
  review: string
}

// Get approved reviews with sorting and pagination
export async function getApprovedReviews(
  sort: 'recent' | 'helpful' | 'highest' | 'lowest' = 'recent',
  page: number = 0,
  pageSize: number = 6
) {
  const supabase = createClient()
  
  let query = supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)

  // Apply sorting
  switch (sort) {
    case 'recent':
      query = query.order('created_at', { ascending: false })
      break
    case 'helpful':
      query = query.order('helpful_count', { ascending: false })
      break
    case 'highest':
      query = query.order('rating', { ascending: false })
      break
    case 'lowest':
      query = query.order('rating', { ascending: true })
      break
  }

  // Apply pagination
  const { data, error, count } = await query
    .range(page * pageSize, (page + 1) * pageSize - 1)
    .limit(pageSize)

  if (error || !data || data.length === 0) {
    // If no data from Supabase or error, fallback to mock data
    const mappedMockReviews = mockReviews.map(r => ({
      ...r,
      is_approved: true,
      is_verified: r.verified,
      helpful_count: r.helpful,
      created_at: new Date(r.date + ' 1, 2025').toISOString() // Ensure valid date fallback
    }))

    let sortedReviews = [...mappedMockReviews]
    if (sort === 'helpful') sortedReviews.sort((a, b) => b.helpful_count - a.helpful_count)
    if (sort === 'highest') sortedReviews.sort((a, b) => b.rating - a.rating)
    if (sort === 'lowest') sortedReviews.sort((a, b) => a.rating - b.rating)

    const paginated = sortedReviews.slice(page * pageSize, (page + 1) * pageSize)
    return { reviews: paginated, total: mockReviews.length }
  }

  return { reviews: data || [], total: count || 0 }
}

// Submit a new review
export async function submitReview(reviewData: ReviewData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'User not authenticated' }
  }

  // Check for existing review from same user
  const { data: existingReview } = await supabase
    .from('reviews')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (existingReview) {
    return { error: 'You have already submitted a review', code: 'DUPLICATE' }
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        user_id: user.id,
        ...reviewData,
      },
    ])
    .select()

  if (error) {
    console.error('[v0] Error submitting review:', error)
    return { error: error.message }
  }

  return { review: data?.[0], error: null }
}

// Get user's review if exists
export async function getUserReview() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { review: null }
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('[v0] Error fetching user review:', error)
    return { review: null, error }
  }

  return { review: data || null }
}

// Update user's existing review
export async function updateReview(reviewId: string, reviewData: ReviewData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'User not authenticated' }
  }

  const { data, error } = await supabase
    .from('reviews')
    .update({
      ...reviewData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reviewId)
    .eq('user_id', user.id)
    .select()

  if (error) {
    console.error('[v0] Error updating review:', error)
    return { error: error.message }
  }

  return { review: data?.[0], error: null }
}

// Mark review as helpful
export async function markReviewHelpful(reviewId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reviews')
    .update({
      helpful_count: supabase.rpc('increment', {
        x: 1,
        table_name: 'reviews',
        column_name: 'helpful_count',
      }),
    })
    .eq('id', reviewId)

  if (error) {
    console.error('[v0] Error marking review helpful:', error)
  }

  return { error }
}

// Admin: Approve review
export async function approveReview(reviewId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reviews')
    .update({ is_approved: true })
    .eq('id', reviewId)
    .select()

  if (error) {
    console.error('[v0] Error approving review:', error)
    return { error: error.message }
  }

  return { review: data?.[0], error: null }
}

// Admin: Get pending reviews
export async function getPendingReviews(page: number = 0, pageSize: number = 10) {
  const supabase = createClient()

  const { data, error, count } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', false)
    .order('created_at', { ascending: true })
    .range(page * pageSize, (page + 1) * pageSize - 1)

  if (error) {
    console.error('[v0] Error fetching pending reviews:', error)
    return { reviews: [], total: 0, error }
  }

  return { reviews: data || [], total: count || 0 }
}

// Admin: Delete/Reject review
export async function rejectReview(reviewId: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  if (error) {
    console.error('[v0] Error rejecting review:', error)
    return { error: error.message }
  }

  return { error: null }
}
