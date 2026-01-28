'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface HeroData {
  title: string
  subtitle: string
  tagline1: string
  tagline2: string
  description: string
  backgroundImage: string
  ctaText: string
  ctaLink: string
  stats: Array<{ number: string; label: string; sublabel: string }>
}

const defaultData: HeroData = {
  title: '茶客棧',
  subtitle: 'Since 2020 - Taiwan',
  tagline1: '尋常品茗',
  tagline2: '不尋常的堅持',
  description: '在快節奏的都市中，為您保留一方寧靜的茶香天地。',
  backgroundImage: '/images/hero-bg.png',
  ctaText: '探索茶單',
  ctaLink: '#products',
  stats: [
    { number: '15+', label: '直營門市', sublabel: 'Stores' },
    { number: '30+', label: '精選茶品', sublabel: 'Products' },
    { number: '6', label: '年品牌歷史', sublabel: 'Years' },
  ]
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<HeroData>(defaultData)

  useEffect(() => {
    fetch('/api/content/hero')
      .then(res => res.ok ? res.json() : null)
      .then(payload => {
        if (payload) {
          setData({
            title: payload.title || defaultData.title,
            subtitle: payload.subtitle || defaultData.subtitle,
            tagline1: payload.tagline1 || defaultData.tagline1,
            tagline2: payload.tagline2 || defaultData.tagline2,
            description: payload.description || defaultData.description,
            backgroundImage: payload.backgroundImage || defaultData.backgroundImage,
            ctaText: payload.ctaText || defaultData.ctaText,
            ctaLink: payload.ctaLink || defaultData.ctaLink,
            stats: Array.isArray(payload.stats) ? payload.stats : defaultData.stats,
          })
        }
      })
      .catch(err => console.error('Failed to fetch hero data:', err))
  }, [])
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-tea-ink"
    >
      {/* 背景圖片 with parallax */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <Image
          src={data.backgroundImage}
          alt="Tea"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* 漸層覆蓋 - 營造水墨感 */}
        <div className="absolute inset-0 bg-gradient-to-b from-tea-ink via-tea-ink/80 to-tea-ink"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-tea-ink via-transparent to-tea-ink/50"></div>
      </motion.div>

      {/* 水墨裝飾元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 大圓 - 茶碗意象 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 rounded-full border border-silk-white/5"></div>
          <div className="absolute inset-8 rounded-full border border-silk-white/5"></div>
          <div className="absolute inset-16 rounded-full border border-tea-sage/10"></div>
        </motion.div>

        {/* 水墨暈染效果 */}
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-tea-forest/20 rounded-full blur-[120px] animate-ink"></div>
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-terracotta/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[60%] right-[20%] w-[300px] h-[300px] bg-tea-jade/10 rounded-full blur-[80px]"></div>

        {/* 飄落的茶葉裝飾 */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, 600],
              x: [0, Math.sin(i) * 100],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
            className="absolute text-tea-sage/30"
            style={{
              left: `${15 + i * 18}%`,
              top: '-5%',
              fontSize: `${16 + i * 4}px`
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.5,8.5c0,0-3-1.5-5.5,1c-2.5-2.5-5.5-1-5.5-1S3,11,6.5,14.5c0.7,0.7,1.5,1.2,2.4,1.5C8.6,17.3,8,19,8,19 s4-0.5,5-4c0.2,0,0.3,0,0.5,0c1,3.5,5,4,5,4s-0.6-1.7-0.9-3c0.9-0.3,1.7-0.8,2.4-1.5C23.5,11,17.5,8.5,17.5,8.5z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 主要內容 */}
      <motion.div
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* 左側 - 主標題區 */}
            <div className="lg:col-span-7 relative">
              {/* 頂部裝飾線與副標 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px w-16 bg-gradient-to-r from-terracotta to-transparent"></div>
                <span className="text-terracotta text-xs tracking-[0.4em] uppercase font-light">
                  {data.subtitle}
                </span>
              </motion.div>

              {/* 主標題 - 書法風格大字 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative mb-8"
              >
                <h1 className="font-serif tracking-tight">
                  <span className="block text-[clamp(4rem,12vw,9rem)] text-silk-white leading-none">
                    {data.title}
                  </span>
                  <span className="block text-[clamp(1.75rem,4vw,2.75rem)] text-tea-sage/80 mt-6">
                    {data.tagline1}
                  </span>
                  <span className="block text-[clamp(1.75rem,4vw,2.75rem)] text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-rust-copper to-terracotta mt-2">
                    {data.tagline2}
                  </span>
                </h1>

                {/* 印章裝飾 */}
                <motion.div
                  initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: -8, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -right-4 top-4 lg:right-0 lg:top-8"
                >
                  <div className="relative w-20 h-20 border-2 border-terracotta/60 flex items-center justify-center rotate-3">
                    <span className="font-serif text-terracotta text-2xl">茶</span>
                    <div className="absolute inset-1 border border-terracotta/30"></div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 描述文字 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="max-w-lg mb-8"
              >
                <p className="text-silk-white/60 text-lg leading-relaxed">
                  {data.description}
                </p>
              </motion.div>

              {/* CTA 按鈕組 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={data.ctaLink}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-terracotta text-silk-white overflow-hidden"
                >
                  <span className="relative z-10 text-sm tracking-widest">{data.ctaText}</span>
                  <svg
                    className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-rust-copper translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>

                <a
                  href="#about"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-silk-white/20 text-silk-white/80 hover:border-tea-sage/50 hover:text-silk-white transition-all"
                >
                  <span className="text-sm tracking-widest">品牌故事</span>
                  <div className="w-6 h-px bg-current group-hover:w-8 transition-all"></div>
                </a>
              </motion.div>
            </div>

            {/* 右側 - 數據展示 (垂直排列) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="lg:col-span-5 lg:col-start-9"
            >
              <div className="relative">
                {/* 裝飾框線 */}
                <div className="absolute -top-8 -left-8 w-24 h-24 border-t border-l border-tea-sage/20"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 border-b border-r border-tea-sage/20"></div>

                <div className="space-y-8 p-8">
                  {data.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.15 }}
                      className="group flex items-baseline gap-6 pb-8 border-b border-silk-white/10 last:border-0 last:pb-0"
                    >
                      <span className="font-serif text-5xl text-terracotta group-hover:text-rust-copper transition-colors">
                        {stat.number}
                      </span>
                      <div>
                        <span className="block text-silk-white text-lg">{stat.label}</span>
                        <span className="text-silk-white/30 text-xs tracking-widest uppercase">{stat.sublabel}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 底部滾動提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-silk-white/40 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-tea-sage/50 to-transparent"
        ></motion.div>
      </motion.div>

      {/* 底部過渡漸層 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-silk-white to-transparent"></div>
    </section>
  )
}
