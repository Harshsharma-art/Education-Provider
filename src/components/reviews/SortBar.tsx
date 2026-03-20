'use client'

import { Button } from '@/src/components/ui/button'

interface SortBarProps {
  activeSort: 'recent' | 'helpful' | 'highest' | 'lowest'
  onSortChange: (sort: 'recent' | 'helpful' | 'highest' | 'lowest') => void
}

const sortOptions = [
  { value: 'recent' as const, label: 'Most Recent' },
  { value: 'helpful' as const, label: 'Most Helpful' },
  { value: 'highest' as const, label: 'Highest Rated' },
  { value: 'lowest' as const, label: 'Lowest Rated' },
]

export default function SortBar({ activeSort, onSortChange }: SortBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          variant={activeSort === option.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSortChange(option.value)}
          className={
            activeSort === option.value
              ? 'bg-primary text-primary-foreground'
              : ''
          }
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
