'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Calendar, ArrowRight } from 'lucide-react'

interface Event {
  id: string
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

export function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (loading) {
    return (
      <section id="events" className="py-8 lg:py-16 bg-tea-ink relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-silk-white/10 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-silk-white/10 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="events" className="py-8 lg:py-16 bg-tea-ink relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-20">
          <p className="text-red-400">錯誤：{error}</p>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return (
      <section id="events" className="py-8 lg:py-16 bg-tea-ink relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-20">
          <p className="text-silk-white/50">目前沒有進行中的活動</p>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="py-8 lg:py-16 bg-tea-ink relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-tea-forest/10 rounded-full blur-[150px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Events & Promotions</span>
            <h2 className="font-serif text-5xl lg:text-6xl text-silk-white mt-4 mb-6">
              活動<span className="text-tea-sage">專區</span>
            </h2>
            <p className="text-silk-white/50 max-w-xl mx-auto">
              精彩活動與優惠，與您分享茶香時光
            </p>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 bg-tea-forest/20 border border-silk-white/5 hover:border-tea-sage/30 transition-all duration-500 overflow-hidden ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}>
                {/* Image */}
                <div className={`relative h-80 lg:h-[400px] overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <ImageWithFallback
                    src={event.image || '/images/placeholder-event.jpg'}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tea-ink/80 via-tea-ink/40 to-transparent"></div>

                  {/* Tag */}
                  {event.category && (
                    <div className="absolute top-6 left-6 bg-terracotta text-silk-white text-xs px-4 py-2 tracking-wider">
                      {event.category}
                    </div>
                  )}
                  {event.isFeatured && (
                    <div className="absolute top-6 right-6 bg-rust-copper text-silk-white text-xs px-4 py-2 tracking-wider">
                      精選活動
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <h3 className="font-serif text-3xl text-silk-white mb-2">{event.title}</h3>
                  {event.subtitle && (
                    <p className="text-tea-sage text-lg mb-6">{event.subtitle}</p>
                  )}

                  <p className="text-silk-white/60 leading-relaxed mb-8">
                    {event.description || '更多活動詳情請洽門市'}
                  </p>

                  {(event.startDate || event.endDate) && (
                    <div className="flex items-center gap-3 text-silk-white/40 mb-8">
                      <Calendar className="w-5 h-5 text-terracotta" />
                      <span className="text-sm">{formatDateRange(event.startDate, event.endDate)}</span>
                    </div>
                  )}

                  <Link
                    href={`/events/${event.slug}`}
                    className="self-start inline-flex items-center gap-2 px-8 py-3 border border-tea-sage/30 hover:bg-tea-sage hover:border-tea-sage text-tea-sage hover:text-tea-ink text-sm tracking-wider transition-all group"
                  >
                    <span>了解更多</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
