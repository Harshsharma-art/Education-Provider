# EduPath Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Supabase

1. Go to https://supabase.com and create a new project
2. Once created, go to **Settings** → **API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Create `.env.local` file in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

### 3. Create Database Tables

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New query** and run the following SQL:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create queries table
CREATE TABLE IF NOT EXISTS public.queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_name TEXT,
  guest_email TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "queries_select_own" ON public.queries FOR SELECT USING (
  auth.uid() = user_id OR guest_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);
CREATE POLICY "queries_insert_own" ON public.queries FOR INSERT WITH CHECK (
  auth.uid() = user_id OR guest_email IS NOT NULL
);
CREATE POLICY "queries_update_own" ON public.queries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "queries_delete_own" ON public.queries FOR DELETE USING (auth.uid() = user_id);

-- Create profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'first_name', NULL),
    COALESCE(new.raw_user_meta_data ->> 'last_name', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

3. Click **Execute** to run all SQL commands

### 4. Start Development Server
```bash
pnpm dev
```
Open http://localhost:3000 in your browser

## Verification Checklist

- [ ] `.env.local` file created with Supabase credentials
- [ ] Database tables created (check in Supabase SQL Editor)
- [ ] Tables have RLS policies enabled
- [ ] User trigger created for auto-profile generation
- [ ] Development server running without errors
- [ ] Home page loads (http://localhost:3000)
- [ ] Can navigate to sign up (http://localhost:3000/auth/sign-up)

## Testing the Application

### 1. Create a Test Account
1. Click "Start Your Journey" on home page
2. Enter email: `test@example.com`
3. Enter password: `testPassword123`
4. Click "Create Account"
5. Check inbox for confirmation email (Supabase sends to console in dev)

### 2. Verify Email Confirmation
- In Supabase dashboard, go to **Authentication** → **Users**
- You should see your test user
- Click user to see confirmation status

### 3. Login
1. Go to http://localhost:3000/auth/login
2. Enter test credentials
3. Should redirect to dashboard

### 4. Explore Features
- Click "Explore Colleges" on home page
- Try course filters and search
- Submit a query from any page
- Check dashboard for your queries

## Troubleshooting

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Supabase connection errors
- Verify environment variables in `.env.local`
- Check Supabase project is active (not paused)
- Confirm API keys are correct in Supabase dashboard

### Tables not found errors
- Verify SQL migrations were executed successfully
- Check Supabase Table Editor shows `profiles` and `queries` tables
- Ensure RLS policies are created

### Email confirmation not working
- In development, Supabase logs emails to console
- In production, set up SMTP email provider in Supabase
- Check Supabase email templates in **Authentication** → **Email Templates**

### Authentication issues
- Clear browser cookies and local storage
- Try incognito/private window
- Verify middleware.ts is in project root
- Check Supabase auth settings allow email/password

## Project Commands

```bash
# Development
pnpm dev          # Start dev server on port 3000

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Check code quality

# Database
# SQL scripts in /scripts folder for manual migration
```

## File Structure Reference

```
├── .env.local              # Environment variables (create this)
├── app/
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected user area
│   ├── courses/           # Course browsing
│   └── page.tsx           # Home page
├── components/
│   ├── navbar.tsx         # Top navigation
│   ├── footer.tsx         # Footer
│   ├── query-form.tsx     # Query submission
│   └── ui/                # UI components
├── lib/
│   └── supabase/          # Database clients
├── scripts/               # SQL migrations
└── middleware.ts          # Auth middleware
```

## Environment Variables

### Required
```env
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Your Supabase anon key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

### For Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://your-domain.com
```

## Database Schema

### profiles table
- `id` (UUID) - User ID from auth.users
- `first_name` (TEXT) - User first name
- `last_name` (TEXT) - User last name
- `created_at` (TIMESTAMP) - Creation time

### queries table
- `id` (UUID) - Unique query ID
- `subject` (TEXT) - Query subject/title
- `message` (TEXT) - Query details
- `user_id` (UUID) - User ID (nullable for guests)
- `guest_name` (TEXT) - Guest name (if not logged in)
- `guest_email` (TEXT) - Guest email (if not logged in)
- `status` (TEXT) - Query status (pending/resolved/etc)
- `created_at` (TIMESTAMP) - Submission time
- `updated_at` (TIMESTAMP) - Last update time

## Next Steps

After setup:

1. **Add Sample Data**: 
   - Add colleges to course explorer
   - Create more course programs

2. **Enable Email Provider** (for production):
   - Go to Supabase **Authentication** → **Email** settings
   - Add SMTP provider or enable Resend/SendGrid

3. **Deploy to Vercel**:
   - Push to GitHub
   - Import to Vercel
   - Add environment variables
   - Deploy

4. **Custom Domain**:
   - Update `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`
   - Configure Vercel domain
   - Enable SSL certificate

## Support

For issues:
1. Check Supabase dashboard for errors
2. Review browser console for errors
3. Check terminal output for server errors
4. Review environment variables are correct
5. Try clearing cache and restarting dev server

---

**You're all set! Happy building!** 🚀
