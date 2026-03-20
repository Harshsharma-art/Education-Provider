'use client'

import { Star } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const students = [
  {
    id: 1,
    name: 'Rahul Sharma',
    course: 'BBA',
    college: 'Shobhit university',
    year: '2024',
    quote: 'Got my dream college thanks to expert guidance!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqf_f9PUwoJEEanOhEelJ0QF2Y7Pxv93VLQ&s'
  },
  {
    id: 2,
    name: 'Priya Mehta',
    course: 'MBA Marketing',
    college: 'Manglaytan university',
    year: '2024',
    quote: 'The counselling sessions were a game changer for me.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGnOTXh_RQCEBjLKq2bYMynyhCnIHCAwQDw&s',
  },
  {
    id: 3,
    name: 'Ankit Verma',
    course: 'BCA',
    college: 'Chaudhary charan singh university',
    year: '2023',
    quote: 'Never thought I\'d get into Amity. Education Provider made it happen!',
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    course: 'B.Com Honours',
    college: 'Subharti University',
    year: '2024',
    quote: 'Free guidance that was better than paid consultants.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu-J3wFseTVVZKfaKLjWAl7Q33w1_4-Jlm6A&s',
  },
  {
    id: 5,
    name: 'Rohan Gupta',
    course: 'M.Tech',
    college: 'Mahaveer university',
    year: '2023',
    quote: 'Step by step support from application to admission.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgJhC97iz3GpgZ2ZvkBWKec70WkH5dJIb5A&s',
  },
  {
    id: 6,
    name: 'Divya Nair',
    course: 'BBA',
    college: 'Chaudhary ranveer singh university',
    year: '2024',
    quote: 'My parents were so happy with the college I got into!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSowo_dA8vViUmAfaUsifwODQ-yBzExfYRmGw&s',
  },
  {
    id: 7,
    name: 'Karan Singh',
    course: 'B.Sc Physics',
    college: 'Manipal University',
    year: '2023',
    quote: 'Honest advice with no hidden fees. Truly free!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScovfL7h0mu8VFsSWV3KRBE-lVBqGlRzxJ7Q&s',
  },
  {
    id: 8,
    name: 'Anjali Tiwari',
    course: 'MBA Finance',
    college: 'Subharti University',
    year: '2024',
    quote: 'The best decision was reaching out to Education Provider first.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3SwpDRHkn0Alh9oPOrP-DWwdEfIXPA0WfA&s',
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
