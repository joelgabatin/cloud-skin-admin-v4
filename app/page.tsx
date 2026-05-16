import { Navbar } from '@/components/Navbar'
import { Button, LinkButton } from '@/components/Button'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <Navbar />
      
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1>Cloud Skin Design System</h1>
          <p>A beautiful, accessible React component library for the Cloud Skin Clinic + Wellness admin portal and marketing site.</p>
          
          <div className={styles.ctaGroup}>
            <Button variant="primary-teal" size="lg">
              Get Started
            </Button>
            <Button variant="outline-blue" size="lg">
              View Components
            </Button>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Button Variants</h2>
          <div className={styles.componentGrid}>
            <div className={styles.componentCard}>
              <h3>Primary Teal</h3>
              <div className={styles.buttonRow}>
                <Button variant="primary-teal" size="sm">Small</Button>
                <Button variant="primary-teal" size="md">Medium</Button>
                <Button variant="primary-teal" size="lg">Large</Button>
              </div>
            </div>

            <div className={styles.componentCard}>
              <h3>Primary Blue</h3>
              <div className={styles.buttonRow}>
                <Button variant="primary-blue" size="sm">Small</Button>
                <Button variant="primary-blue" size="md">Medium</Button>
                <Button variant="primary-blue" size="lg">Large</Button>
              </div>
            </div>

            <div className={styles.componentCard}>
              <h3>Outline Blue</h3>
              <div className={styles.buttonRow}>
                <Button variant="outline-blue" size="sm">Small</Button>
                <Button variant="outline-blue" size="md">Medium</Button>
                <Button variant="outline-blue" size="lg">Large</Button>
              </div>
            </div>

            <div className={styles.componentCard}>
              <h3>Text Links</h3>
              <div className={styles.buttonRow}>
                <LinkButton variant="text-blue" size="sm">View All →</LinkButton>
                <LinkButton variant="text-blue" size="md">Learn More →</LinkButton>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Color System</h2>
          <div className={styles.colorGrid}>
            <ColorSwatch name="Navy 900" value="#152F4A" />
            <ColorSwatch name="Navy 800" value="#1A2E40" />
            <ColorSwatch name="Navy 700" value="#1A3A5C" />
            <ColorSwatch name="Navy 500" value="#2D6A9F" />
            <ColorSwatch name="Teal 500" value="#069494" />
            <ColorSwatch name="Teal 700" value="#047A7A" />
            <ColorSwatch name="Tint 100" value="#EBF6FD" />
            <ColorSwatch name="Tint 200" value="#D0E8F5" />
          </div>
        </section>
      </div>
    </main>
  )
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.colorSwatch}>
      <div className={styles.swatchPreview} style={{ backgroundColor: value }} />
      <p className={styles.swatchLabel}>{name}</p>
      <p className={styles.swatchValue}>{value}</p>
    </div>
  )
}
