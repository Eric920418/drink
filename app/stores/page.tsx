'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { Footer } from '@/components/Footer'
import { MapPin, Clock, Phone, ExternalLink, Search, Filter, X } from 'lucide-react'

interface Store {
  id: string
  name: string
  slug: string
  address: string
  phone: string | null
  openingHours: string | null
  image: string | null
  features: string[]
  mapUrl: string | null
  orderUrl: string | null
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Get all unique features
  const allFeatures = useMemo(() => {
    const features = new Set<string>()
    stores.forEach(store => store.features.forEach(f => features.add(f)))
    return Array.from(features)
  }, [stores])

  // Filter stores
  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const matchesSearch = searchQuery === '' ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFeature = !selectedFeature || store.features.includes(selectedFeature)
      return matchesSearch && matchesFeature
    })
  }, [stores, searchQuery, selectedFeature])

  return (
    <main className="min-h-screen bg-silk-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-silk-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(47,9,12,0.08)]'
          : 'bg-tea-ink'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? 'h-16' : 'h-20'
          }`}>
            <Link href="/" className="relative group">
              <Image
                src="/20230321_fc059-removebg-preview.png"
                alt="茶客棧 TeaInn"
                width={180}
                height={80}
                className={`h-20 w-auto object-contain transition-all duration-500 ${
                  scrolled ? 'brightness-0' : ''
                }`}
                priority
              />
            </Link>

            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-5 py-2 text-sm tracking-wider transition-all ${
                scrolled ? 'text-tea-ink hover:text-tea-jade' : 'text-silk-white/70 hover:text-silk-white'
              }`}
            >
              <span>返回首頁</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 relative overflow-hidden bg-tea-ink">
        {/* Ink wash background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-tea-forest/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-terracotta/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Find Us</span>
            <h1 className="font-serif text-5xl lg:text-7xl text-silk-white mt-4 mb-6">
              門市<span className="text-tea-sage">據點</span>
            </h1>
            <p className="text-silk-white/60 text-lg leading-relaxed max-w-xl">
              每一間門市，都是茶香與文化交融的空間。歡迎蒞臨，感受屬於茶客棧的寧靜氛圍。
            </p>

            {/* Stats */}
            <div className="flex gap-12 mt-12 pt-8 border-t border-silk-white/10">
              <div>
                <span className="font-serif text-4xl text-terracotta">{stores.length}</span>
                <span className="block text-silk-white/40 text-sm mt-1">全台門市</span>
              </div>
              <div>
                <span className="font-serif text-4xl text-terracotta">{allFeatures.length}</span>
                <span className="block text-silk-white/40 text-sm mt-1">服務項目</span>
              </div>
            </div>
          </motion.div>

          {/* Decorative stamp */}
          <motion.div
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: -8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-12 top-32 hidden lg:block"
          >
            <div className="relative w-24 h-24 border-2 border-terracotta/40 flex items-center justify-center">
              <span className="font-serif text-terracotta text-3xl">店</span>
              <div className="absolute inset-1 border border-terracotta/20"></div>
            </div>
          </motion.div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="#faf8f5"/>
          </svg>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-silk-white sticky top-16 z-30 border-b border-tea-ink/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-gray" />
              <input
                type="text"
                placeholder="搜尋門市名稱或地址..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-paper-cream border-0 text-tea-ink placeholder:text-stone-gray/60 focus:outline-none focus:ring-2 focus:ring-tea-jade/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-gray hover:text-tea-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-3 bg-paper-cream text-tea-ink"
            >
              <Filter className="w-4 h-4" />
              <span>篩選</span>
              {selectedFeature && <span className="w-2 h-2 bg-terracotta rounded-full"></span>}
            </button>

            {/* Feature Filters (Desktop) */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <span className="text-stone-gray text-sm mr-2">篩選：</span>
              <button
                onClick={() => setSelectedFeature(null)}
                className={`px-4 py-2 text-sm transition-all ${
                  !selectedFeature
                    ? 'bg-tea-ink text-silk-white'
                    : 'bg-paper-cream text-tea-ink hover:bg-warm-sand'
                }`}
              >
                全部
              </button>
              {allFeatures.map(feature => (
                <button
                  key={feature}
                  onClick={() => setSelectedFeature(selectedFeature === feature ? null : feature)}
                  className={`px-4 py-2 text-sm transition-all ${
                    selectedFeature === feature
                      ? 'bg-tea-ink text-silk-white'
                      : 'bg-paper-cream text-tea-ink hover:bg-warm-sand'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4">
                  <button
                    onClick={() => { setSelectedFeature(null); setShowFilters(false); }}
                    className={`px-4 py-2 text-sm ${!selectedFeature ? 'bg-tea-ink text-silk-white' : 'bg-paper-cream text-tea-ink'}`}
                  >
                    全部
                  </button>
                  {allFeatures.map(feature => (
                    <button
                      key={feature}
                      onClick={() => { setSelectedFeature(feature); setShowFilters(false); }}
                      className={`px-4 py-2 text-sm ${selectedFeature === feature ? 'bg-tea-ink text-silk-white' : 'bg-paper-cream text-tea-ink'}`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-16 lg:py-24 bg-silk-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-paper-cream"></div>
                  <div className="p-6 bg-white">
                    <div className="h-6 bg-paper-cream w-2/3 mb-4"></div>
                    <div className="h-4 bg-paper-cream w-full mb-2"></div>
                    <div className="h-4 bg-paper-cream w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-600">錯誤：{error}</p>
            </div>
          )}

          {!loading && !error && filteredStores.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-tea-ink/10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-tea-ink/30" />
              </div>
              <p className="text-stone-gray text-lg">
                {searchQuery || selectedFeature ? '找不到符合條件的門市' : '目前沒有門市資料'}
              </p>
              {(searchQuery || selectedFeature) && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedFeature(null); }}
                  className="mt-4 px-6 py-2 border border-tea-ink/20 text-tea-ink hover:bg-paper-cream transition-colors"
                >
                  清除篩選
                </button>
              )}
            </div>
          )}

          {!loading && !error && filteredStores.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-stone-gray">
                  共 <span className="text-tea-ink font-medium">{filteredStores.length}</span> 間門市
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStores.map((store, index) => (
                  <motion.article
                    key={store.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white border border-tea-ink/5 hover:border-tea-jade/30 hover:shadow-xl transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <ImageWithFallback
                          src={store.image || '/images/placeholder-store.jpg'}
                          alt={store.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-tea-ink/60 via-transparent to-transparent"></div>

                        {/* Store number badge */}
                        <div className="absolute top-4 left-4 w-10 h-10 bg-terracotta flex items-center justify-center">
                          <span className="text-silk-white text-sm font-serif">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Store name overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-serif text-2xl text-silk-white">{store.name}</h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Features */}
                        {store.features.length > 0 && (
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
                        )}

                        {/* Info */}
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                            <span className="text-charcoal text-sm leading-relaxed">{store.address}</span>
                          </div>
                          {store.openingHours && (
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-terracotta flex-shrink-0" />
                              <span className="text-charcoal text-sm">{store.openingHours}</span>
                            </div>
                          )}
                          {store.phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />
                              <a href={`tel:${store.phone}`} className="text-charcoal text-sm hover:text-tea-jade transition-colors">
                                {store.phone}
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-6 pt-6 border-t border-tea-ink/5">
                          {store.mapUrl ? (
                            <a
                              href={store.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-3 bg-tea-ink text-silk-white text-sm tracking-wider hover:bg-tea-forest transition-colors text-center inline-flex items-center justify-center gap-2"
                            >
                              <MapPin className="w-4 h-4" />
                              查看地圖
                            </a>
                          ) : (
                            <button
                              onClick={() => alert('地圖連結準備中，請先電洽門市')}
                              className="flex-1 py-3 bg-tea-ink/70 text-silk-white/80 text-sm tracking-wider hover:bg-tea-ink transition-colors text-center inline-flex items-center justify-center gap-2"
                            >
                              <MapPin className="w-4 h-4" />
                              查看地圖
                            </button>
                          )}
                          {store.orderUrl ? (
                            <a
                              href={store.orderUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-3 border border-tea-ink/20 text-tea-ink text-sm tracking-wider hover:border-tea-ink hover:bg-paper-cream transition-colors text-center inline-flex items-center justify-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              線上訂購
                            </a>
                          ) : (
                            <button
                              onClick={() => alert('線上訂購功能即將開放')}
                              className="flex-1 py-3 border border-tea-ink/10 text-tea-ink/60 text-sm tracking-wider hover:border-tea-ink/30 transition-colors text-center inline-flex items-center justify-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              線上訂購
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-tea-ink relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-tea-forest/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl text-silk-white mb-4">
              想開設屬於你的茶館？
            </h2>
            <p className="text-silk-white/50 mb-10 max-w-2xl mx-auto">
              我們提供完整的加盟支援與培訓系統，讓您也能成為茶文化的傳承者
            </p>
            <Link
              href="/franchise"
              className="inline-block px-10 py-4 bg-terracotta hover:bg-rust-copper text-silk-white tracking-wider transition-colors"
            >
              了解加盟方案
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
