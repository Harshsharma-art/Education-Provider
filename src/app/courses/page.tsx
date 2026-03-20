'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

// Sample courses data
const coursesData = [
  {
    id: 1,
    name: 'Bachelor of Technology in Computer Science',
    degree: 'B.Tech',
    stream: 'Engineering',
    colleges: 156,
    cutoff: 'JEE Main 85+',
    description: 'Learn core programming, algorithms, data structures, and software development',
  },
  {
    id: 2,
    name: 'Bachelor of Science in Physics',
    degree: 'B.Sc',
    stream: 'Science',
    colleges: 89,
    cutoff: 'Board 85%+',
    description: 'Explore classical and modern physics with emphasis on experimental methods',
  },
  {
    id: 3,
    name: 'Bachelor of Commerce',
    degree: 'B.Com',
    stream: 'Commerce',
    colleges: 234,
    cutoff: 'Board 80%+',
    description: 'Master accounting, finance, economics, and business management',
  },
  {
    id: 4,
    name: 'Bachelor of Arts in Psychology',
    degree: 'B.A',
    stream: 'Humanities',
    colleges: 67,
    cutoff: 'Board 75%+',
    description: 'Understand human behavior, mental processes, and psychological disorders',
  },
  {
    id: 5,
    name: 'Bachelor of Engineering in Civil',
    degree: 'B.E',
    stream: 'Engineering',
    colleges: 142,
    cutoff: 'JEE Main 80+',
    description: 'Design and construction of infrastructure projects and structures',
  },
  {
    id: 6,
    name: 'Bachelor of Business Administration',
    degree: 'BBA',
    stream: 'Business',
    colleges: 198,
    cutoff: 'Board 70%+',
    description: 'Learn management, strategy, finance, and entrepreneurship',
  },
]

const degrees = ['All', 'B.Tech', 'B.Sc', 'B.Com', 'B.A', 'B.E', 'BBA']
const streams = ['All', 'Engineering', 'Science', 'Commerce', 'Humanities', 'Business']

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDegree, setSelectedDegree] = useState('All')
  const [selectedStream, setSelectedStream] = useState('All')

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDegree = selectedDegree === 'All' || course.degree === selectedDegree
    const matchesStream = selectedStream === 'All' || course.stream === selectedStream
    return matchesSearch && matchesDegree && matchesStream
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Explore Courses
            </h1>
            <p className="text-muted-foreground">
              Discover academic programs offered across top colleges
            </p>
          </div>

          {/* Filters */}
          <div className="bg-muted rounded-lg p-6 mb-8">
            <div className="grid gap-4 md:grid-cols-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Search Courses
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by course name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Degree Filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Degree Type
                </label>
                <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {degrees.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stream Filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Stream
                </label>
                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>
                        {stream}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mt-4">
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {course.degree}
                        </Badge>
                        <CardTitle className="text-xl">{course.name}</CardTitle>
                      </div>
                      <Badge variant="outline">{course.stream}</Badge>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Colleges Offering</p>
                        <p className="font-semibold text-lg">{course.colleges}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Typical Cutoff</p>
                        <p className="font-semibold">{course.cutoff}</p>
                      </div>
                    </div>
                    <Button className="w-full">Explore Colleges</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No courses found matching your criteria
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDegree('All')
                  setSelectedStream('All')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
