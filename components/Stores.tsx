'use client'

import { motion } from 'motion/react'
import { MapPin, Clock } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const stores = [
  {
    id: 1,
    name: '信義旗艦店',
    address: '台北市信義區信義路五段7號',
    hours: '10:00 - 22:00',
    features: ['外帶', '內用', '包場'],
    image: 'https://images.unsplash.com/photo-1521917441209-e886f0404a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4ODA4ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    name: '東區概念店',
    address: '台北市大安區忠孝東路四段181巷',
    hours: '11:00 - 23:00',
    features: ['外帶', '內用'],
    image: 'https://images.unsplash.com/photo-1521917441209-e886f0404a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4ODA4ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: '西門形象店',
    address: '台北市萬華區成都路38號',
    hours: '11:00 - 00:00',
    features: ['外帶', '內用', '夜間營業'],
    image: 'https://images.unsplash.com/photo-1521917441209-e886f0404a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4ODA4ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
]

export function Stores() {
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
                    src={store.image}
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
                      <span className="text-charcoal text-sm">{store.hours}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-tea-ink text-silk-white text-sm tracking-wider hover:bg-tea-forest transition-colors">
                      查看地圖
                    </button>
                    <button className="flex-1 py-3 border border-tea-ink/20 text-tea-ink text-sm tracking-wider hover:border-tea-ink transition-colors">
                      線上訂購
                    </button>
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
