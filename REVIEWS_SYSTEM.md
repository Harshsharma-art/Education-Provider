# EduPath Review & Testimonial System

## Overview

Complete review submission and management system allowing users to share their college experience, with moderation and approval workflow.

## Features

### 1. Review Submission Form
- **Interactive Star Rating**: 48px stars with hover effects and emoji labels
- **College & Course Dropdowns**: Pre-populated lists of colleges and courses
- **Review Title**: Text input with 80-character limit and live counter
- **Review Text**: Textarea with 50-500 character requirement and live counter
- **Form Validation**: Real-time validation with error messages
- **Draft Auto-Save**: Saves form data to localStorage as user types
- **Draft Restoration**: Restores draft if user navigates away

### 2. Authentication Gating
- Users can **write reviews freely**
- Submit button shows **login modal** if not authenticated
- Modal displays review preview so user knows data is safe
- After login, redirects back to form with draft restored
- Auto-submit if draft exists after login

### 3. Duplicate Prevention
- Checks if user already has a submitted review
- Prevents duplicate submissions with clear message
- Allows edit functionality (for future enhancement)

### 4. Approved Reviews Grid
- **3-column grid** on desktop, 2 columns on tablet, 1 column mobile
- **Sort options**: Most Recent, Most Helpful, Highest Rated, Lowest Rated
- **Review cards** with:
  - Gradient avatar with college initials
  - Verified student badge
  - College + Course info
  - Star rating (1-5)
  - Review date
  - Review title (bold)
  - Truncated review text with "Read more" toggle
  - Helpful button with count
- **Pagination**: "Load More" button loads 6 reviews at a time

### 5. Admin Moderation Panel
- **Route**: `/admin/reviews`
- **Password protection**: Simple password auth (for MVP)
- **Pending reviews table** showing:
  - College, Course, Rating, Title
  - Review preview, Date
  - Approve/Reject buttons
- **Stats**: Pending count, Total approved count

## Database Schema

### Table: `reviews`

```sql
id                 UUID PRIMARY KEY
user_id            UUID (references auth.users, NOT NULL)
college            TEXT NOT NULL
course             TEXT NOT NULL
rating             INTEGER NOT NULL (1-5)
title              TEXT NOT NULL
review             TEXT NOT NULL
is_verified        BOOLEAN DEFAULT true
is_approved        BOOLEAN DEFAULT false
helpful_count      INTEGER DEFAULT 0
created_at         TIMESTAMP WITH TIMEZONE
updated_at         TIMESTAMP WITH TIMEZONE
```

### RLS Policies

- **INSERT**: Only authenticated users can insert
- **SELECT**: Anyone can read approved reviews; authenticated users can read their own
- **UPDATE**: Users can only update their own reviews
- **DELETE**: Authenticated users can delete their own (future feature)

## File Structure

### Components
```
components/reviews/
├── ReviewForm.tsx              # Main submission form
├── ReviewStarRating.tsx        # Interactive star selector
├── LoginPromptModal.tsx        # Auth gating modal
├── ReviewGrid.tsx              # Approved reviews grid
├── SortBar.tsx                 # Sort options bar
├── ReviewCarousel.tsx          # Carousel for homepage (existing)
├── ReviewCard.tsx              # Individual review card (existing)
├── TrustBadgesStrip.tsx       # Trust badges (existing)
├── ReviewsSection.tsx          # Carousel section (existing)
└── TrustBar.tsx               # Trust distribution bar (existing)
```

### API & Helpers
```
lib/
├── supabase/
│   ├── client.ts              # Supabase client setup
│   ├── server.ts              # Server-side client
│   └── reviews.ts             # Review helper functions
│       - getApprovedReviews()
│       - submitReview()
│       - getUserReview()
│       - updateReview()
│       - markReviewHelpful()
│       - approveReview()       (admin)
│       - getPendingReviews()   (admin)
│       - rejectReview()        (admin)
```

