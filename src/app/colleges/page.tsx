'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin } from 'lucide-react'

// Sample colleges data
const collegesData = [
  {
    id: 1,
    name: 'Chaudhary Charan Singh University (CCSU)',
    location: 'Meerut, Uttar Pradesh',
    type: 'Public',
    ranking: 'State University',
    fees: '₹40,000/yr',
    description: 'A premier state university offering a wide range of undergraduate and postgraduate programs.',
    courses: ['B.A.', 'B.Sc.', 'B.Com.', 'M.A.', 'M.Sc.']
  },
  {
    id: 2,
    name: 'Swami Vivekanand Subharti University',
    location: 'Meerut, Uttar Pradesh',
    type: 'Private',
    ranking: 'Top Private',
    fees: '₹1.5 Lakhs/yr',
    description: 'A recognized university providing high-quality education in medicine, engineering, management, and more.',
    courses: ['MBBS', 'B.Tech', 'BBA', 'Law']
  },
  {
    id: 3,
    name: 'Mangalayatan University',
    location: 'Aligarh, Uttar Pradesh',
    type: 'Private',
    ranking: 'Top Private',
    fees: '₹1.2 Lakhs/yr',
    description: 'Known for its excellent infrastructure and diverse academic programs fostering holistic development.',
    courses: ['B.Tech', 'MBA', 'B.Pharm', 'B.Ed']
  },
  {
    id: 4,
    name: 'Shobhit University',
    location: 'Meerut, Uttar Pradesh',
    type: 'Private',
    ranking: 'Deemed University',
    fees: '₹1.3 Lakhs/yr',
    description: 'A research-intensive university focused on empowering students with modern skills and knowledge.',
    courses: ['B.Tech', 'BBA', 'BCA', 'Law']
  },
  {
    id: 5,
    name: 'Mahaveer University',
    location: 'Meerut, Uttar Pradesh',
    type: 'Private',
    ranking: 'Top Private',
    fees: '₹1.1 Lakhs/yr',
    description: 'Committed to academic excellence and nurturing future leaders across various disciplines.',
    courses: ['B.Sc', 'B.Com', 'MBA', 'B.Ed']
  },
  {
    id: 6,
    name: 'Chaudhary Ranbir Singh University (CRSU)',
    location: 'Rohtak, Haryana',
    type: 'Public',
    ranking: 'State University',
    fees: '₹35,000/yr',
    description: 'Promoting higher education with a focus on comprehensive learning and research capabilities.',
    courses: ['B.Ed', 'M.A.', 'M.Sc.', 'B.P.Ed']
  },
  {
    id: 7,
    name: 'Chhatrapati Shahu Ji Maharaj University (CSJMU)',
    location: 'Kanpur, Uttar Pradesh',
    type: 'Public',
    ranking: 'State University',
    fees: '₹45,000/yr',
    description: 'One of the largest universities in Asia offering extensive educational and research opportunities.',
    courses: ['B.A.', 'B.Sc.', 'B.Tech', 'MBA']
  }
]

const types = ['All', 'Public', 'Private']
const locations = ['All', 'Uttar Pradesh', 'Haryana']

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')

  const filteredColleges = collegesData.filter((college) => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'All' || college.type === selectedType
    const matchesLocation = selectedLocation === 'All' || college.location.includes(selectedLocation)
    return matchesSearch && matchesType && matchesLocation
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Explore Colleges & Universities
            </h1>
            <p className="text-muted-foreground">
              Find the perfect institution for your higher education journey
            </p>
          </div>

          {/* Filters */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
            <div className="grid gap-4 md:grid-cols-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Search Colleges
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by college name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Institution Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  State / Region
                </label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mt-4 font-medium">
              Showing {filteredColleges.length} institution{filteredColleges.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Colleges Grid */}
          {filteredColleges.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 auto-rows-max">
              {filteredColleges.map((college) => (
                <Card key={college.id} className="hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <Badge variant={college.type === 'Public' ? 'default' : 'secondary'} className="mb-2">
                          {college.type}
                        </Badge>
                        <CardTitle className="text-xl leading-tight mb-2">{college.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span>{college.location}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 whitespace-nowrap">
                        {college.ranking}
                      </Badge>
                    </div>
                    <CardDescription className="text-base mt-2 line-clamp-2">{college.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-4">
                    <div className="bg-muted/50 rounded-md p-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Average Fees</p>
                        <p className="font-semibold text-foreground">{college.fees}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Top Programs</p>
                        <p className="font-semibold text-foreground text-xs">{college.courses.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1 w-full" variant="default">View Details</Button>
                      <Button className="flex-1 w-full" variant="outline">Compare</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground text-lg mb-4">
                No colleges found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedType('All')
                  setSelectedLocation('All')
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
