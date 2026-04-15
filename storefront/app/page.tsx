'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Zap,
  Wrench,
  Car,
  CheckCircle2,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80'
const INTERIOR_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'
const SPORT_CAR_IMAGE = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80'
const DETAIL_IMAGE = 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80'

const categories = [
  {
    title: 'Interior',
    description: 'Seat covers, mats & organizers',
    href: '/products',
    image: INTERIOR_IMAGE,
  },
  {
    title: 'Performance',
    description: 'Upgrades & tuning accessories',
    href: '/products',
    image: SPORT_CAR_IMAGE,
  },
  {
    title: 'Detailing',
    description: 'Care kits & protective coatings',
    href: '/products',
    image: DETAIL_IMAGE,
  },
]

const stats = [
  { value: '50,000+', label: 'Happy Drivers' },
  { value: '4.9', label: 'Average Rating' },
  { value: '200+', label: 'Products' },
  { value: '2-Day', label: 'Fast Shipping' },
]

const features = [
  {
    icon: Zap,
    title: 'Built for Performance',
    description: 'Every product is engineered to meet the demands of serious drivers.',
  },
  {
    icon: Wrench,
    title: 'Easy Installation',
    description: 'No tools required for most products. Upgrade your car in minutes.',
  },
  {
    icon: Car,
    title: 'Universal Fit',
    description: 'Designed to fit most major vehicle makes and models seamlessly.',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Aircraft-grade materials tested to outlast OEM components.',
  },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setNewsletterSubmitted(true)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-foreground text-primary-foreground overflow-hidden min-h-[90vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Sleek sports car at night"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>

        <div className="relative container-custom py-24 lg:py-36">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 rounded-sm">
              <Zap className="h-3.5 w-3.5 text-orange-400 fill-current" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                New 2025 Collection
              </span>
            </div>
            <h1 className="text-display font-heading font-extrabold leading-[1.05] text-white text-balance">
              Upgrade Your Ride.<br />
              <span className="text-orange-400">Own the Road.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              Premium car accessories engineered for performance, protection, and head-turning style. Trusted by 50,000+ drivers worldwide.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-sm font-bold uppercase tracking-wide transition-colors"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wide transition-colors"
                prefetch={true}
              >
                View Collections
              </Link>
            </div>

            {/* Quick trust bar */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
              {['Free Shipping $59+', '30-Day Returns', '2-Year Warranty', 'Secure Checkout'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                  <CheckCircle2 className="h-4 w-4 text-orange-400" strokeWidth={2} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-orange-500 text-white py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-heading font-extrabold">{stat.value}</div>
                <div className="text-sm font-medium text-white/80 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-bold mb-3">Browse Categories</p>
            <h2 className="text-h2 font-heading font-extrabold">Everything Your Car Needs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative overflow-hidden rounded-sm aspect-[4/3] block"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-heading font-bold text-white">{cat.title}</h3>
                  <p className="text-sm text-white/70 mt-1">{cat.description}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-orange-400 text-sm font-bold">
                    <span>Shop Now</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ── Why AutoEdge ── */}
      <section className="py-section bg-muted/40">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-bold mb-3">Why Choose Us</p>
            <h2 className="text-h2 font-heading font-extrabold">Built for Drivers, by Drivers</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              We obsess over every detail so you can drive with confidence. No compromises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat) => (
              <div key={feat.title} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-foreground text-white rounded-sm mx-auto">
                  <feat.icon className="h-6 w-6 text-orange-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-lg">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Editorial ── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={SPORT_CAR_IMAGE}
                alt="Performance car accessories"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide">
                2025 Collection
              </div>
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-bold">Our Promise</p>
              <h2 className="text-h2 font-heading font-extrabold">
                No Compromise.<br />Pure Performance.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every product in the AutoEdge lineup undergoes rigorous testing before it reaches your hands. We source only aircraft-grade aluminum, military-spec polymers, and UV-resistant materials that last the lifetime of your vehicle.
              </p>
              <ul className="space-y-3">
                {['2-year manufacturer guarantee', 'Fits 95% of all vehicle makes', 'Tool-free installation under 10 minutes', 'Carbon-negative shipping packaging'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide link-underline pb-0.5"
                prefetch={true}
              >
                Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust / Features Bar ── */}
      <section className="py-section-sm border-y">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start">
              <Truck className="h-6 w-6 flex-shrink-0 text-orange-500" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $59</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <RotateCcw className="h-6 w-6 flex-shrink-0 text-orange-500" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day hassle-free policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end text-center md:text-right">
              <Shield className="h-6 w-6 flex-shrink-0 text-orange-500" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold">2-Year Warranty</p>
                <p className="text-xs text-muted-foreground">On all AutoEdge products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-section bg-foreground text-primary-foreground">
        <div className="container-custom max-w-2xl text-center">
          <Zap className="h-8 w-8 text-orange-400 fill-current mx-auto mb-4" />
          <h2 className="text-h2 font-heading font-extrabold text-white">
            Gear Up. Stay Ahead.
          </h2>
          <p className="mt-3 text-white/60 max-w-md mx-auto">
            Get exclusive deals, new product drops, and expert car care tips straight to your inbox.
          </p>
          {newsletterSubmitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-orange-400 font-bold">
              <CheckCircle2 className="h-5 w-5" />
              <span>You&apos;re in! Welcome to the AutoEdge crew.</span>
            </div>
          ) : (
            <form className="mt-8 flex gap-2 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-orange-400 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-white/30">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}
