import { motion } from 'motion/react'

export function TierCard({ tier, index, total }) {
  const isPopular = tier.popular
  const spots = 3  // hardcoded — Bartosz said early birds get 50% off; 3 spots left

  return (
    <motion.div
      className={`tier-card ${isPopular ? 'popular' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
      whileHover={{
        scale: 1.03,
        borderColor: '#4f46e5',
        boxShadow: '0 0 0 3px rgba(79,70,229,.25)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {isPopular && <div className="badge">🔥 BEST VALUE</div>}
      {spots && !isPopular && (
        <div className="badge" style={{
          background: 'rgba(217, 119, 6, .9)',
          color: '#000',
        }}>⚡ {spots} spots left</div>
      )}

      <h3>{tier.name}</h3>

      <div className="price">
        <span style={{ fontSize: '36px', fontWeight: 700 }}>${tier.price}</span>
        <span className="small">/month</span>
      </div>

      {isPopular && (
        <div className="spot-count" style={{
          fontSize: '13px', color: '#d97706', fontWeight: 700, margin: '8px 0',
        }}>
          Only {spots} spots left at 50% off — join 142 creators
        </div>
      )}

      <ul>
        {tier.features.map((feat, i) => (
          <motion.li
            key={feat}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 + i * 0.03 }}
          >
            {feat}
          </motion.li>
        ))}
      </ul>

      {tier.limit && (
        <div className="limit-label">
          ⚡ Limited to {tier.limit} — no abuse
        </div>
      )}

      <motion.button
        className="btn"
        style={{ width: '100%', marginTop: '16px' }}
        onClick={() => showWaitlist(tier.id)}
        whileHover={{
          boxShadow: '0 8px 20px rgba(79,70,229,.35)',
          translateY: -2,
        }}
        whileTap={{ scale: 0.97 }}
      >
        Join the waitlist
      </motion.button>
    </motion.div>
  )
}

function showWaitlist(tier) {
  const pricing = { workplace: '$10', studio: '$15', enterprise: '$25' }
  const names   = { workplace: 'Vise Workplace', studio: 'Vise Studio', enterprise: 'Vise Enterprise' }
  alert(
    '🚀 ' + names[tier] + ' waitlist confirmed!\n\n' +
    'You\'re on the waitlist for ' + pricing[tier] + '/mo.\n' +
    'First 142 creators get 50% off the first month.\n\n' +
    'We\'ll email you when Vise launches.'
  )
}
