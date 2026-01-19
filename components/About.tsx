'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-40 bg-silk-white overflow-hidden"
    >
      {/* 背景紋理 */}
      <div className="absolute inset-0 texture-paper opacity-50"></div>

      {/* 裝飾元素 - 茶葉圖案 */}
      <div className="absolute top-20 left-10 text-tea-sage/10 text-[200px] font-serif select-none pointer-events-none">
        茶
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* 左側 - 圖片區 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* 主圖片 */}
              <motion.div
                style={{ y: imageY }}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1602943543714-cf535b048440?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBsZWF2ZXN8ZW58MXx8fHwxNzY4Nzc5NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="茶葉製作"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* 覆蓋層 */}
                <div className="absolute inset-0 bg-gradient-to-t from-tea-ink/20 to-transparent"></div>
              </motion.div>

              {/* 裝飾框 */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-tea-jade/30 -z-10"></div>

              {/* 浮動卡片 - 引言 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 lg:-right-16 bg-tea-ink p-8 max-w-[280px]"
              >
                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-terracotta text-4xl font-serif">&ldquo;</span>
                  <p className="font-serif text-silk-white text-lg leading-relaxed pl-4">
                    一期一會，<br/>珍惜每一杯茶的相遇
                  </p>
                  <div className="mt-4 pt-4 border-t border-silk-white/10">
                    <span className="text-tea-sage text-xs tracking-widest">茶道精神</span>
                  </div>
                </div>
              </motion.div>

              {/* 角落裝飾 */}
              <div className="absolute -top-4 -right-4 w-8 h-8">
                <div className="w-full h-px bg-terracotta"></div>
                <div className="h-full w-px bg-terracotta absolute right-0 top-0"></div>
              </div>
            </div>
          </motion.div>

          {/* 右側 - 內容區 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            {/* 小標題 */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-terracotta text-xs tracking-[0.3em] uppercase">About Us</span>
              <div className="h-px flex-1 bg-gradient-to-r from-terracotta/50 to-transparent max-w-[100px]"></div>
            </div>

            {/* 主標題 */}
            <h2 className="font-serif text-5xl lg:text-6xl text-tea-ink mb-8 leading-tight">
              茶的
              <span className="text-tea-jade">哲學</span>
            </h2>

            {/* 內文 */}
            <div className="space-y-6 text-stone-gray leading-relaxed mb-12">
              <p className="text-lg">
                在快速的都市節奏中，我們選擇慢下來。每一片茶葉的挑選，每一次沖泡的溫度，都是對傳統的致敬，對品質的堅持。
              </p>
              <p>
                從清晨的茶園到黃昏的茶室，茶客棧始終相信，一杯好茶不僅是飲品，更是一種生活態度。我們走訪台灣各地茶區，與茶農建立深厚情誼，只為找到最純粹的茶香。
              </p>
            </div>

            {/* 數據展示 */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-tea-ink/10">
              {[
                { number: '500+', label: '每日新鮮茶飲' },
                { number: '15+', label: '直營門市據點' },
                { number: '98%', label: '顧客滿意度' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="font-serif text-3xl lg:text-4xl text-terracotta mb-1">
                    {stat.number}
                  </div>
                  <div className="text-mist-gray text-xs lg:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <a
                href="#products"
                className="group inline-flex items-center gap-4 text-tea-ink hover:text-tea-jade transition-colors"
              >
                <span className="text-sm tracking-widest">探索我們的茶品</span>
                <div className="w-12 h-px bg-current group-hover:w-16 transition-all"></div>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
