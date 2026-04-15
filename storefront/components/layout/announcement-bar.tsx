'use client'

import { useState } from 'react'
import { X, Zap } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-foreground text-primary-foreground">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-sm tracking-wide">
        <Zap className="h-3.5 w-3.5 fill-current text-orange-400" />
        <p>
          <span className="font-semibold text-orange-400">Limited Offer:</span>{' '}
          Free shipping on all orders over $59 — Use code{' '}
          <span className="font-bold underline underline-offset-2">AUTOEDGE</span>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
