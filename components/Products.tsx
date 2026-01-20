'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'

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

export function Products() {
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

  if (loading) {
    return (
      <section id="products" className="relative py-8 lg:py-16 bg-paper-cream overflow-hidden">
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
      <section id="products" className="relative py-8 lg:py-16 bg-paper-cream overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-20">
          <p className="text-red-600">錯誤：{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="relative py-8 lg:py-16 bg-paper-cream overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tea-sage/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-terracotta/5 rounded-full blur-[100px]"></div>

      {/* 背景大字 */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 text-tea-ink/[0.02] text-[400px] font-serif select-none pointer-events-none leading-none">
        茶
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Our Menu</span>
            <h2 className="font-serif text-5xl lg:text-6xl text-tea-ink mt-4 mb-6">
              精選<span className="text-tea-jade">茶單</span>
            </h2>
            <p className="text-stone-gray max-w-xl mx-auto">
              每一款茶飲都是時間與匠心的結晶，從茶園到茶杯，我們只做最好的
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              {/* 背景 */}
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                {/* Product Card */}
                <div className="relative bg-silk-white overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ImageWithFallback
                      src={product.image || '/images/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-tea-ink/60 via-tea-ink/20 to-transparent"></div>

                    {/* Price Tag - 印章風格 */}
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

                    {/* Bottom Content on Image */}
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
                    <p className="text-stone-gray text-sm mb-6 leading-relaxed">
                      {product.description || '精選茶品，品質保證'}
                    </p>

                    <button className="group/btn w-full relative py-3 border border-tea-ink/20 hover:border-tea-ink transition-colors overflow-hidden">
                      <span className="relative z-10 text-tea-ink text-sm tracking-wider group-hover/btn:text-silk-white transition-colors duration-300">
                        立即選購
                      </span>
                      <div className="absolute inset-0 bg-tea-ink translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </button>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-tea-jade/30 -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-tea-jade/30 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-4 text-tea-ink hover:text-terracotta transition-colors"
          >
            <span className="text-sm tracking-widest">瀏覽完整茶單</span>
            <div className="w-8 h-px bg-current group-hover:w-12 transition-all"></div>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
