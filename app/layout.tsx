import type { Metadata } from 'next'
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '茶客棧',
  description: '茶客棧 - 在快節奏的都市中，為您保留一方寧靜的茶香天地。堅持古法炮製，精選台灣茶葉。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning className={`${notoSerifTC.variable} ${notoSansTC.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
