'use client'

import { motion } from 'motion/react'
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-tea-ink overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-tea-forest/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-terracotta/5 rounded-full blur-[100px]"></div>

      {/* 頂部裝飾線 */}
      <div className="h-px bg-gradient-to-r from-transparent via-tea-sage/30 to-transparent"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* 主要內容 */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand - 佔據更多空間 */}
          <div className="lg:col-span-5">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/20230321_fc059-removebg-preview.png"
                alt="茶客棧 TeaInn"
                width={180}
                height={70}
                className="h-20 w-auto object-contain"
              />
            </div>

            <p className="text-silk-white/50 leading-relaxed mb-8 max-w-md">
              在快節奏的都市中，提供一處靜心品茗的所在。讓每一口茶湯，都成為生活中的美好時刻。
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="group w-10 h-10 border border-silk-white/10 hover:border-terracotta/50 hover:bg-terracotta/10 flex items-center justify-center transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-silk-white/50 group-hover:text-terracotta transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-silk-white text-lg mb-6">導覽</h3>
            <ul className="space-y-3">
              {['關於我們', '經典飲品', '活動專區', '加盟資訊', '門市據點'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item === '關於我們' ? 'about' : item === '經典飲品' ? 'products' : item === '活動專區' ? 'events' : item === '加盟資訊' ? 'franchise' : 'stores'}`}
                    className="text-silk-white/50 hover:text-tea-sage text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-tea-sage group-hover:w-3 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-silk-white text-lg mb-6">聯絡資訊</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-silk-white/40 text-xs block mb-1">客服專線</span>
                  <span className="text-silk-white text-sm">0800-TEA-TIME</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-silk-white/40 text-xs block mb-1">電子信箱</span>
                  <span className="text-silk-white text-sm">hello@teainn.tw</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-silk-white/40 text-xs block mb-1">營業時間</span>
                  <span className="text-silk-white text-sm">10:00 - 22:00</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-silk-white/40 text-xs block mb-1">總部地址</span>
                  <span className="text-silk-white text-sm">台北市大安區茶香路 88 號</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* 分隔線 */}
        <div className="h-px bg-silk-white/10"></div>

        {/* 底部版權 */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-silk-white/30 text-sm">
            &copy; {currentYear} 茶客棧 TeaInn. All rights reserved.
          </p>

          <div className="flex gap-8 text-sm">
            <a href="#" className="text-silk-white/30 hover:text-tea-sage transition-colors">
              隱私政策
            </a>
            <a href="#" className="text-silk-white/30 hover:text-tea-sage transition-colors">
              服務條款
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
