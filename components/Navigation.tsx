'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: '關於', href: '/#about' },
    { name: '茶單', href: '/menu' },
    { name: '活動', href: '/events' },
    { name: '加盟', href: '/franchise' },
    { name: '門市', href: '/stores' },
    { name: '聯絡', href: '/#contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-silk-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(26,47,35,0.08)]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <a href="https://ckh2013.com/" className="relative group">
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
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {/* 分隔線裝飾 */}
              <div className={`w-px h-6 mr-10 transition-colors duration-500 ${
                scrolled ? 'bg-tea-ink/20' : 'bg-silk-white/30'
              }`}></div>

              <div className="flex items-center gap-1">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative px-5 py-2 text-sm tracking-widest transition-all duration-300 group ${
                      scrolled
                        ? 'text-stone-gray hover:text-tea-ink'
                        : 'text-silk-white/70 hover:text-silk-white'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Hover 效果 - 毛筆劃過 */}
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] group-hover:w-3/4 transition-all duration-300 ${
                      scrolled ? 'bg-tea-jade' : 'bg-terracotta'
                    }`}></span>
                  </a>
                ))}
              </div>

              {/* CTA 按鈕 */}
              <div className={`ml-8 pl-8 border-l transition-colors duration-500 ${
                scrolled ? 'border-tea-ink/20' : 'border-silk-white/30'
              }`}>
                <a
                  href="/#contact"
                  className={`inline-flex items-center gap-2 px-5 py-2 text-sm tracking-wider transition-all duration-300 ${
                    scrolled
                      ? 'bg-tea-ink text-silk-white hover:bg-tea-forest'
                      : 'bg-silk-white/10 text-silk-white border border-silk-white/30 hover:bg-silk-white/20'
                  }`}
                >
                  <span>聯絡我們</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative w-10 h-10 flex items-center justify-center ${
                scrolled ? 'text-tea-ink' : 'text-silk-white'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                  className="h-[2px] bg-current origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  className="h-[2px] bg-current"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                  className="h-[2px] bg-current origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - 全螢幕水墨風格 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* 背景 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-tea-ink"
            >
              {/* 水墨裝飾 */}
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-tea-forest/30 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-terracotta/10 rounded-full blur-[80px]"></div>
            </motion.div>

            {/* 內容 */}
            <div className="relative h-full flex flex-col justify-center px-8">
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className="block group"
                  >
                    <div className="flex items-center gap-6 py-4 border-b border-silk-white/10">
                      <span className="text-terracotta/60 text-sm font-serif">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-3xl text-silk-white group-hover:text-terracotta transition-colors">
                        {item.name}
                      </span>
                      <div className="flex-1"></div>
                      <svg
                        className="w-5 h-5 text-silk-white/30 group-hover:text-terracotta group-hover:translate-x-2 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </nav>

              {/* 底部資訊 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-12 left-8 right-8"
              >
                <div className="flex items-center justify-between text-silk-white/40 text-sm">
                  <span>hello@teainn.tw</span>
                  <span className="font-serif">Est. 2020</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
