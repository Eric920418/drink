'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { MapPin, Clock } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Store {
  id: string
  name: string
  address: string
  phone: string | null
  openingHours: string | null
  image: string | null
  features: string[]
  mapUrl: string | null
  orderUrl: string | null
}

export function Stores() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStores() {
      try {
        setLoading(true)
        const res = await fetch('/api/stores')
        if (!res.ok) throw new Error('Failed to fetch stores')
        const data = await res.json()
        setStores(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching stores:', err)
        setError(err instanceof Error ? err.message : '載入門市失敗')
      } finally {
        setLoading(false)
      }
    }

    fetchStores()
  }, [])

  if (loading) {
    return (
      <section id="stores" className="py-8 lg:py-16 bg-paper-cream relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-tea-ink/10 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-tea-ink/10 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="stores" className="py-8 lg:py-16 bg-paper-cream relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-20">
          <p className="text-red-600">錯誤：{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="stores" className="py-8 lg:py-16 bg-paper-cream relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-tea-sage/5 rounded-full blur-[150px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Find Us</span>
            <h2 className="font-serif text-5xl lg:text-6xl text-tea-ink mt-4 mb-6">
              門市<span className="text-tea-jade">據點</span>
            </h2>
            <p className="text-stone-gray">
              歡迎蒞臨品茗，感受茶香氛圍
            </p>
          </motion.div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {stores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-silk-white overflow-hidden hover:shadow-xl transition-shadow duration-500">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={store.image || '/images/placeholder-store.jpg'}
                    alt={store.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tea-ink/60 to-transparent"></div>

                  {/* Store Number */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-terracotta flex items-center justify-center">
                    <span className="text-silk-white text-sm font-serif">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Store Name on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl text-silk-white">{store.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {store.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs text-tea-jade border border-tea-jade/30 px-2 py-1"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal text-sm">{store.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-terracotta flex-shrink-0" />
                      <span className="text-charcoal text-sm">{store.openingHours || '營業時間請電洽'}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {store.mapUrl ? (
                      <a href={store.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-tea-ink text-silk-white text-sm tracking-wider hover:bg-tea-forest transition-colors text-center">
                        查看地圖
                      </a>
                    ) : (
                      <button
                        onClick={() => alert('地圖連結準備中，請先電洽門市：' + (store.phone || '0800-TEA-TIME'))}
                        className="flex-1 py-3 bg-tea-ink/70 text-silk-white/70 text-sm tracking-wider hover:bg-tea-ink hover:text-silk-white transition-colors cursor-pointer"
                      >
                        查看地圖
                      </button>
                    )}
                    {store.orderUrl ? (
                      <a href={store.orderUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 border border-tea-ink/20 text-tea-ink text-sm tracking-wider hover:border-tea-ink transition-colors text-center">
                        線上訂購
                      </a>
                    ) : (
                      <button
                        onClick={() => alert('線上訂購功能即將開放，敬請期待！')}
                        className="flex-1 py-3 border border-tea-ink/20 text-tea-ink/70 text-sm tracking-wider hover:border-tea-ink hover:text-tea-ink transition-colors cursor-pointer"
                      >
                        線上訂購
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-tea-ink p-12 lg:p-16 text-center"
        >
          <h3 className="font-serif text-3xl lg:text-4xl text-silk-white mb-4">
            想開設屬於你的茶館？
          </h3>
          <p className="text-silk-white/50 mb-10 max-w-2xl mx-auto">
            我們提供完整的加盟支援與培訓系統，讓您也能成為茶文化的傳承者
          </p>
          <a
            href="#franchise"
            className="inline-block px-10 py-4 bg-terracotta hover:bg-rust-copper text-silk-white tracking-wider transition-colors"
          >
            了解加盟方案
          </a>
        </motion.div>
      </div>
    </section>
  )
}
