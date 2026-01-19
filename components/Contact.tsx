'use client'

import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="py-8 lg:py-16 bg-tea-ink relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tea-forest/10 rounded-full blur-[150px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Contact Us</span>
            <h2 className="font-serif text-5xl lg:text-6xl text-silk-white mt-4 mb-6">
              聯絡<span className="text-tea-sage">我們</span>
            </h2>
            <p className="text-silk-white/50">
              我們隨時傾聽您的聲音
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-3xl text-silk-white mb-6">與我們聯繫</h3>
            <p className="text-silk-white/50 leading-relaxed mb-12">
              無論是產品諮詢、合作提案或任何建議，我們都很樂意與您交流。歡迎透過以下方式聯繫我們。
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: Phone,
                  title: '客服專線',
                  lines: ['0800-TEA-TIME', '(02) 2345-6789']
                },
                {
                  icon: Mail,
                  title: '電子信箱',
                  lines: ['hello@teainn.tw', 'franchise@teainn.tw (加盟)']
                },
                {
                  icon: MapPin,
                  title: '總部地址',
                  lines: ['台北市信義區信義路五段7號12樓']
                },
                {
                  icon: Clock,
                  title: '服務時間',
                  lines: ['週一至週五 09:00 - 18:00', '週六、日及國定假日休息']
                }
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-tea-forest/30 group-hover:bg-terracotta/20 border border-tea-sage/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-tea-sage group-hover:text-terracotta transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-silk-white text-lg mb-2">{title}</h4>
                    {lines.map((line, i) => (
                      <p key={i} className="text-silk-white/50 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-tea-forest/20 border border-silk-white/5 p-8 lg:p-10"
          >
            <h3 className="font-serif text-2xl text-silk-white mb-8">發送訊息</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-silk-white/60 text-sm mb-2">姓名</label>
                  <input
                    type="text"
                    className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors placeholder:text-silk-white/30"
                    placeholder="請輸入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-silk-white/60 text-sm mb-2">電話</label>
                  <input
                    type="tel"
                    className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors placeholder:text-silk-white/30"
                    placeholder="09XX-XXX-XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-silk-white/60 text-sm mb-2">電子信箱</label>
                <input
                  type="email"
                  className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors placeholder:text-silk-white/30"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-silk-white/60 text-sm mb-2">主旨</label>
                <select className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors">
                  <option value="">請選擇主旨</option>
                  <option value="product">產品諮詢</option>
                  <option value="franchise">加盟洽詢</option>
                  <option value="cooperation">合作提案</option>
                  <option value="feedback">客訴反映</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div>
                <label className="block text-silk-white/60 text-sm mb-2">訊息內容</label>
                <textarea
                  rows={5}
                  className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors resize-none placeholder:text-silk-white/30"
                  placeholder="請輸入您的訊息..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-terracotta hover:bg-rust-copper text-silk-white tracking-wider transition-colors"
              >
                送出訊息
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
