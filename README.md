# EduPath - College Admission Guidance Platform

A modern web application that helps students discover, compare, and get admitted to the right college. Built with Next.js, Supabase, and shadcn/ui.

## Features

- **College Discovery**: Browse and search 500+ top colleges with detailed information
- **Course Explorer**: Discover academic programs across Engineering, Science, Commerce, Humanities, and Business streams
- **Comparison Tools**: Compare colleges on 30+ factors including academics, costs, and student life
- **User Dashboard**: Track your college journey, save favorites, and manage inquiries
- **Expert Guidance**: Submit queries and get personalized admission advice
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Secure Authentication**: Email/password authentication with Supabase

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19.2
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Supabase PostgreSQL with RLS policies
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account (create at https://supabase.com)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository>
   cd admission
   pnpm install
   ```

2. **Set Up Supabase**
   - Create a Supabase project at https://supabase.com
   - Get your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from project settings
   - Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   ```

3. **Create Database Tables**
   
   In your Supabase dashboard, go to the SQL Editor and run:

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

   -- Create queries table (for college admission inquiries)
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

4. **Run Development Server**
   ```bash
   pnpm dev
   ```
   Open http://localhost:3000 in your browser

## Project Structure

```
├── app/
│   ├── auth/              # Authentication pages (login, signup)
│   ├── dashboard/         # Protected user dashboard
│   ├── courses/           # Course browsing and filtering
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles with design tokens
├── components/
│   ├── navbar.tsx         # Navigation bar
│   ├── footer.tsx         # Footer component
│   ├── query-form.tsx     # College inquiry form
│   └── ui/                # shadcn/ui components
├── lib/
│   └── supabase/          # Supabase client configuration
├── scripts/               # Database migration scripts
└── middleware.ts          # Authentication middleware
```

## Key Routes

- `/` - Home page with college discovery
- `/auth/sign-up` - User registration
- `/auth/login` - User login
- `/dashboard` - Protected user dashboard
- `/courses` - Course listing and filtering
- `/auth/sign-up-success` - Sign-up confirmation page

## Design System

The application uses a Navy/Electric Blue color scheme:

- **Primary Color**: Navy Blue (oklch(0.22 0.12 255))
- **Accent Color**: Electric Blue (oklch(0.5 0.22 260))
- **Fonts**: Sora (headings), Inter (body text)
- **Spacing**: 4px base unit with Tailwind scale
- **Border Radius**: 0.625rem (10px)

## Authentication Flow

1. Users sign up with email and password
2. Supabase sends a confirmation email
3. After confirmation, user can log in
4. Dashboard access is protected via middleware
5. User profiles are auto-created via database trigger

## Forms and Validation

- Sign-up form validates email uniqueness and password strength
- Query form saves submissions to the database
- Course filters work client-side for instant results
- Form errors display with clear messaging

## Database

All data is stored in Supabase PostgreSQL with Row-Level Security (RLS) policies:

- **profiles**: User profile information
- **queries**: College inquiry submissions (from both auth users and guests)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and import the repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://your-domain.com`
4. Deploy

## Environment Variables

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Supabase anonymous key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=  # OAuth redirect URL
```

## Contributing

Contributions are welcome! Please follow the existing code style and submit pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open a GitHub issue or contact the development team.

---

Built with ❤️ for students seeking their perfect college match.
"# Education-Provider" 
"# Education-Provider" 
