'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Check, TrendingUp, Award, Headphones, LucideIcon } from 'lucide-react'

// 图标映射
const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Award,
  Headphones,
}

// 默认数据（API 失败时的备用）
const defaultData = {
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
  investment: [
    { label: '加盟金', value: 'NT$ 300,000' },
    { label: '保證金', value: 'NT$ 200,000' },
    { label: '設備費用', value: 'NT$ 800,000 起' },
    { label: '裝潢費用', value: '依實際坪數' },
  ],
  ctaTitle: '準備好開啟茶事業了嗎？',
  ctaDescription: '歡迎與我們聯繫，了解更多加盟詳情。我們期待與您一起創造美好的茶文化體驗。',
}

interface FranchiseData {
  title: string
  description: string
  benefits: Array<{ icon: string; title: string; description: string }>
  steps: Array<{ step: string; title: string; desc: string }>
  conditions: string[]
  investment: Array<{ label: string; value: string }>
  ctaTitle: string
  ctaDescription: string
}

export function Franchise() {
  const [data, setData] = useState<FranchiseData>(defaultData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/content/franchise')
        if (!response.ok) {
          throw new Error('Failed to fetch franchise data')
        }
        const result = await response.json()
        // 合并默认数据和 API 数据，确保所有字段都有值
        setData({ ...defaultData, ...result })
        setError(null)
      } catch (err) {
        console.error('Error fetching franchise data:', err)
        setError(err instanceof Error ? err.message : '載入加盟資訊失敗')
        // 使用默认数据
        setData(defaultData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section id="franchise" className="py-8 lg:py-16 bg-silk-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-tea-ink/10 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-tea-ink/10 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="franchise" className="py-8 lg:py-16 bg-silk-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center py-20">
          <p className="text-red-600">錯誤：{error}</p>
        </div>
      </section>
    )
  }

  const benefits = data.benefits || defaultData.benefits
  const steps = data.steps || defaultData.steps
  const conditions = data.conditions || defaultData.conditions
  const investment = data.investment || defaultData.investment

  return (
    <section id="franchise" className="py-8 lg:py-16 bg-silk-white relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-tea-sage/5 rounded-full blur-[150px]"></div>
      <div className="absolute top-20 left-10 text-tea-ink/[0.02] text-[300px] font-serif select-none pointer-events-none">
        盟
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase">Franchise</span>
            <h2 className="font-serif text-5xl lg:text-6xl text-tea-ink mt-4 mb-6">
              {data.title?.includes('合作') ? (
                <>加盟<span className="text-tea-jade">合作</span></>
              ) : (
                data.title || defaultData.title
              )}
            </h2>
            <p className="text-stone-gray max-w-xl mx-auto">
              {data.description || defaultData.description}
            </p>
          </motion.div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || TrendingUp
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-paper-cream p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-tea-ink flex items-center justify-center mb-6">
                  <IconComponent className="w-6 h-6 text-tea-sage" />
                </div>
                <h3 className="font-serif text-2xl text-tea-ink mb-3">{benefit.title}</h3>
                <p className="text-stone-gray leading-relaxed">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left - Process */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-3xl text-tea-ink mb-10">加盟流程</h3>
            <div className="space-y-0">
              {steps.map((item, index) => (
                <div key={index} className="flex gap-6 group relative">
                  {/* Vertical Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-7 top-16 w-px h-full bg-tea-ink/10"></div>
                  )}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-14 h-14 border border-tea-ink/20 group-hover:bg-tea-ink group-hover:border-tea-ink flex items-center justify-center transition-all">
                      <span className="text-tea-ink group-hover:text-silk-white text-sm tracking-wider transition-colors">{item.step}</span>
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
            <h3 className="font-serif text-3xl text-tea-ink mb-10">加盟條件</h3>
            <div className="bg-paper-cream p-8 mb-8">
              <ul className="space-y-4">
                {conditions.map((req, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 border border-tea-jade flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-tea-jade" />
                    </div>
                    <span className="text-charcoal leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-tea-ink p-8">
              <h4 className="font-serif text-xl text-silk-white mb-6">投資金額</h4>
              <div className="space-y-4 text-silk-white/60 text-sm mb-6">
                {investment.map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-silk-white/10 last:border-0">
                    <span>{label}</span>
                    <span className="text-terracotta">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-silk-white/40">* 實際費用依店面規模與地點而異</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-tea-ink p-16"
        >
          <h3 className="font-serif text-3xl lg:text-4xl text-silk-white mb-4">
            {data.ctaTitle || defaultData.ctaTitle}
          </h3>
          <p className="text-silk-white/50 mb-10 max-w-2xl mx-auto">
            {data.ctaDescription || defaultData.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-10 py-4 bg-terracotta hover:bg-rust-copper text-silk-white tracking-wider transition-colors"
            >
              立即諮詢
            </a>
            <a
              href="/files/franchise-guide.pdf"
              download="茶客棧加盟說明書.pdf"
              onClick={(e) => {
                // 如果文件不存在，顯示提示
                e.preventDefault()
                alert('加盟說明書準備中，請先聯繫我們取得詳細資料。')
              }}
              className="px-10 py-4 border border-silk-white/20 text-silk-white/70 hover:text-silk-white hover:border-tea-sage/50 tracking-wider transition-all cursor-pointer"
            >
              下載加盟說明書
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
