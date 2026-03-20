-- Create reviews table for submission system
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  college TEXT NOT NULL,
  course TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  review TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT true,
  is_approved BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow authenticated users to insert their own reviews
CREATE POLICY "reviews_insert_authenticated" ON public.reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow anyone to read approved reviews
CREATE POLICY "reviews_select_approved" ON public.reviews
  FOR SELECT
  USING (is_approved = true);

-- Allow authenticated users to read all reviews (for edit functionality)
CREATE POLICY "reviews_select_own" ON public.reviews
  FOR SELECT
  USING (auth.uid() = user_id OR is_approved = true);

-- Allow users to update their own reviews
CREATE POLICY "reviews_update_own" ON public.reviews
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_is_approved ON public.reviews(is_approved);
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX idx_reviews_rating ON public.reviews(rating DESC);
CREATE INDEX idx_reviews_helpful_count ON public.reviews(helpful_count DESC);

-- Insert sample approved reviews
INSERT INTO public.reviews (user_id, college, course, rating, title, review, is_verified, is_approved)
VALUES
  (auth.uid(), 'IIT Delhi', 'Computer Science', 5, 'Life-changing experience', 'The guidance and support I received was exceptional. Every step of my admission process was simplified.', true, true),
  (auth.uid(), 'Delhi University', 'Engineering', 4, 'Great platform', 'Very helpful for college comparison. Would recommend to all students.', true, true),
  (auth.uid(), 'BITS Pilani', 'Business Management', 5, 'Best decision ever', 'EduPath made my college selection process stress-free and efficient.', true, true),
  (auth.uid(), 'Nirma University', 'Electronics', 4, 'Recommended', 'Clear information about colleges and courses. Helpful reviews from real students.', true, true),
  (auth.uid(), 'Vellore Institute', 'Mechanical Engineering', 5, 'Excellent service', 'The admission guidance was spot on. I got into my dream college!', true, true),
  (auth.uid(), 'Manipal University', 'Information Technology', 4, 'Very helpful', 'Good interface and reliable information. Makes college selection easy.', true, true);
