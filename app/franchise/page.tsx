'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/Footer'
import { Check, TrendingUp, Award, Headphones, ArrowRight, Sparkles, Building2, Users, BadgeCheck, LucideIcon } from 'lucide-react'

interface FranchisePlan {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  investment: string
  area: string | null
  features: string[]
  includes: string[]
  isPopular: boolean
}

interface FranchiseContent {
  title: string
  description: string
  benefits: Array<{ icon: string; title: string; description: string }>
  steps: Array<{ step: string; title: string; desc: string }>
  conditions: string[]
  ctaTitle: string
  ctaDescription: string
}

interface SiteSettings {
  phone: string
  email: string
}

const defaultSettings: SiteSettings = {
  phone: '0800-TEA-TIME',
  email: 'franchise@teainn.tw',
}

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Award,
  Headphones,
  Building2,
  Users,
  BadgeCheck,
}

const defaultContent: FranchiseContent = {
  title: '加盟合作',
  description: '與我們一起傳承茶文化，創造美好事業',
  benefits: [
    { icon: 'TrendingUp', title: '成熟商業模式', description: '經過市場驗證的營運系統，降低創業風險' },
    { icon: 'Award', title: '完整教育訓練', description: '從茶葉知識到門市管理，全方位培訓支援' },
    { icon: 'Headphones', title: '持續輔導支持', description: '總部專業團隊協助，確保營運順利' },
  ],
  steps: [
    { step: '01', title: '初步洽談', desc: '填寫加盟意願書，進行初步溝通' },
    { step: '02', title: '資格審核', desc: '總部評估加盟條件與資格' },
    { step: '03', title: '簽約合作', desc: '雙方確認合作細節並簽訂合約' },
    { step: '04', title: '店面籌備', desc: '選址評估、裝潢設計與設備採購' },
    { step: '05', title: '教育訓練', desc: '產品知識與營運管理培訓' },
    { step: '06', title: '開幕營運', desc: '正式開幕，總部持續輔導支援' },
  ],
  conditions: [
    '認同茶客棧品牌理念與企業文化',
    '具備良好的服務熱忱與經營態度',
    '具備一定的資金實力與信用條件',
    '能親自參與門市經營管理',
    '配合總部的營運規範與制度',
  ],
  ctaTitle: '準備好開啟茶事業了嗎？',
  ctaDescription: '歡迎與我們聯繫，了解更多加盟詳情。',
}

