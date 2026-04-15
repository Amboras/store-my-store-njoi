import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600 // ISR: revalidate every hour
import { medusaServerClient } from '@/lib/medusa-client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ProductActions from '@/components/product/product-actions'
import ProductAccordion from '@/components/product/product-accordion'
import ProductTrustBar from '@/components/product/product-trust-bar'
import ProductBundleOffer from '@/components/product/product-bundle-offer'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { getProductPlaceholder } from '@/lib/utils/placeholder-images'
import { type VariantExtension } from '@/components/product/product-price'

// Seat cover product ID — bundle offer shown on this product
const SEAT_COVER_PRODUCT_ID = 'prod_01KP77Q8Y6XWVBFZ1NSE13X3PB'
// Bundle product default variant
const BUNDLE_VARIANT_ID_PLACEHOLDER = 'bundle'

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getBundleVariantId(): Promise<string | null> {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) return null

    const response = await medusaServerClient.store.product.list({
      id: 'prod_01KP77QNM0X8T7557TZ9P3D19F',
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    const bundleProduct = response.products?.[0]
    return bundleProduct?.variants?.[0]?.id || null
  } catch {
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        manage_inventory: v.manage_inventory ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      ...(product.thumbnail ? { images: [{ url: product.thumbnail }] } : {}),
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const [product, bundleVariantId] = await Promise.all([
    getProduct(handle),
    getBundleVariantId(),
  ])

  if (!product) {
    notFound()
  }

  const variantExtensions = await getVariantExtensions(product.id)

  const isSeatCover = product.id === SEAT_COVER_PRODUCT_ID
  const showBundle = isSeatCover && !!bundleVariantId

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []).filter((img: { url: string }) => img.url !== product.thumbnail),
  ]

  const displayImages = allImages.length > 0
    ? allImages
    : [{ url: getProductPlaceholder(product.id) }]

  // Get single variant price for bundle offer
  const firstVariant = product.variants?.[0] as {
    id: string
    calculated_price?: { calculated_amount?: number; currency_code?: string } | number
  } | undefined
  const cp = firstVariant?.calculated_price
  const singlePriceCents = cp
    ? (typeof cp === 'number' ? cp : cp.calculated_amount ?? 7999)
    : 7999
  const currency =
    cp && typeof cp !== 'number' ? (cp.currency_code ?? 'usd') : 'usd'

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-sm">
              <Image
                src={displayImages[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Sale badge */}
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-sm">
                2025 Collection
              </div>
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.slice(1, 5).map((image: { url: string }, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-[3/4] overflow-hidden bg-muted rounded-sm"
                  >
                    <Image
                      src={image.url}
                      alt={`${product.title} ${idx + 2}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Guarantee badge below images */}
            <div className="flex items-center justify-center gap-3 py-3 bg-muted/40 rounded-sm border">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Secured by
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold">
                <span className="text-green-700">SSL</span>
                <span className="text-muted-foreground">·</span>
                <span>Visa</span>
                <span className="text-muted-foreground">·</span>
                <span>Mastercard</span>
                <span className="text-muted-foreground">·</span>
                <span>PayPal</span>
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Title & Subtitle */}
            <div>
              {product.subtitle && (
                <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  {product.subtitle}
                </p>
              )}
              <h1 className="text-h2 font-heading font-semibold">{product.title}</h1>
            </div>

            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={product.variants?.[0]?.id || null}
              currency={currency}
              value={singlePriceCents}
            />

            {/* Trust Bar (star rating + live viewers) */}
            <ProductTrustBar />

            {/* Variant Selector + Price + Add to Cart */}
            <ProductActions product={product} variantExtensions={variantExtensions} />

            {/* Bundle Offer — shown only on seat cover product */}
            {showBundle && (
              <ProductBundleOffer
                singleVariantId={firstVariant?.id ?? ''}
                bundleVariantId={bundleVariantId!}
                singlePrice={singlePriceCents}
                bundlePrice={14999}
                currency={currency}
              />
            )}

            {/* Accordion Sections */}
            <ProductAccordion
              description={product.description}
              details={product.metadata as Record<string, string> | undefined}
            />
          </div>
        </div>
      </div>
    </>
  )
}
