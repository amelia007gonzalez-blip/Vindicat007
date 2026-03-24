import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: '0 20px' }}>
      {/* Header / Nav */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: 'var(--max-width)', 
        margin: '0 auto', 
        padding: '24px 0' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="glow-point"></div>
          <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '1px' }}>
            VINDICAT<span className="neon-text-blue">007</span>
          </span>
        </div>
        <div className="glass-container" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
          <span className="neon-text-green">●</span> SYSTEM ONLINE
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        maxWidth: 'var(--max-width)', 
        margin: '80px auto', 
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '24px' }}>
          The Forensic <br />
          <span className="neon-text-blue">Money Hunter</span>
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.2rem', 
          maxWidth: '600px', 
          margin: '0 auto 40px auto',
          lineHeight: '1.6'
        }}>
          Stop losing money to hidden tax errors, shrinkflation, and illegal charges. 
          Vindicat007 audits your receipts with surgical precision.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px' }}>
          <Link href="/scan">
            <button className="btn-primary">START HUNTING</button>
          </Link>
          <Link href="#manifesto">
            <button className="btn-secondary">PRIVACY MANIFESTO</button>
          </Link>
        </div>

        {/* Hero Visual Mockup */}
        <div className="glass-container" style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          height: '400px', 
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '40px'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            left: '0', 
            right: '0', 
            height: '1px', 
            background: 'linear-gradient(90deg, transparent, var(--neon-blue), transparent)',
            opacity: 0.5 
          }}></div>
          
          <h3 className="neon-text-blue">Edge Computing Ready</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            All OCR and redacting happens on your device. <br />
            Sensitive data never leaves your hand.
          </p>

          {/* Abstract scanning line animation simulation */}
          <div style={{ 
            width: '100%', 
            height: '2px', 
            background: 'var(--neon-green)', 
            boxShadow: '0 0 15px var(--neon-green)',
            position: 'absolute',
            top: '50%',
            left: 0,
            animation: 'scan-line 4s infinite linear'
          }}></div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" style={{ 
        maxWidth: 'var(--max-width)', 
        margin: '120px auto', 
        padding: '60px 20px'
      }}>
        <div className="glass-container" style={{ padding: '60px' }}>
          <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>
            Privacy <span className="neon-text-green">Manifesto</span>
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '40px' 
          }}>
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--neon-blue)' }}>01. No Personal Data Storage</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                We don't want your name, your address, or your credit card numbers. Our scanners redact information locally before auditing.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--neon-blue)' }}>02. Edge-First Intelligence</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Artificial Intelligence shouldn't mean surveillance. We use Small Language Models (SLMs) that run in your browser.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--neon-blue)' }}>03. Your Claims, Your Power</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Vindicat007 provides the legal ammunition. You decide when and how to fire it at corporations who overcharge you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ 
        textAlign: 'center', 
        padding: '60px 0', 
        color: 'var(--text-secondary)', 
        fontSize: '0.8rem',
        borderTop: '1px solid var(--glass-border)'
      }}>
        VINDICAT007 &copy; 2026 | BUILT FOR THE SOVEREIGN CONSUMER
      </footer>
    </main>
  );
}
