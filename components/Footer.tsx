'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Instagram, Facebook, Mail, MapPin, Phone, Clock, X } from 'lucide-react'
import Image from 'next/image'

interface FooterData {
  description: string
  instagram: string
  facebook: string
  email: string
  phone: string
  address: string
  businessHours: string
  copyright: string
}

const defaultData: FooterData = {
  description: '在快節奏的都市中，提供一處靜心品茗的所在。讓每一口茶湯，都成為生活中的美好時刻。',
  instagram: 'https://instagram.com/teainn.tw',
  facebook: 'https://facebook.com/teainn.tw',
  email: 'hello@teainn.tw',
  phone: '0800-TEA-TIME',
  address: '台北市大安區茶香路 88 號',
  businessHours: '10:00 - 22:00',
  copyright: '茶客棧 TeaInn'
}

// 隱私政策內容
const privacyContent = `
茶客棧（以下稱「本公司」）非常重視您的隱私權，特訂定本隱私權政策：

一、個人資料的蒐集
本公司透過網站蒐集您的姓名、電話、電子郵件等資料，用於回覆您的諮詢及提供相關服務。

二、個人資料的利用
您的個人資料僅用於：
• 回覆您的聯絡諮詢
• 寄送活動資訊與優惠通知（經您同意）
• 改善我們的服務品質

三、資料保護
本公司採取適當的安全措施保護您的個人資料，防止未經授權的存取、揭露或毀損。

四、第三方揭露
除法律要求外，本公司不會將您的個人資料提供給第三方。

五、Cookie 使用
本網站使用 Cookie 以提升您的瀏覽體驗，您可透過瀏覽器設定管理 Cookie。

六、聯絡方式
如有任何隱私權相關問題，請聯絡：hello@teainn.tw
`

const termsContent = `
歡迎使用茶客棧網站，請詳閱以下服務條款：

一、服務內容
本網站提供茶客棧品牌資訊、產品介紹、門市資訊、加盟資訊及聯絡服務。

二、智慧財產權
本網站所有內容，包括但不限於文字、圖片、標誌、設計，均屬本公司所有，未經授權不得使用。

三、使用規範
使用本網站時，您同意：
• 不得從事任何違法行為
• 不得干擾網站正常運作
• 不得冒用他人身分

四、免責聲明
• 本網站資訊僅供參考，實際產品以門市為準
• 本公司保留隨時修改網站內容的權利
• 因不可抗力因素造成的服務中斷，本公司不負賠償責任

五、連結網站
本網站可能包含第三方網站連結，本公司不對其內容負責。

六、條款修改
本公司保留隨時修改本條款的權利，修改後將公告於本網站。

七、準據法
本條款以中華民國法律為準據法。

最後更新：2024 年 1 月
`

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [showModal, setShowModal] = useState<'privacy' | 'terms' | null>(null)
  const [data, setData] = useState<FooterData>(defaultData)

  useEffect(() => {
    fetch('/api/content/footer')
      .then(res => res.ok ? res.json() : null)
      .then(payload => {
        if (payload) {
          setData({
            description: payload.description || defaultData.description,
            instagram: payload.instagram || defaultData.instagram,
            facebook: payload.facebook || defaultData.facebook,
            email: payload.email || defaultData.email,
            phone: payload.phone || defaultData.phone,
            address: payload.address || defaultData.address,
            businessHours: payload.businessHours || defaultData.businessHours,
            copyright: payload.copyright || defaultData.copyright,
          })
        }
      })
      .catch(err => console.error('Failed to fetch footer data:', err))
  }, [])

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
              {data.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram', url: data.instagram },
                { icon: Facebook, label: 'Facebook', url: data.facebook },
                { icon: Mail, label: 'Email', url: `mailto:${data.email}` },
              ].map(({ icon: Icon, label, url }) => (
                <motion.a
                  key={label}
                  href={url}
                  target={url.startsWith('mailto') ? undefined : '_blank'}
                  rel={url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
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
              {[
                { label: '關於我們', href: '/#about' },
                { label: '經典飲品', href: '/menu' },
                { label: '活動專區', href: '/events' },
                { label: '加盟資訊', href: '/franchise' },
                { label: '門市據點', href: '/stores' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-silk-white/50 hover:text-tea-sage text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-tea-sage group-hover:w-3 transition-all"></span>
                    {item.label}
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
                  <span className="text-silk-white text-sm">{data.phone}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-silk-white/40 text-xs block mb-1">電子信箱</span>
                  <span className="text-silk-white text-sm">{data.email}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-silk-white/40 text-xs block mb-1">營業時間</span>
                  <span className="text-silk-white text-sm">{data.businessHours}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-silk-white/40 text-xs block mb-1">總部地址</span>
                  <span className="text-silk-white text-sm">{data.address}</span>
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
            &copy; {currentYear} {data.copyright}. All rights reserved.
          </p>

          <div className="flex gap-8 text-sm">
            <button
              onClick={() => setShowModal('privacy')}
              className="text-silk-white/30 hover:text-tea-sage transition-colors cursor-pointer"
            >
              隱私政策
            </button>
            <button
              onClick={() => setShowModal('terms')}
              className="text-silk-white/30 hover:text-tea-sage transition-colors cursor-pointer"
            >
              服務條款
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-tea-ink/90 backdrop-blur-sm"
            onClick={() => setShowModal(null)}
          ></div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-silk-white max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-tea-ink px-6 py-4 flex items-center justify-between">
              <h3 className="font-serif text-xl text-silk-white">
                {showModal === 'privacy' ? '隱私政策' : '服務條款'}
              </h3>
              <button
                onClick={() => setShowModal(null)}
                className="text-silk-white/70 hover:text-silk-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-60px)]">
              <pre className="whitespace-pre-wrap font-sans text-sm text-charcoal leading-relaxed">
                {showModal === 'privacy' ? privacyContent : termsContent}
              </pre>
            </div>
          </motion.div>
        </div>
      )}
    </footer>
  )
}
