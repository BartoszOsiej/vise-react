import { motion } from 'framer-motion'

const steps = [
  { num: '1', title: 'Paste your numbers', desc: 'Product price, COGS, shipping, ads — takes 10 seconds' },
  { num: '2', title: 'We add hidden fees', desc: '6% commission, 5% referral, $0.30 tx fee, VAT by region' },
  { num: '3', title: 'See true profit', desc: 'Know exactly what you make per order. Red flags appear instantly.' },
]

export function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Three steps to truth
        </motion.h2>

        <div className="steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <div className="num">{step.num}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 6px' }}>{step.title}</h3>
              <p style={{ color: 'var(--txt-2)', fontSize: '14px', lineHeight: 1.5 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