export default function FranchisePage() {
  const [plans, setPlans] = useState<FranchisePlan[]>([])
  const [content, setContent] = useState<FranchiseContent>(defaultContent)
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Fetch plans, content and settings in parallel
        const [plansRes, contentRes, settingsRes] = await Promise.all([
          fetch('/api/franchise-plans'),
          fetch('/api/content/franchise'),
          fetch('/api/settings')
        ])

        if (plansRes.ok) {
          const plansData = await plansRes.json()
          setPlans(plansData)
        }

        if (contentRes.ok) {
          const contentData = await contentRes.json()
          setContent({ ...defaultContent, ...contentData })
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json()
          setSettings({
            phone: settingsData.phone || defaultSettings.phone,
            email: settingsData.email || defaultSettings.email,
          })
        }

        setError(null)
      } catch (err) {
        console.error('Error fetching franchise data:', err)
        setError(err instanceof Error ? err.message : '載入加盟資訊失敗')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Auto-advance steps animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % content.steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [content.steps.length])

  return (
    <main className="min-h-screen bg-silk-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-silk-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(47,9,12,0.08)]'
          : 'bg-tea-ink'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? 'h-16' : 'h-20'
          }`}>
            <Link href="/" className="relative group">
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
            </Link>

            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-5 py-2 text-sm tracking-wider transition-all ${
                scrolled ? 'text-tea-ink hover:text-tea-jade' : 'text-silk-white/70 hover:text-silk-white'
              }`}
            >
              <span>返回首頁</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 relative overflow-hidden bg-tea-ink min-h-[70vh] flex items-center">
        {/* Dramatic ink wash background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-tea-forest/40 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-terracotta/15 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <div className="absolute inset-0 rounded-full border border-silk-white/5"></div>
            <div className="absolute inset-12 rounded-full border border-silk-white/5"></div>
            <div className="absolute inset-24 rounded-full border border-tea-sage/10"></div>
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-terracotta"></div>
                <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Franchise</span>
              </div>
              <h1 className="font-serif text-5xl lg:text-7xl text-silk-white mb-6">
                {content.title}
              </h1>
              <p className="text-silk-white/60 text-lg leading-relaxed mb-10 max-w-lg">
                {content.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#plans"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-terracotta text-silk-white tracking-wider hover:bg-rust-copper transition-colors"
                >
                  <span>查看方案</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-silk-white/20 text-silk-white/80 hover:border-silk-white/40 hover:text-silk-white transition-all"
                >
                  <span>聯繫我們</span>
                </a>
              </div>
            </motion.div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                {/* Large stamp */}
                <div className="relative w-64 h-64 border-2 border-terracotta/30 flex items-center justify-center rotate-6">
                  <div className="absolute inset-2 border border-terracotta/20"></div>
                  <div className="text-center">
                    <span className="font-serif text-6xl text-terracotta/80">盟</span>
                    <span className="block text-terracotta/50 text-sm mt-2 tracking-widest">FRANCHISE</span>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full border border-tea-sage/20"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full border border-terracotta/20"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,60 1440,80 L1440,120 L0,120 Z" fill="#faf8f5"/>
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-silk-white relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Why Join Us</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-tea-ink mt-4">
              加盟<span className="text-tea-jade">優勢</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || TrendingUp
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-paper-cream p-10 hover:shadow-xl transition-all duration-500 h-full">
                    <div className="w-16 h-16 bg-tea-ink flex items-center justify-center mb-8 group-hover:bg-tea-forest transition-colors">
                      <IconComponent className="w-7 h-7 text-terracotta" />
                    </div>
                    <h3 className="font-serif text-2xl text-tea-ink mb-4">{benefit.title}</h3>
                    <p className="text-stone-gray leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 lg:py-28 bg-paper-cream relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 text-tea-ink/[0.02] text-[300px] font-serif select-none pointer-events-none">
          案
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Franchise Plans</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-tea-ink mt-4">
              加盟<span className="text-tea-jade">方案</span>
            </h2>
            <p className="text-stone-gray mt-4 max-w-xl mx-auto">
              依據您的需求與預算，選擇最適合的加盟方案
            </p>
          </motion.div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white p-8">
                  <div className="h-8 bg-paper-cream w-1/2 mb-4"></div>
                  <div className="h-12 bg-paper-cream w-2/3 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-paper-cream"></div>
                    <div className="h-4 bg-paper-cream w-4/5"></div>
                    <div className="h-4 bg-paper-cream w-3/5"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && plans.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-gray mb-6">加盟方案資訊準備中，請聯繫我們了解詳情</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-tea-ink text-silk-white tracking-wider hover:bg-tea-forest transition-colors"
              >
                <span>聯絡諮詢</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          {!loading && plans.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${plan.isPopular ? 'lg:-mt-4 lg:mb-4' : ''}`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1 px-4 py-1 bg-terracotta text-silk-white text-xs tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        熱門方案
                      </span>
                    </div>
                  )}

                  <div className={`bg-white h-full flex flex-col ${plan.isPopular ? 'border-2 border-terracotta shadow-xl' : 'border border-tea-ink/10'}`}>
                    {/* Header */}
                    <div className={`p-8 ${plan.isPopular ? 'bg-tea-ink text-silk-white' : 'bg-paper-cream'}`}>
                      <h3 className={`font-serif text-2xl mb-2 ${plan.isPopular ? 'text-silk-white' : 'text-tea-ink'}`}>
                        {plan.name}
                      </h3>
                      {plan.description && (
                        <p className={`text-sm ${plan.isPopular ? 'text-silk-white/60' : 'text-stone-gray'}`}>
                          {plan.description}
                        </p>
                      )}
                      <div className={`mt-4 pt-4 border-t ${plan.isPopular ? 'border-silk-white/10' : 'border-tea-ink/10'}`}>
                        <span className={`text-sm ${plan.isPopular ? 'text-silk-white/60' : 'text-stone-gray'}`}>投資金額</span>
                        <p className={`font-serif text-3xl ${plan.isPopular ? 'text-terracotta' : 'text-tea-jade'}`}>
                          {plan.investment}
                        </p>
                        {plan.area && (
                          <span className={`text-sm ${plan.isPopular ? 'text-silk-white/40' : 'text-stone-gray/60'}`}>
                            建議坪數：{plan.area}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="p-8 flex-1">
                      <p className="text-sm text-stone-gray mb-4">方案包含</p>
                      <ul className="space-y-3">
                        {plan.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 border border-tea-jade flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 text-tea-jade" />
                            </div>
                            <span className="text-charcoal text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.features.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-tea-ink/5">
                          <p className="text-sm text-stone-gray mb-3">方案特色</p>
                          <div className="flex flex-wrap gap-2">
                            {plan.features.map((feature, i) => (
                              <span key={i} className="text-xs text-tea-jade border border-tea-jade/30 px-2 py-1">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="p-8 pt-0">
                      <a
                        href="#contact"
                        className={`block w-full py-4 text-center text-sm tracking-wider transition-colors ${
                          plan.isPopular
                            ? 'bg-terracotta text-silk-white hover:bg-rust-copper'
                            : 'bg-tea-ink text-silk-white hover:bg-tea-forest'
                        }`}
                      >
                        了解詳情
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-silk-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Process */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Process</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-tea-ink mt-4 mb-12">
                加盟<span className="text-tea-jade">流程</span>
              </h2>

              <div className="space-y-0">
                {content.steps.map((item, index) => (
                  <div
                    key={index}
                    className={`flex gap-6 group relative cursor-pointer transition-all duration-300 ${
                      activeStep === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Vertical Line */}
                    {index < content.steps.length - 1 && (
                      <div className="absolute left-7 top-16 w-px h-full bg-tea-ink/10"></div>
                    )}
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                        activeStep === index
                          ? 'bg-tea-ink border-tea-ink'
                          : 'border-tea-ink/20 group-hover:border-tea-ink/40'
                      }`}>
                        <span className={`text-sm tracking-wider transition-colors ${
                          activeStep === index ? 'text-silk-white' : 'text-tea-ink'
                        }`}>
                          {item.step}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3 pb-8">
                      <h4 className="text-xl text-tea-ink mb-1">{item.title}</h4>
                      <p className="text-stone-gray text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Requirements</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-tea-ink mt-4 mb-12">
                加盟<span className="text-tea-jade">條件</span>
              </h2>

              <div className="bg-paper-cream p-8 lg:p-10">
                <ul className="space-y-5">
                  {content.conditions.map((condition, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-6 h-6 border border-tea-jade flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-tea-jade" />
                      </div>
                      <span className="text-charcoal leading-relaxed">{condition}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Quick contact card */}
              <div className="mt-8 bg-tea-ink p-8">
                <h4 className="font-serif text-xl text-silk-white mb-2">有任何疑問？</h4>
                <p className="text-silk-white/50 text-sm mb-6">我們的加盟顧問隨時為您解答</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`tel:${settings.phone}`}
                    className="inline-flex items-center gap-2 text-terracotta hover:text-rust-copper transition-colors"
                  >
                    <span>{settings.phone}</span>
                  </a>
                  <span className="text-silk-white/30">|</span>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-silk-white/60 hover:text-silk-white transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 lg:py-32 bg-tea-ink relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-tea-forest/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-terracotta/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Stamp decoration */}
            <div className="inline-block mb-8">
              <div className="relative w-20 h-20 border-2 border-terracotta/40 flex items-center justify-center rotate-6">
                <span className="font-serif text-terracotta text-3xl">誠</span>
                <div className="absolute inset-1 border border-terracotta/20"></div>
              </div>
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl text-silk-white mb-4">
              {content.ctaTitle}
            </h2>
            <p className="text-silk-white/50 mb-12 max-w-2xl mx-auto text-lg">
              {content.ctaDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-terracotta hover:bg-rust-copper text-silk-white tracking-wider transition-colors"
              >
                <span>立即諮詢</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert('加盟說明書準備中，請先聯繫我們取得詳細資料。')
                }}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-silk-white/20 text-silk-white/80 hover:border-silk-white/40 hover:text-silk-white tracking-wider transition-all"
              >
                <span>下載說明書</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
