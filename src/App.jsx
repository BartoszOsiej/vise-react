import { Hero } from './components/Hero.jsx'
import { Calculator } from './components/Calculator.jsx'
import { HowItWorks } from './components/HowItWorks.jsx'
import { Pricing } from './components/Pricing.jsx'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Calculator />
        <HowItWorks />
        <Pricing />
      </main>
      <footer className="container">
        <span>© 2026 Hartwell Labs. Vise — market analysis tools. No cookies. No tracking. Calculations in your browser.</span>
        <div className="footer-links" style={{ marginTop: '8px' }}>
          <a href="https://github.com/BartoszOsiej/tiktok-shop-tools">GitHub</a>
          <a href="mailto:bartosz@hartwell-labs.pl">Contact</a>
        </div>
      </footer>
    </>
  )
}
