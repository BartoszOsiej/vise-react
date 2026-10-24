import { motion } from 'motion/react'

export function Hero() {
  return (
    <header className="hero container">
      <motion.div
        className="logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7V12C2 16.5 6.5 20.5 12 22C17.5 20.5 22 16.5 22 12V7L12 2Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="logo-text">Vise</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
      >
        How much do you really make on TikTok Shop?
      </motion.h1>

      <motion.p
        className="subheading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        The calculator is free, forever. Vise Pro adds market intelligence — which 50 products
        are trending, which creators are buying, and whether your niche is profitable — for a monthly fee.
      </motion.p>
    </header>
  )
}
