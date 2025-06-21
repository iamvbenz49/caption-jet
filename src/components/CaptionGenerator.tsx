'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckIcon, CopyIcon } from 'lucide-react'
import axios from 'axios'


type Platform = 'linkedin' | 'twitter' | 'instagram' | 'tiktok' | 'youtube'

export default function CaptionGenerator() {
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState('')
  const [platform, setPlatform] = useState<Platform | ''>('')
  const [includeHashtags, setIncludeHashtags] = useState(false)
  const [includeCTA, setIncludeCTA] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const toneOptionsByPlatform: Record<Platform, { value: string; label: string }[]> = {
    linkedin: [
      { value: 'professional', label: 'Professional' },
      { value: 'witty', label: 'Witty' },
      { value: 'inspiring', label: 'Inspiring' },
    ],
    twitter: [
      { value: 'savage', label: 'Savage' },
      { value: 'relatable', label: 'Relatable' },
      { value: 'memey', label: 'Memey' },
    ],
    instagram: [
      { value: 'flirty', label: 'Flirty' },
      { value: 'aesthetic', label: 'Aesthetic' },
      { value: 'deep', label: 'Deep' },
    ],
    tiktok: [
      { value: 'funny', label: 'Funny' },
      { value: 'sarcastic', label: 'Sarcastic' },
      { value: 'hype', label: 'Hype' },
    ],
    youtube: [
      { value: 'clickbaity', label: 'Clickbaity' },
      { value: 'hooky', label: 'Hooky' },
      { value: 'storytelling', label: 'Storytelling' },
    ],
  }

  const toneDescriptions: Record<string, string> = {
    professional: 'Make it sound polished and smart.',
    witty: 'Add clever, subtle humor.',
    inspiring: 'Make it motivational.',
    savage: 'Make it brutally honest and bold.',
    relatable: 'Make it feel real and personal.',
    memey: 'Turn it into a meme-like joke.',
    flirty: 'Make it smooth and sexy.',
    aesthetic: 'Add a soft, vibey aesthetic.',
    deep: 'Make it emotional and thoughtful.',
    funny: 'Add a humorous twist.',
    sarcastic: 'Make it sarcastic.',
    hype: 'Make it high energy and hype.',
    clickbaity: 'Make it dramatic and catchy.',
    hooky: 'Write like a YouTube hook.',
    storytelling: 'Write like a short story.',
  }

  const platformTextMap: Record<Platform, string> = {
    linkedin: 'Make it suitable for LinkedIn.',
    twitter: 'Keep it short and punchy for Twitter.',
    instagram: 'Make it Instagram-worthy.',
    tiktok: 'Format it for TikTok.',
    youtube: 'Make it hook like a YouTube title.',
  }

  const getToneOptions = () => (platform ? toneOptionsByPlatform[platform] : [])

  const handleGenerate = async () => {
    if (!prompt && !platform && !tone) return
    setLoading(true)
    setResults([])

    const toneText = toneDescriptions[tone] || ''
    const platformText = platform ? platformTextMap[platform] : ''

    const base = `
                    You are a viral content strategist who writes short, punchy, and scroll-stopping captions for social media.

                    Given the following:

                        - Prompt / Content Description: "${prompt.trim()}"
                        - Tone: ${tone}
                        - Platform: ${platform}
                        - Include Hashtags: ${includeHashtags}
                        - Include CTA (Call to Action): ${includeCTA}

                        Your task:
                        1. Generate 5 unique, engaging captions based on this context.
                        2. Each caption should match the tone and vibe of the platform.
                        3. If hashtags are included, append 2–3 relevant hashtags.
                        4. If CTA is true, end each caption with a call to action (like “Follow for more”, “Drop a comment”, etc).

                        Only output the 5 captions. No explanation.
                `.trim()


    const hashtags = includeHashtags
      ? `#${prompt
          .split(' ')
          .slice(0, 3)
          .join(' ')
          .toLowerCase()
          .replace(/ /g, ' #')} #viral #captionjet`
      : ''
    

    try {
    const res = await axios.post('/api/response', { prompt: base })
    console.log(res.data.captions)
    setResults(res.data.captions)
  } catch (err) {
    console.error('Gemini error:', err)
    setResults(['Failed to generate captions. Try again.'])
  }

  setLoading(false)
}

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1000)
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="prompt">What’s your content about?</Label>
        <Textarea
          id="prompt"
          rows={3}
          placeholder="e.g., a girl dancing in the rain"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Platform</Label>
          <Select
            onValueChange={(v: Platform) => {
              setPlatform(v)
              setTone('')
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tone</Label>
          <Select onValueChange={(v) => setTone(v)} value={tone} disabled={!platform}>
            <SelectTrigger>
              <SelectValue placeholder={platform ? 'Choose tone' : 'Select platform first'} />
            </SelectTrigger>
            <SelectContent>
              {getToneOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hashtags"
            checked={includeHashtags}
            onCheckedChange={() => setIncludeHashtags(!includeHashtags)}
          />
          <Label htmlFor="hashtags">Add Hashtags</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cta"
            checked={includeCTA}
            onCheckedChange={() => setIncludeCTA(!includeCTA)}
          />
          <Label htmlFor="cta">Include CTA</Label>
        </div>
      </div>

      <Button className="w-full" onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Captions'}
      </Button>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((caption, index) => (
            <div
              key={index}
              className="relative bg-muted rounded-xl p-4 text-sm whitespace-pre-line"
            >
              {caption}
              <button
                onClick={() => handleCopy(caption, index)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-primary transition"
              >
                {copiedIndex === index ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
