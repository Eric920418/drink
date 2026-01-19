'use client'

import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Calendar, Gift, Users } from 'lucide-react'

const events = [
  {
    id: 1,
    title: '春季新品上市',
    subtitle: '櫻花季限定茶飲',
    description: '融合日本櫻花與台灣高山茶，打造專屬春天的浪漫茶香',
    date: '2026.03.01 - 2026.04.30',
    image: 'https://images.unsplash.com/photo-1645467148762-6d7fd24d7acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHRlYXxlbnwxfHx8fDE3Njg4MDg4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: '限定商品'
  },
  {
    id: 2,
    title: '會員日優惠',
    subtitle: '每月1號會員專屬',
    description: '憑會員卡享指定飲品第二杯半價優惠',
    date: '每月1號',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWJibGUlMjB0ZWF8ZW58MXx8fHwxNzY4NzU0ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: '會員專屬'
  },
  {
    id: 3,
    title: '茶藝體驗課程',
    subtitle: '週末茶文化工作坊',
    description: '專業茶藝師帶領，深入了解台灣茶文化與沖泡技巧',
    date: '每週六、日 14:00-16:00',
    image: 'https://images.unsplash.com/photo-1602943543714-cf535b048440?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBsZWF2ZXN8ZW58MXx8fHwxNzY4Nzc5NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: '文化體驗'
  }
]

export function Events() {
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
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tea-ink/80 via-tea-ink/40 to-transparent"></div>

                  {/* Tag */}
                  <div className="absolute top-6 left-6 bg-terracotta text-silk-white text-xs px-4 py-2 tracking-wider">
                    {event.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <h3 className="font-serif text-3xl text-silk-white mb-2">{event.title}</h3>
                  <p className="text-tea-sage text-lg mb-6">{event.subtitle}</p>

                  <p className="text-silk-white/60 leading-relaxed mb-8">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-3 text-silk-white/40 mb-8">
                    <Calendar className="w-5 h-5 text-terracotta" />
                    <span className="text-sm">{event.date}</span>
                  </div>

                  <button className="self-start px-8 py-3 border border-tea-sage/30 hover:bg-tea-sage hover:border-tea-sage text-tea-sage hover:text-tea-ink text-sm tracking-wider transition-all">
                    了解更多
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
