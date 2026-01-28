'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

interface ContactData {
  phone: string
  phone2: string
  email: string
  email2: string
  address: string
  businessHours: string
  businessHours2: string
}

const defaultContactData: ContactData = {
  phone: '0800-TEA-TIME',
  phone2: '(02) 2345-6789',
  email: 'hello@teainn.tw',
  email2: 'franchise@teainn.tw (加盟)',
  address: '台北市信義區信義路五段7號12樓',
  businessHours: '週一至週五 09:00 - 18:00',
  businessHours2: '週六、日及國定假日休息'
}

export function Contact() {
  const [contactData, setContactData] = useState<ContactData>(defaultContactData)

  useEffect(() => {
    // 同時獲取網站設定和頁面內容，網站設定優先
    Promise.all([
      fetch('/api/settings').then(res => res.ok ? res.json() : null),
      fetch('/api/content/contact').then(res => res.ok ? res.json() : null)
    ])
      .then(([settings, payload]) => {
        // 合併數據：網站設定 > 頁面內容 > 預設值
        setContactData({
          phone: settings?.phone || payload?.phone || defaultContactData.phone,
          phone2: payload?.phone2 || defaultContactData.phone2,
          email: settings?.email || payload?.email || defaultContactData.email,
          email2: payload?.email2 || defaultContactData.email2,
          address: settings?.address || payload?.address || defaultContactData.address,
          businessHours: settings?.businessHours || payload?.businessHours || defaultContactData.businessHours,
          businessHours2: payload?.businessHours2 || defaultContactData.businessHours2,
        })
      })
      .catch(err => console.error('Failed to fetch contact data:', err))
  }, [])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || '提交失敗')
      }

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err instanceof Error ? err.message : '提交失敗，請稍後再試')
    } finally {
      setSubmitting(false)
    }
  }
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
                  lines: [contactData.phone, contactData.phone2].filter(Boolean)
                },
                {
                  icon: Mail,
                  title: '電子信箱',
                  lines: [contactData.email, contactData.email2].filter(Boolean)
                },
                {
                  icon: MapPin,
                  title: '總部地址',
                  lines: [contactData.address].filter(Boolean)
                },
                {
                  icon: Clock,
                  title: '服務時間',
                  lines: [contactData.businessHours, contactData.businessHours2].filter(Boolean)
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

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-tea-sage mx-auto mb-4" />
                <h4 className="font-serif text-xl text-silk-white mb-2">訊息已送出</h4>
                <p className="text-silk-white/50 mb-6">我們會盡快回覆您，謝謝！</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 border border-tea-sage/30 text-tea-sage hover:bg-tea-sage hover:text-tea-ink transition-colors"
                >
                  再發一則訊息
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-silk-white/60 text-sm mb-2">姓名 *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors placeholder:text-silk-white/30"
                      placeholder="請輸入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-silk-white/60 text-sm mb-2">電話</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors placeholder:text-silk-white/30"
                      placeholder="09XX-XXX-XXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-silk-white/60 text-sm mb-2">電子信箱 *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors placeholder:text-silk-white/30"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-silk-white/60 text-sm mb-2">主旨 *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors"
                  >
                    <option value="">請選擇主旨</option>
                    <option value="產品諮詢">產品諮詢</option>
                    <option value="加盟洽詢">加盟洽詢</option>
                    <option value="合作提案">合作提案</option>
                    <option value="客訴反映">客訴反映</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-silk-white/60 text-sm mb-2">訊息內容 *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-tea-ink/50 border border-silk-white/10 focus:border-tea-sage/50 text-silk-white px-4 py-3 outline-none transition-colors resize-none placeholder:text-silk-white/30"
                    placeholder="請輸入您的訊息..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-terracotta hover:bg-rust-copper disabled:bg-terracotta/50 text-silk-white tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      送出中...
                    </>
                  ) : (
                    '送出訊息'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
