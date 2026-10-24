import { motion, useSpring, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'

const regionData = {
  usa: { tx: 0.30,  currency: '$',  vat: false, vatDefault: 0,  label: '$0.30' },
  eu:  { tx: 0.30,  currency: '€', vat: true,  vatDefault: 20, label: '€0.30' },
  pl:  { tx: 1.20,  currency: 'zł', vat: true,  vatDefault: 23, label: 'zł 1.20' },
}

export function Calculator() {
  const [price, setPrice]       = useState(30)
  const [cogs, setCogs]         = useState(5)
  const [shipping, setShipping] = useState(3.5)
  const [adcost, setAdcost]     = useState(2.5)
  const [region, setRegion]     = useState('usa')
  const [vatRate, setVatRate]   = useState(0)

  const r = regionData[region]
  const vat      = r.vat ? (price - cogs) * (vatRate / 100) : 0
  const comm     = price * 0.06
  const referral = price * 0.05
  const total    = cogs + shipping + adcost + comm + referral + r.tx + vat
  const profit   = price - total

  // Spring animation for profit number
  const springProfit = useSpring(profit, { stiffness: 300, damping: 30 })
  const displayProfit = useTransform(springProfit, (v) => fmt(v, r.currency))

  // Update spring when profit changes
  useEffect(() => {
    springProfit.set(profit)
  }, [profit])

  function fmt(v, cur) {
    if (cur === '€')  return '€' + (v || 0).toFixed(2)
    if (cur === 'zł') return (v || 0).toFixed(2) + ' zł'
    return            '$' + (v || 0).toFixed(2)
  }

  // Handle region change
  const handleRegionChange = (e) => {
    setRegion(e.target.value)
    setVatRate(regionData[e.target.value].vatDefault || 0)
  }

  const feeRows = [
    { label: 'TikTok commission (6%)', value: fmt(comm, r.currency) },
    { label: 'Referral fee (5%)',      value: fmt(referral, r.currency) },
    { label: 'Transaction processing', value: fmt(r.tx, r.currency) },
    ...(r.vat ? [{ label: `VAT (${vatRate}%)`, value: fmt(vat, r.currency) }] : []),
    { label: 'Shipping (your cost)',   value: fmt(shipping, r.currency) },
    { label: 'Ad spend (your cost)',   value: fmt(adcost, r.currency) },
  ]

  return (
    <section className="container" style={{ marginBottom: '40px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
        Your Product <span style={{ fontSize: '18px' }}>💰</span>
      </h2>

      <motion.div
        className="calculator"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
      >
        <div className="calc-grid">
          {/* Region selector */}
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label>Selling region</label>
            <select
              value={region}
              onChange={handleRegionChange}
              className="region-select"
            >
              <option value="usa">🇺🇸 USA — $0.30 fee</option>
              <option value="eu">🇪🇺 EU — €0.30 fee + VAT</option>
              <option value="pl">🇵🇱 Poland — zł 1.20 fee + VAT</option>
            </select>
          </motion.div>

          {/* Other inputs */}
          {['selling-price','cogs','shipping','ad'].map((field, i) => {
            const labels = ['Selling price', 'Cost of goods (what you pay supplier)', 'Shipping cost per order', 'Average ad spend per order']
            const defaults = [price, cogs, shipping, adcost]
            const setters = [setPrice, setCogs, setShipping, setAdcost]
            const currencies = [r.currency, r.currency, r.currency, r.currency]
            return (
              <motion.div
                key={field}
                className="input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <label>{labels[i]}</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={defaults[i]}
                  onChange={(e) => setters[i](parseFloat(e.target.value) || 0)}
                  placeholder={fmt(defaults[i], currencies[i])}
                />
              </motion.div>
            )
          })}

          {/* VAT field (conditional) */}
          {r.vat && (
            <motion.div
              className="input-group"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label>Estimated VAT rate (%)</label>
              <input
                type="number"
                value={vatRate}
                min="0"
                max="100"
                onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
              />
            </motion.div>
          )}
        </div>

        {/* Fee breakdown with stagger */}
        <div className="fee-breakdown">
          <AnimateFeeRows rows={feeRows} currency={r.currency} />
        </div>

        {/* Profit display */}
        <motion.div className="profit-display">
          <div className="label">YOUR TRUE PROFIT</div>
          <motion.div
            className="value"
            style={{
              color: profit > 5 ? '#059669' : profit > 0 ? '#d97706' : '#dc2626',
              fontSize: '44px',
              fontWeight: 700,
            }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {displayProfit}
          </motion.div>
          <div style={{ fontSize: '13px', color: 'var(--txt-3)', marginTop: '8px' }}>
            after all TikTok fees, per order
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Animated fee rows — stagger on render
function AnimateFeeRows({ rows, currency }) {
  return rows.map((row, i) => (
    <motion.div
      key={row.label}
      className="fee-row"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: i * 0.05, duration: 0.3 }}
    >
      <span className="fee-label">{row.label}</span>
      <span className="fee-value">{row.value}</span>
    </motion.div>
  ))
}
