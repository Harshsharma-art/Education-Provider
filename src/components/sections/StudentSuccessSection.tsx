'use client'

import { Star } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const students = [
  {
    id: 1,
    name: 'Rahi Sharma',
    course: 'BCA',
    college: 'Subharti University',
    year: '2023',
    quote: 'Got my dream college thanks to expert guidance!',
    image: '/images/students/student1.png' 
  },
  {
    id: 2,
    name: 'Aman prakash',
    course: 'D. Pharma',
    college: 'MIIT',
    year: '2024',
    quote: 'The counselling sessions were a game changer for me.',
   image: '/images/students/student2.png' 
  },
  {
    id: 3,
    name: 'Jony Kumar',
    course: 'BA',
    college: 'Subharti University',
    year: '2023',
    quote: 'Never thought I\'d get into Amity. Education Provider made it happen!',
    image: '/images/students/student3.png'
  },
  {
    id: 4,
    name: 'Mamta Negi',
    course: 'D. El. Ed',
    college: 'Mangalayatan University',
    year: '2024',
    quote: 'My parents were so happy with the college I got into!',
    image: '/images/students/student6.png',

  },
  {
    id: 5,
    name: 'Rohit Kumar',
    course: 'B.Ed',
    college: 'Chaudhary charan singh university',
    year: '2023',
    quote: 'Step by step support from application to admission.',
     image: '/images/students/student5.png',
  },
  {
    id: 6,
    name: 'Anamika Singh',
    course: 'B.Sc',
    college: 'Mangalayatan University',
    year: '2024',
    quote: 'Free guidance that was better than paid consultants.',
     image: '/images/students/student4.png',


  },
  {
    id: 7,
    name: 'Kshitiz Sharma',
    course: 'B. Ed',
    college: 'Chaudhary charan singh university',
    year: '2023',
    quote: 'Honest advice with no hidden fees. Truly free!',
    image: '/images/students/student7.png',
  },
  {
    id: 8,
    name: 'Shivanshu Sharma',
    course: 'MCA',
    college: 'Mangalayatan University',
    year: '2024',
    quote: 'The best decision was reaching out to Education Provider first.',
    image: '/images/students/student8.png',
  },
]

export default function StudentSuccessSection() {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const container = scrollContainer.current
    if (!container) return
    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainer.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      return () => container.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainer.current
    if (!container) return
    const scrollAmount = 320
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase">Student Success</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mt-3 mb-3">
            Students We Placed in Their Dream Colleges 🎓
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real students, real results. These are the faces behind our 500+ successful admissions.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group mb-8">
          <div
            ref={scrollContainer}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-4"
          >
            {students.map((student) => (
              <div
                key={student.id}
                className="flex-shrink-0 w-64 snap-start"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-40 overflow-hidden bg-gradient-to-b from-primary/20 to-transparent">
                    <img
                      id={`student-photo-${student.id}`}
                      src={student.image}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent p-3">
                      <span className="inline-block bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        {student.college}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-foreground text-base">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {student.course} → {student.college}
                    </p>

                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded mt-2 w-fit">
                      Batch {student.year}
                    </span>

                    <p className="text-sm text-foreground italic my-3 flex-1">
                      "{student.quote}"
                    </p>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-accent text-accent"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-primary text-primary-foreground p-2 rounded-full transition-all ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-primary text-primary-foreground p-2 rounded-full transition-all ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>

        {/* Below Counter */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">→ Scroll to see more success stories</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm font-medium text-foreground">
            <span>500+ Students Placed</span>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <span>50+ Colleges</span>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <span>10 Years Experience</span>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <span>100% Free</span>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
