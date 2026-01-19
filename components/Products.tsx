'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const categories = ['全部', '經典', '特調', '水果', '純茶']

const products = [
  {
    id: 1,
    name: '老欉紅茶',
    nameEn: 'Aged Black Tea',
    description: '百年茶樹 / 日曬萎凋 / 炭火烘焙',
    price: '65',
    category: '純茶',
    image: 'https://images.unsplash.com/photo-1693114812744-ed1b09d05984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRlYSUyMGN1cHxlbnwxfHx8fDE3Njg2OTQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    name: '黑糖珍珠鮮奶',
    nameEn: 'Brown Sugar Pearl Milk',
    description: '手工珍珠 / 古法黑糖 / 鮮乳坊鮮奶',
    price: '75',
    category: '經典',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWJibGUlMjB0ZWF8ZW58MXx8fHwxNzY4NzU0ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: '金萱烏龍',
    nameEn: 'Jin Xuan Oolong',
    description: '台灣高山 / 奶香四溢 / 回甘悠長',
    price: '70',
    category: '純茶',
    image: 'https://images.unsplash.com/photo-1707578365460-f92c22d18a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwdGVhJTIwZHJpbmt8ZW58MXx8fHwxNzY4NzExNDgwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    name: '荔枝烏龍氣泡',
    nameEn: 'Lychee Oolong Sparkling',
    description: '新鮮荔枝 / 手工氣泡 / 清爽消暑',
    price: '85',
    category: '水果',
    image: 'https://images.unsplash.com/photo-1645467148762-6d7fd24d7acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHRlYXxlbnwxfHx8fDE3Njg4MDg4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    name: '炭焙鐵觀音',
    nameEn: 'Charcoal Roasted Tieguanyin',
    description: '傳統工藝 / 炭火烘焙 / 喉韻深沉',
    price: '80',
    category: '特調',
    image: 'https://images.unsplash.com/photo-1693114812744-ed1b09d05984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRlYSUyMGN1cHxlbnwxfHx8fDE3Njg2OTQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    name: '芝芝莓果',
    nameEn: 'Cheese Berry Tea',
    description: '新鮮莓果 / 奶蓋芝士 / 層次豐富',
    price: '90',
    category: '特調',
    image: 'https://images.unsplash.com/photo-1645467148762-6d7fd24d7acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHRlYXxlbnwxfHx8fDE3Njg4MDg4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
]

export function Products() {
  const [activeCategory, setActiveCategory] = useState('全部')

  const filteredProducts = activeCategory === '全部'
    ? products
    : products.filter(p => p.category === activeCategory)

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
          {categories.map((cat) => (
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
                      src={product.image}
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
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-silk-white/90 text-tea-ink text-xs tracking-wider">
                        {product.category}
                      </span>
                    </div>

                    {/* Bottom Content on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-xs text-silk-white/60 tracking-widest uppercase mb-1">
                        {product.nameEn}
                      </div>
                      <h3 className="font-serif text-2xl text-silk-white mb-2">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 border-x border-b border-tea-ink/5">
                    <p className="text-stone-gray text-sm mb-6 leading-relaxed">
                      {product.description}
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
