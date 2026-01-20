'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

interface Category {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  image: string | null
  category: Category | null
  tags: string[]
  isNew: boolean
  isFeatured: boolean
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ])

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setProducts(productsData)
        setCategories(categoriesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err instanceof Error ? err.message : '載入產品失敗')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const categoryNames = ['全部', ...categories.map(c => c.name)]
  const filteredProducts = activeCategory === '全部'
    ? products
    : products.filter(p => p.category?.name === activeCategory)

  return (
    <main className="bg-silk-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-paper-cream">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tea-sage/5 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-terracotta/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Complete Menu</span>
            <h1 className="font-serif text-5xl lg:text-7xl text-tea-ink mt-4 mb-6">
              完整<span className="text-tea-jade">茶單</span>
            </h1>
            <p className="text-stone-gray max-w-xl mx-auto">
              探索我們所有的精選茶飲，每一款都是時間與匠心的結晶
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="relative py-16 bg-paper-cream">
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-2 mb-16 flex-wrap"
          >
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-3 text-sm tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-silk-white'
                    : 'text-stone-gray hover:text-tea-ink'
                }`}
              >
                <span
                  className={`absolute inset-0 transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-tea-ink'
                      : 'bg-transparent border border-tea-ink/10 hover:border-tea-ink/30'
                  }`}
                ></span>
                <span className="relative">{cat}</span>
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="animate-pulse">
                <div className="h-8 bg-tea-ink/10 rounded w-48 mx-auto mb-4"></div>
                <div className="h-4 bg-tea-ink/10 rounded w-64 mx-auto"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-600">錯誤：{error}</p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="wait">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative bg-silk-white overflow-hidden">
                      {/* Image Container */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <ImageWithFallback
                          src={product.image || '/images/placeholder-product.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-tea-ink/60 via-tea-ink/20 to-transparent"></div>

                        {/* Price Tag */}
                        <div className="absolute top-6 right-6">
                          <div className="relative w-16 h-16 flex items-center justify-center bg-terracotta rotate-3 group-hover:rotate-0 transition-transform duration-300">
                            <div className="absolute inset-1 border border-silk-white/30"></div>
                            <div className="text-center text-silk-white">
                              <span className="text-[10px] block">NT$</span>
                              <span className="font-serif text-xl">{product.price}</span>
                            </div>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-6 left-6 flex gap-2">
                          {product.category && (
                            <span className="px-3 py-1 bg-silk-white/90 text-tea-ink text-xs tracking-wider">
                              {product.category.name}
                            </span>
                          )}
                          {product.isNew && (
                            <span className="px-3 py-1 bg-terracotta text-silk-white text-xs tracking-wider">
                              新品
                            </span>
                          )}
                        </div>

                        {/* Bottom Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="text-xs text-silk-white/60 tracking-widest uppercase mb-1">
                            {product.slug}
                          </div>
                          <h3 className="font-serif text-2xl text-silk-white mb-2">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 border-x border-b border-tea-ink/5">
                        <p className="text-stone-gray text-sm leading-relaxed line-clamp-2">
                          {product.description || '精選茶品，品質保證'}
                        </p>
                      </div>

                      {/* Corner Decoration */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-tea-jade/30 -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-tea-jade/30 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-gray">此分類目前沒有產品</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
