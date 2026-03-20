'use client'

import { useState } from 'react'
import { createClient } from '@/components/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/hooks/use-toast'
import { Send } from 'lucide-react'

interface QueryFormProps {
  userId?: string
  onSuccess?: () => void
}

export default function QueryForm({ userId, onSuccess }: QueryFormProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.from('queries').insert({
        subject,
        message,
        user_id: userId,
        guest_name: !userId ? name : null,
        guest_email: !userId ? email : null,
        status: 'pending',
      })

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Your query has been submitted. We will get back to you soon!',
      })

      setSubject('')
      setMessage('')
      setName('')
      setEmail('')
      onSuccess?.()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit query. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Your Query</CardTitle>
        <CardDescription>
          Have a question about college admissions? Get personalized guidance from our experts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!userId && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!userId}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={!userId}
                />
              </div>
            </>
          )}

          <div className="grid gap-2">
            <Label htmlFor="subject" className="font-medium">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g., Engineering colleges with scholarships"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message" className="font-medium">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us more about your question or concern..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
            />
          </div>

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Submitting...' : (
              <>
                Submit Query
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
