'use client'

import React, { useState } from 'react'
import Image from 'next/image'

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
