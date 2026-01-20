'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { Footer } from '@/components/Footer'
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react'

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
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        const res = await fetch('/api/events')
        if (!res.ok) throw new Error('Failed to fetch events')
        const data = await res.json()
        setEvents(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError(err instanceof Error ? err.message : '載入活動失敗')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatDateRange = (startDate: string | null, endDate: string | null) => {
    if (!startDate) return ''
    const start = new Date(startDate).toLocaleDateString('zh-TW')
    if (!endDate) return start
    const end = new Date(endDate).toLocaleDateString('zh-TW')
    return `${start} - ${end}`
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

            {/* Back to Home */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm tracking-wider text-silk-white/70 hover:text-silk-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回首頁</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-tea-forest/10 rounded-full blur-[150px]"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Events & Promotions</span>
            <h1 className="font-serif text-5xl lg:text-7xl text-silk-white mt-4 mb-6">
              活動<span className="text-tea-sage">專區</span>
            </h1>
            <p className="text-silk-white/50 max-w-xl mx-auto">
              精彩活動與優惠，與您分享茶香時光
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-8 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {loading && (
            <div className="text-center py-20">
              <div className="animate-pulse">
                <div className="h-8 bg-silk-white/10 rounded w-48 mx-auto mb-4"></div>
                <div className="h-4 bg-silk-white/10 rounded w-64 mx-auto"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-400">錯誤：{error}</p>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="text-center py-20">
              <p className="text-silk-white/50">目前沒有進行中的活動</p>
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/events/${event.slug}`} className="group block">
                    <div className="bg-tea-forest/20 border border-silk-white/5 hover:border-tea-sage/30 transition-all duration-500 overflow-hidden">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <ImageWithFallback
                          src={event.image || '/images/placeholder-event.jpg'}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-tea-ink/80 via-tea-ink/40 to-transparent"></div>

                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {event.category && (
                            <span className="bg-terracotta text-silk-white text-xs px-3 py-1.5 tracking-wider">
                              {event.category}
                            </span>
                          )}
                          {event.isFeatured && (
                            <span className="bg-rust-copper text-silk-white text-xs px-3 py-1.5 tracking-wider">
                              精選
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-serif text-2xl text-silk-white mb-2 group-hover:text-tea-sage transition-colors">
                          {event.title}
                        </h3>
                        {event.subtitle && (
                          <p className="text-tea-sage text-sm mb-4">{event.subtitle}</p>
                        )}

                        {event.description && (
                          <p className="text-silk-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                            {event.description}
                          </p>
                        )}

                        {(event.startDate || event.endDate) && (
                          <div className="flex items-center gap-2 text-silk-white/40 text-sm mb-4">
                            <Calendar className="w-4 h-4 text-terracotta" />
                            <span>{formatDateRange(event.startDate, event.endDate)}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-tea-sage text-sm group-hover:gap-3 transition-all">
                          <span>查看詳情</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