### Pages
```
app/
├── page.tsx                   # Updated home page
│                             # (includes ReviewGrid + ReviewForm)
└── admin/
    └── reviews/
        └── page.tsx          # Admin moderation panel
```

### Database
```
scripts/
├── 003_create_reviews_table.sql
│   (existing carousel reviews)
└── 004_create_reviews_submission.sql
    (submission system + RLS)
```

## Key Behaviors

### Draft Management
```typescript
// Saves to localStorage under key: "edupath_review_draft"
// Auto-saves every 500ms as user types
// Restored on page reload
// Cleared after successful submission
// Shows "📝 We saved your draft!" banner
```

### Auth Flow
1. User fills form and clicks submit
2. Check if authenticated
3. If NO: Show LoginPromptModal with review preview
   - User clicks "Login to Submit"
   - Redirected to `/auth/login?redirect=/`
   - After successful login, redirected back to home
   - Draft auto-restored from localStorage
   - Form auto-scrolls into view
4. If YES: Validate and submit
   - Check for duplicate reviews
   - Save to Supabase
   - Show success message
   - Clear form and localStorage

### Review Approval
1. Admin logs into `/admin/reviews` with password
2. Views pending reviews in table
3. Clicks "Approve" → sets `is_approved = true`
4. Clicks "Reject" → deletes review
5. Review appears in grid once approved

## Integration Notes

### Supabase Setup
Run migrations in order:
1. `003_create_reviews_submission.sql` - Creates table + RLS
2. `004_create_reviews_submission.sql` - Adds submission system

### Environment Variables
Already configured in Supabase integration:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Client-Side Auth
```typescript
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

## Testing

### Test Submission Flow
1. Not logged in: Fill form, click submit → see login modal
2. Logged in: Fill form, click submit → see success message
3. Existing review: Try submit → see error message
4. Draft restoration: Fill form, refresh page → data still there

### Test Admin Panel
1. Go to `/admin/reviews`
2. Password: `edupath2024`
3. Approve a review → appears in grid
4. Reject a review → deleted from pending

### Test Review Grid
- Sort by different options
- Load more reviews
- Expand/collapse review text
- Click helpful button

## Future Enhancements

- [ ] Edit review functionality
- [ ] Delete review by user
- [ ] Report review button
- [ ] Reply to reviews (for admins)
- [ ] Email verification for verified badge
- [ ] Profile page to show user's reviews
- [ ] Helpful count increment with localStorage tracking
- [ ] Image uploads in reviews
- [ ] Filter by college/course
- [ ] Real admin authentication (not password)
- [ ] Review analytics dashboard

## Security Considerations

- ✅ RLS policies prevent unauthorized data access
- ✅ User_id required for insert (prevents anonymous submissions)
- ✅ Users can only edit/delete their own reviews
- ✅ Email never exposed in SELECT queries
- ⚠️ Admin password is hardcoded (use proper auth in production)
- ✅ All form inputs validated server-side in Supabase
- ✅ XSS protection via React escaping

## Performance Optimizations

- ✅ Pagination: Load 6 reviews per page
- ✅ Lazy loading: Reviews loaded on demand
- ✅ Client-side sorting: Frontend sorts loaded data
- ✅ Draft debouncing: Saves every 500ms instead of on every keystroke
- ✅ Memoization: Components use React.memo for expensive renders
- ✅ CSS-in-JS: Star animations via CSS, not JS

## Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify Supabase connection: `supabase.auth.getUser()`
- Ensure all required fields are filled

### Reviews not appearing?
- Check if reviews are approved in admin panel
- Verify RLS policies are correctly set
- Check Supabase logs for query errors

### Login modal not showing?
- Verify `isOpen` state is being set
- Check if user is actually unauthenticated
- Clear localStorage and try again

### Draft not saving?
- Check browser localStorage: `localStorage.getItem('edupath_review_draft')`
- Verify localStorage is not disabled
- Check for JavaScript errors in console
