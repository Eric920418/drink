'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { Footer } from '@/components/Footer'
import { Calendar, ArrowLeft, Clock, Tag } from 'lucide-react'

interface Event {
  id: number
  title: string
  slug: string
  subtitle: string | null
  description: string | null
  image: string | null
  category: string | null
  startDate: string | null
  endDate: string | null
  isFeatured: boolean
  createdAt: string
}

export default function EventDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchEvent() {
      if (!slug) return

      try {
        setLoading(true)
        const res = await fetch(`/api/events/${slug}`)
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('活動不存在')
          }
          throw new Error('載入活動失敗')
        }
        const data = await res.json()
        setEvent(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching event:', err)
        setError(err instanceof Error ? err.message : '載入活動失敗')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [slug])

  const formatDateRange = (startDate: string | null, endDate: string | null) => {
    if (!startDate) return ''
    const start = new Date(startDate).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    if (!endDate) return start
    const end = new Date(endDate).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    return `${start} ~ ${end}`
  }

  const isEventActive = (startDate: string | null, endDate: string | null) => {
    const now = new Date()
    if (startDate && new Date(startDate) > now) return 'upcoming'
    if (endDate && new Date(endDate) < now) return 'ended'
    return 'active'
  }

  return (
    <main className="min-h-screen bg-tea-ink">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-tea-ink/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <Link href="/" className="relative group">
              <Image
                src="/20230321_fc059-removebg-preview.png"
                alt="茶客棧 TeaInn"
                width={180}
                height={80}
                className="h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* Back to Events */}
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm tracking-wider text-silk-white/70 hover:text-silk-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回活動列表</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      {loading && (
        <div className="pt-32 pb-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-silk-white/10 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-silk-white/10 rounded w-64 mx-auto"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="pt-32 pb-16 text-center">
          <p className="text-red-400 mb-8">錯誤：{error}</p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 border border-tea-sage/30 hover:bg-tea-sage hover:border-tea-sage text-tea-sage hover:text-tea-ink text-sm tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            返回活動列表
          </Link>
        </div>
      )}

      {!loading && !error && event && (
        <>
          {/* Hero Image */}
          <section className="pt-20 relative">
            <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
              <ImageWithFallback
                src={event.image || '/images/placeholder-event.jpg'}
                alt={event.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tea-ink via-tea-ink/60 to-tea-ink/30"></div>

              {/* Tags on Image */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
                {event.category && (
                  <span className="bg-terracotta text-silk-white text-xs px-4 py-2 tracking-wider">
                    {event.category}
                  </span>
                )}
                {event.isFeatured && (
                  <span className="bg-rust-copper text-silk-white text-xs px-4 py-2 tracking-wider">
                    精選活動
                  </span>
                )}
                {event.startDate && (
                  <span className={`text-silk-white text-xs px-4 py-2 tracking-wider ${
                    isEventActive(event.startDate, event.endDate) === 'active'
                      ? 'bg-tea-sage/80'
                      : isEventActive(event.startDate, event.endDate) === 'upcoming'
                      ? 'bg-blue-500/80'
                      : 'bg-stone-gray/80'
                  }`}>
                    {isEventActive(event.startDate, event.endDate) === 'active'
                      ? '進行中'
                      : isEventActive(event.startDate, event.endDate) === 'upcoming'
                      ? '即將開始'
                      : '已結束'}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Event Content */}
          <section className="relative -mt-32 pb-20">
            <div className="max-w-[900px] mx-auto px-6 md:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-tea-forest/30 backdrop-blur-sm border border-silk-white/10 p-8 lg:p-12"
              >
                {/* Title */}
                <div className="text-center mb-10">
                  <h1 className="font-serif text-4xl lg:text-5xl text-silk-white mb-4">
                    {event.title}
                  </h1>
                  {event.subtitle && (
                    <p className="text-tea-sage text-xl">{event.subtitle}</p>
                  )}
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap justify-center gap-6 mb-10 pb-10 border-b border-silk-white/10">
                  {(event.startDate || event.endDate) && (
                    <div className="flex items-center gap-3 text-silk-white/60">
                      <Calendar className="w-5 h-5 text-terracotta" />
                      <span>{formatDateRange(event.startDate, event.endDate)}</span>
                    </div>
                  )}
                  {event.category && (
                    <div className="flex items-center gap-3 text-silk-white/60">
                      <Tag className="w-5 h-5 text-terracotta" />
                      <span>{event.category}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none">
                  {event.description ? (
                    <div className="text-silk-white/70 leading-relaxed whitespace-pre-wrap text-lg">
                      {event.description}
                    </div>
                  ) : (
                    <p className="text-silk-white/50 text-center">更多活動詳情請洽門市</p>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-12 pt-10 border-t border-silk-white/10 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-tea-sage hover:bg-tea-jade text-tea-ink text-sm tracking-wider transition-all"
                  >
                    <span>洽詢活動</span>
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-silk-white/30 hover:border-silk-white/50 text-silk-white/70 hover:text-silk-white text-sm tracking-wider transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>查看更多活動</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  )
}
