'use client'

import { useState, useEffect } from 'react'
import { Package, Zap, Clock, ChevronRight } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface BundleOfferProps {
  singleVariantId: string
  bundleVariantId: string
  singlePrice: number
  bundlePrice: number
  currency: string
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

function CountdownTimer() {
  const getInitialSeconds = () => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('ae_urgency_end')
      if (stored) {
        const remaining = Math.floor((parseInt(stored) - Date.now()) / 1000)
        if (remaining > 0) return remaining
      }
    }
    const secs = 10 * 60 + Math.floor(Math.random() * 5 * 60)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ae_urgency_end', String(Date.now() + secs * 1000))
    }
    return secs
  }

  const [seconds, setSeconds] = useState<number | null>(null)

  useEffect(() => {
    setSeconds(getInitialSeconds())
  }, [])

  useEffect(() => {
    if (seconds === null) return
    if (seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => (s !== null && s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [seconds])

  if (seconds === null) return null

  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  const isUrgent = seconds < 180

  return (
    <div className={`flex items-center gap-2 text-sm font-semibold ${isUrgent ? 'text-red-500' : 'text-orange-500'}`}>
      <Clock className="h-4 w-4 flex-shrink-0" />
      <span>
        Sale ends in{' '}
        <span className="tabular-nums font-bold">
          {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </span>
      </span>
    </div>
  )
}

export default function ProductBundleOffer({
  singleVariantId,
  bundleVariantId,
  singlePrice,
  bundlePrice,
  currency,
}: BundleOfferProps) {
  const { addItem, isAddingItem } = useCart()
  const [selected, setSelected] = useState<'single' | 'bundle'>('single')
  const [justAdded, setJustAdded] = useState(false)

  const savings = singlePrice * 2 - bundlePrice
  const savingsPct = Math.round((savings / (singlePrice * 2)) * 100)

  const handleAddSelected = () => {
    const variantId = selected === 'bundle' ? bundleVariantId : singleVariantId
    const qty = selected === 'bundle' ? 1 : 1

    addItem(
      { variantId, quantity: qty },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success(selected === 'bundle' ? 'Bundle added to bag!' : 'Added to bag')
          setTimeout(() => setJustAdded(false), 2000)
        },
        onError: (err: Error) => {
          toast.error(err.message || 'Failed to add to bag')
        },
      }
    )
  }

  return (
    <div className="space-y-3 border border-orange-200 bg-orange-50/50 rounded-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-orange-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Bundle &amp; Save</span>
        </div>
        <CountdownTimer />
      </div>

      {/* Options */}
      <div className="space-y-2">
        {/* Single */}
        <button
          onClick={() => setSelected('single')}
          className={`w-full flex items-center gap-3 p-3 border rounded-sm text-left transition-all ${
            selected === 'single'
              ? 'border-foreground bg-white shadow-sm'
              : 'border-border bg-white/60 hover:border-foreground/40'
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
            selected === 'single' ? 'border-foreground' : 'border-border'
          }`}>
            {selected === 'single' && <div className="w-2 h-2 rounded-full bg-foreground" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">1 Unit — Most Popular</p>
            <p className="text-xs text-muted-foreground">Individual purchase</p>
          </div>
          <span className="text-sm font-bold">{formatPrice(singlePrice, currency)}</span>
        </button>

        {/* Bundle */}
        <button
          onClick={() => setSelected('bundle')}
          className={`w-full flex items-center gap-3 p-3 border rounded-sm text-left transition-all relative ${
            selected === 'bundle'
              ? 'border-orange-500 bg-white shadow-sm'
              : 'border-orange-200 bg-white/60 hover:border-orange-400'
          }`}
        >
          {/* Best value badge */}
          <div className="absolute -top-2.5 left-3 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            Best Value — Save {savingsPct}%
          </div>
          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
            selected === 'bundle' ? 'border-orange-500' : 'border-orange-300'
          }`}>
            {selected === 'bundle' && <div className="w-2 h-2 rounded-full bg-orange-500" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Interior Essentials Bundle</p>
            <p className="text-xs text-muted-foreground">Seat Covers + 360° Magnetic Phone Mount</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-bold text-orange-600">{formatPrice(bundlePrice, currency)}</span>
            <p className="text-xs text-muted-foreground line-through">{formatPrice(singlePrice + 3499, currency)}</p>
          </div>
        </button>
      </div>

      {/* CTA */}
      <button
        onClick={handleAddSelected}
        disabled={isAddingItem || justAdded}
        className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wide transition-all rounded-sm ${
          justAdded
            ? 'bg-green-700 text-white'
            : selected === 'bundle'
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-foreground hover:opacity-90 text-background'
        }`}
      >
        {isAddingItem ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          'Added to Bag!'
        ) : selected === 'bundle' ? (
          <>
            <Package className="h-4 w-4" />
            Add Bundle to Bag — Save {formatPrice(savings, currency)}
          </>
        ) : (
          <>
            Add to Bag
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  )
}
