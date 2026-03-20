-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  college TEXT NOT NULL,
  course TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  review TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can INSERT a review
CREATE POLICY "Anyone can insert reviews" ON public.reviews
  FOR INSERT
  WITH CHECK (TRUE);

-- Policy: Anyone can SELECT approved reviews (without email)
CREATE POLICY "Anyone can view approved reviews" ON public.reviews
  FOR SELECT
  USING (is_approved = TRUE);

-- Policy: Allow unauthenticated updates to helpful_count
CREATE POLICY "Anyone can update helpful count" ON public.reviews
  FOR UPDATE
  USING (is_approved = TRUE)
  SET (helpful_count = helpful_count + 1);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON public.reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_college ON public.reviews(college);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- Seed with 12 mock reviews (all approved and verified)
INSERT INTO public.reviews (name, email, college, course, rating, title, review, is_verified, is_approved, helpful_count, created_at) VALUES
('Rahul Sharma', 'rahul@example.com', 'VIT Vellore', 'B.Tech', 5, 'Best decision of my life!', 'EduPath helped me compare 20+ colleges in one place. The admission deadline tracker saved me from missing VIT''s cutoff. Got placed in TCS within 6 months of graduation!', TRUE, TRUE, 48, NOW() - INTERVAL '20 days'),
('Priya Mehta', 'priya@example.com', 'Symbiosis Pune', 'MBA', 5, 'Got into my dream college!', 'I was so confused between 5 different MBA programs. EduPath''s fee comparison and college ratings made the decision so easy. The counseling query response was super fast too!', TRUE, TRUE, 35, NOW() - INTERVAL '25 days'),
('Ankit Verma', 'ankit@example.com', 'Amity Noida', 'BCA', 4, 'Very helpful platform', 'Found all the information I needed about BCA programs in one place. Fees, deadlines, college rankings — everything was clear and up to date. Would have been lost without this!', TRUE, TRUE, 22, NOW() - INTERVAL '30 days'),
('Sneha Patel', 'sneha@example.com', 'Delhi University', 'B.Com', 5, 'Saved months of research!', 'As a first-gen college student, I had no guidance. EduPath showed me government college options I didn''t even know existed. Delhi University fees were so affordable. Thank you EduPath!', TRUE, TRUE, 61, NOW() - INTERVAL '20 days'),
('Rohan Gupta', 'rohan@example.com', 'BITS Pilani', 'M.Tech', 5, 'Incredibly detailed college info', 'The fee breakdown and admission process details for BITS Pilani were spot on. Submitted my query and got a callback within 2 hours. The team really knows their stuff.', TRUE, TRUE, 29, NOW() - INTERVAL '25 days'),
('Divya Nair', 'divya@example.com', 'LPU Punjab', 'BBA', 4, 'Great for comparing colleges', 'I compared 8 BBA colleges side by side on EduPath. The placement stats and fee structure helped me convince my parents too. LPU was the right choice for my budget!', TRUE, TRUE, 17, NOW() - INTERVAL '30 days'),
('Karan Singh', 'karan@example.com', 'Manipal University', 'B.Sc', 5, 'Trustworthy and accurate info', 'Every detail about Manipal''s B.Sc program was accurate — fees, deadlines, hostel info. No fake promises unlike other websites. EduPath is the real deal for genuine college guidance.', TRUE, TRUE, 44, NOW() - INTERVAL '20 days'),
('Anjali Tiwari', 'anjali@example.com', 'Amity Noida', 'MBA', 4, 'Helped me make a confident choice', 'Was stuck between 3 MBA colleges for months. EduPath''s comparison feature and student reviews gave me the confidence to pick Amity. Zero regrets — loving campus life here!', TRUE, TRUE, 19, NOW() - INTERVAL '25 days'),
('Mohit Sharma', 'mohit@example.com', 'LPU Punjab', 'B.Tech', 5, 'Game changer for admissions', 'The admission deadline calendar alone is worth using EduPath. I never missed a single deadline. Applied to 4 colleges and got into 3. This platform should be mandatory for every 12th pass student!', TRUE, TRUE, 53, NOW() - INTERVAL '30 days'),
('Pooja Reddy', 'pooja@example.com', 'Symbiosis Pune', 'LLB', 5, 'Found my calling through EduPath', 'I was confused between LLB and MBA. The course comparison tool helped me realize Law was my true passion. Now in my second year at Symbiosis Law School. Best platform for career-confused students!', TRUE, TRUE, 37, NOW() - INTERVAL '20 days'),
('Arjun Mishra', 'arjun@example.com', 'VIT Vellore', 'MCA', 4, 'Solid platform, great support', 'Found detailed MCA program info that was hard to find elsewhere. The query form response was quick and the counselor was knowledgeable. Would recommend to all MCA aspirants!', TRUE, TRUE, 14, NOW() - INTERVAL '25 days'),
('Neha Joshi', 'neha@example.com', 'Delhi University', 'B.Sc', 5, 'Perfect for budget-conscious students', 'Coming from a small town, budget was everything. EduPath showed me that Delhi University offers world-class education at government fees. My parents were so relieved. Cleared the entrance on first attempt!', TRUE, TRUE, 42, NOW() - INTERVAL '30 days')
ON CONFLICT DO NOTHING;
