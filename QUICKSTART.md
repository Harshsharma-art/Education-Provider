# EduPath - Quick Start Guide

## Overview
EduPath is a college admission guidance platform built with Next.js 16, Supabase, and shadcn/ui. The app is fully functional and ready to run!

## What's Included

### Pages
- **Home (`/`)** - Landing page with hero, features, stats, and CTAs
- **Sign Up (`/auth/sign-up`)** - User registration with email/password
- **Login (`/auth/login`)** - User authentication
- **Courses (`/courses`)** - Browse 12+ college courses with filters
- **Dashboard (`/dashboard`)** - Protected user dashboard with profile and queries tracking

### Components
- Responsive Navbar with auth-aware menu
- Professional Footer
- Query form for college inquiries
- Reusable UI components via shadcn/ui
- Beautiful hero sections and cards

### Design
- Navy/Electric Blue color scheme
- Sora headings + Inter body fonts
- Full dark mode support
- Mobile-responsive throughout
- Smooth animations and transitions

## Getting Started

### 1. Install Dependencies
The project uses pnpm as the package manager. Dependencies will auto-install when you run the dev server.

### 2. Environment Variables
The project connects to Supabase. Verify your environment variables are set:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

These are automatically set via the Vercel integration.

### 3. Run the Development Server
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Features Working Out of the Box

✅ **Authentication**
- Sign up with email/password
- Login to existing account
- Protected dashboard route
- Sign out functionality

✅ **Navigation**
- Smart navbar that shows/hides auth buttons based on login state
- Mobile-responsive hamburger menu
- Quick links to all major pages

✅ **Pages**
- Home page with full content and CTAs
- Courses listing with 12 sample courses and filter system
- User dashboard with tabs for profile, queries, and saved colleges
- Professional auth pages with validation

✅ **Styling**
- Navy and electric blue primary colors
- Beautiful gradients and card designs
- Dark mode support
- Responsive grid layouts

## Optional: Setting Up Database (Advanced)

If you want to enable full database features:

1. **Run the SQL migrations:**
   - Open Supabase dashboard
   - Go to SQL Editor
   - Run the scripts in `/scripts/001_create_tables.sql` and `/scripts/002_create_triggers.sql`

2. **This will create:**
   - `profiles` table for user data
   - `queries` table for admission inquiries
   - Automatic profile creation on signup
   - Row-level security for data protection

Without the database, the app still works perfectly for:
- User authentication
- Browsing courses and colleges
- Dashboard UI (without data persistence)
- All navigation and core features

## Testing the App

### Test Sign Up
1. Go to `/auth/sign-up`
2. Enter an email and password (6+ characters)
3. Confirm the password
4. You'll be redirected to sign-up success page

### Test Login
1. Go to `/auth/login`
2. Use the email/password from signup
3. You'll be redirected to `/dashboard`

### View Dashboard
1. When logged in, click "Dashboard" in the navbar
2. See your profile information
3. View tabs for queries and saved colleges

### Browse Courses
1. Click "Courses" in the navbar
2. View all 12 sample courses
3. Filter by degree type and stream
4. Search courses

## Project Structure

```
app/
  ├── page.tsx           # Home page
  ├── dashboard/         # Protected dashboard
  ├── courses/           # Courses listing
  └── auth/              # Authentication pages
    ├── login/
    ├── sign-up/
    ├── error/
    └── sign-up-success/

components/
  ├── navbar.tsx         # Main navigation
  ├── footer.tsx         # Footer
  ├── query-form.tsx     # Query submission form
  └── ui/                # shadcn components

lib/
  └── supabase/
    ├── client.ts        # Browser client
    └── server.ts        # Server client

scripts/
  ├── 001_create_tables.sql    # Database setup
  └── 002_create_triggers.sql  # Auto-triggers
```

## Customization

### Change Colors
Edit the design tokens in `app/globals.css`:
- `--primary`: Navy blue (OKLCh format)
- `--secondary`: Electric blue
- `--accent`: Primary accent color

### Change Fonts
Update fonts in `app/layout.tsx`:
- Sora: Headings (--font-heading)
- Inter: Body text (--font-body)

### Add More Courses
Edit the `coursesData` array in `app/courses/page.tsx`

### Customize Dashboard
Modify tabs and content in `app/dashboard/page.tsx`

## Troubleshooting

### "Module not found: @supabase/ssr"
The app uses `@supabase/supabase-js` instead. This is already fixed in all files.

### Authentication not working
- Check that Supabase integration is connected
- Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
- Try clearing browser cookies and signing up again

### Database errors
- Database tables are optional - the app works without them
- To enable database features, run the SQL migrations from the scripts folder

### Styling issues
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Restart dev server

## Deployment

The app is ready to deploy to Vercel:

1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Next.js
4. Add environment variables from Supabase integration
5. Deploy!

## Support

For more information:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Happy coding! 🎓**
