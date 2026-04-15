import { ShieldCheck, RotateCcw, Truck, Lock, Star } from 'lucide-react'

export default function ProductTrustBar() {
  return (
    <div className="space-y-4">
      {/* Urgency / Social Proof */}
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-sm px-3 py-2.5">
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <p className="text-sm text-green-800 font-medium">
          <span className="font-bold">23 people</span> are viewing this product right now
        </p>
      </div>

      {/* Trust Badges Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-start gap-2.5 p-3 rounded-sm border bg-muted/30">
          <ShieldCheck className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-bold">2-Year Guarantee</p>
            <p className="text-xs text-muted-foreground">Full replacement or refund</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-sm border bg-muted/30">
          <RotateCcw className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-bold">30-Day Returns</p>
            <p className="text-xs text-muted-foreground">No questions asked</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-sm border bg-muted/30">
          <Truck className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-bold">Free Shipping</p>
            <p className="text-xs text-muted-foreground">On orders over $59</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-sm border bg-muted/30">
          <Lock className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-bold">Secure Checkout</p>
            <p className="text-xs text-muted-foreground">SSL encrypted payment</p>
          </div>
        </div>
      </div>

      {/* Star rating / social proof */}
      <div className="flex items-center gap-3 py-3 border-t border-b">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i <= 4 ? 'text-orange-400 fill-orange-400' : 'text-orange-300 fill-orange-100'}`}
            />
          ))}
        </div>
        <div className="text-sm">
          <span className="font-bold">4.8</span>
          <span className="text-muted-foreground"> · 2,341 verified drivers</span>
        </div>
      </div>
    </div>
  )
}
