'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// 品牌風格的佔位圖 - 茶葉圖案配合品牌色
const PLACEHOLDER_SVG = `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2F090C;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4a1518;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect fill="url(#bg)" width="400" height="300"/>
  <g transform="translate(150, 100)" fill="#c9a227" opacity="0.3">
    <path d="M50,0 C70,20 80,50 50,80 C20,50 30,20 50,0 Z"/>
    <path d="M50,80 L50,120" stroke="#c9a227" stroke-width="2"/>
  </g>
  <text x="200" y="180" font-family="serif" font-size="16" fill="#8c4a4a" text-anchor="middle">茶客棧</text>
</svg>
`

const ERROR_IMG_SRC = `data:image/svg+xml;base64,${btoa(PLACEHOLDER_SVG)}`

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  style?: React.CSSProperties
  sizes?: string
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fill,
  width,
  height,
  style,
  sizes,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  if (didError) {
    // 如果是 fill 模式，用絕對定位填滿容器
    if (fill) {
      return (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-tea-ink to-tea-forest flex items-center justify-center ${className ?? ''}`}
          style={style}
        >
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-2 text-terracotta/30" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50,10 C70,30 80,60 50,90 C20,60 30,30 50,10 Z"/>
              <path d="M50,90 L50,95" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span className="text-tea-sage/50 text-sm font-serif">茶客棧</span>
          </div>
        </div>
      )
    }
    return (
      <div
        className={`bg-gradient-to-br from-tea-ink to-tea-forest flex items-center justify-center ${className ?? ''}`}
        style={{ ...style, width: width || 400, height: height || 300 }}
      >
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-2 text-terracotta/30" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C70,30 80,60 50,90 C20,60 30,30 50,10 Z"/>
            <path d="M50,90 L50,95" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="text-tea-sage/50 text-xs font-serif">茶客棧</span>
        </div>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        style={style}
        sizes={sizes || "100vw"}
        onError={handleError}
        {...rest}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      style={style}
      sizes={sizes}
      onError={handleError}
      {...rest}
    />
  )
}
