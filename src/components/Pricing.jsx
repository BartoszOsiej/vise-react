import { motion, useSpring, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { TierCard } from './TierCard.jsx'

const tiers = [
  {
    id: 'workplace',
    name: 'Vise Workplace',
    price: 10,
    popular: false,
    features: [
      '✓ Trending products feed (50/day)',
      '✓ Creator buying signal alerts',
      '✓ Niche profitability score',
      '✓ Export to CSV',
    ],
  },
  {
    id: 'studio',
    name: 'Vise Studio',
    price: 15,
    popular: true,
    features: [
      '✓ Everything in Workplace',
      '✓ Full product catalog scan',
      '✓ Historical price tracking',
      '✓ Profit loss projections (90 days)',
      '✓ Priority email support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Vise Enterprise',
    price: 25,
    popular: false,
    limit: '10K products, 1M API calls',
    features: [
      '✓ Everything in Studio',
      '✓ API access (1M calls/mo)',
      '✓ Up to 10K products tracked',
      '✓ White-label report builder',
      '✓ Slack integration',
    ],
  },
]

// Waitlist ticker — animated 0 → 142
const TARGET = 142

export function Pricing() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const springs = useSpring({
    to: { count: mounted ? TARGET : 0 },
    config: { stiffness: 100, damping: 20, duration: 2.5 },
  })
  const displayCount = useTransform(springs.count, (v) => Math.floor(v))

  return (
    <section className="pricing">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Vise Pro — trend data, automated alerts, CSV exports
        </motion.h2>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          The free calculator shows your profit on one product. Vise Pro shows you which products
          are making money right now — automated.
        </motion.p>

        {/* Waitlist ticker */}
        <motion.div
          style={{ marginBottom: '40px', fontSize: '15px', color: 'var(--txt-2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <strong style={{ color: 'var(--orange)', fontWeight: 700 }}>{displayCount}</strong>{' '}
          creators on the waitlist. Early birds get 50% off.
        </motion.div>

        {/* Tier cards */}
        <div className="tiers-grid">
          {tiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} total={tiers.length} />
          ))}
        </div>

        <motion.div
          className="disclaimer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Vise is market analysis software, not financial advice. Not affiliated with Kixmon or TikTok.
        </motion.div>
      </div>
    </section>
  )
}


