export interface Review {
  id: string
  name: string
  college: string
  course: string
  rating: number
  title: string
  review: string
  date: string
  helpful: number
  verified: boolean
}

export const mockReviews: Review[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    college: 'Chaudhary Charan Singh University',
    course: 'B.Tech',
    rating: 5,
    title: 'Best decision of my life!',
    review: 'Education Provider helped me compare 20+ colleges in one place. The admission deadline tracker saved me from missing the cutoff. Got placed in TCS within 6 months of graduation!',
    date: 'March 2025',
    helpful: 48,
    verified: true,
  },
  {
    id: '2',
    name: 'Priya Mehta',
    college: 'Subharti University',
    course: 'MBA',
    rating: 5,
    title: 'Got into my dream college!',
    review: 'I was so confused between 5 different MBA programs. Education Provider\'s fee comparison and college ratings made the decision so easy. The counseling query response was super fast too!',
    date: 'February 2025',
    helpful: 35,
    verified: true,
  },
  {
    id: '3',
    name: 'Ankit Verma',
    college: 'Mangalayatan University',
    course: 'BCA',
    rating: 4,
    title: 'Very helpful platform',
    review: 'Found all the information I needed about BCA programs in one place. Fees, deadlines, college rankings — everything was clear and up to date. Would have been lost without this!',
    date: 'January 2025',
    helpful: 22,
    verified: true,
  },
  {
    id: '4',
    name: 'Sneha Patel',
    college: 'Shobhit University',
    course: 'B.Com',
    rating: 5,
    title: 'Saved months of research!',
    review: 'As a first-gen college student, I had no guidance. Education Provider showed me government college options I didn\'t even know existed. Thank you Education Provider!',
    date: 'March 2025',
    helpful: 61,
    verified: true,
  },
  {
    id: '5',
    name: 'Rohan Gupta',
    college: 'Mahaveer University',
    course: 'M.Tech',
    rating: 5,
    title: 'Incredibly detailed college info',
    review: 'The fee breakdown and admission process details were spot on. Submitted my query and got a callback within 2 hours. The team really knows their stuff.',
    date: 'February 2025',
    helpful: 29,
    verified: true,
  },
  {
    id: '6',
    name: 'Divya Nair',
    college: 'Chaudhary Ranbir Singh University (CRSU), Rohtak',
    course: 'BBA',
    rating: 4,
    title: 'Great for comparing colleges',
    review: 'I compared 8 BBA colleges side by side on Education Provider. The placement stats and fee structure helped me convince my parents too. The right choice for my budget!',
    date: 'January 2025',
    helpful: 17,
    verified: true,
  },
  {
    id: '7',
    name: 'Karan Singh',
    college: 'Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur',
    course: 'B.Sc',
    rating: 5,
    title: 'Trustworthy and accurate info',
    review: 'Every detail about the B.Sc program was accurate — fees, deadlines, hostel info. No fake promises unlike other websites. Education Provider is the real deal for genuine college guidance.',
    date: 'March 2025',
    helpful: 44,
    verified: true,
  },
  {
    id: '8',
    name: 'Anjali Tiwari',
    college: 'Chaudhary Charan Singh University',
    course: 'MBA',
    rating: 4,
    title: 'Helped me make a confident choice',
    review: 'Was stuck between 3 MBA colleges for months. Education Provider\'s comparison feature and student reviews gave me the confidence to pick my college. Zero regrets — loving campus life here!',
    date: 'February 2025',
    helpful: 19,
    verified: true,
  },
  {
    id: '9',
    name: 'Mohit Sharma',
    college: 'Subharti University',
    course: 'B.Tech',
    rating: 5,
    title: 'Game changer for admissions',
    review: 'The admission deadline calendar alone is worth using Education Provider. I never missed a single deadline. Applied to 4 colleges and got into 3. This platform should be mandatory for every 12th pass student!',
    date: 'January 2025',
    helpful: 53,
    verified: true,
  },
  {
    id: '10',
    name: 'Pooja Reddy',
    college: 'Mangalayatan University',
    course: 'LLB',
    rating: 5,
    title: 'Found my calling through Education Provider',
    review: 'I was confused between LLB and MBA. The course comparison tool helped me realize Law was my true passion. Now in my second year. Best platform for career-confused students!',
    date: 'March 2025',
    helpful: 37,
    verified: true,
  },
  {
    id: '11',
    name: 'Arjun Mishra',
    college: 'Shobhit University',
    course: 'MCA',
    rating: 4,
    title: 'Solid platform, great support',
    review: 'Found detailed MCA program info that was hard to find elsewhere. The query form response was quick and the counselor was knowledgeable. Would recommend to all MCA aspirants!',
    date: 'February 2025',
    helpful: 14,
    verified: true,
  },
  {
    id: '12',
    name: 'Neha Joshi',
    college: 'Mahaveer University',
    course: 'B.Sc',
    rating: 5,
    title: 'Perfect for budget-conscious students',
    review: 'Coming from a small town, budget was everything. Education Provider showed me the best options at affordable fees. My parents were so relieved. Cleared the entrance on first attempt!',
    date: 'January 2025',
    helpful: 42,
    verified: true,
  },
]

// Calculate stats
export const reviewStats = {
  average: 4.8,
  total: mockReviews.length,
  distribution: {
    5: 78,
    4: 15,
    3: 5,
    2: 1,
    1: 1,
  },
}

// Avatar gradients
export const avatarGradients = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-pink-600',
  'from-green-400 to-blue-500',
  'from-yellow-400 to-red-600',
  'from-pink-400 to-red-600',
  'from-indigo-400 to-purple-600',
]

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function getGradient(index: number): string {
  return avatarGradients[index % avatarGradients.length]
}
