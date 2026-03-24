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
          <span className="neon-text-green">●</span> SISTEMA ONLINE
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
          El Cazador <br />
          <span className="neon-text-blue">Forense de Dinero</span>
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.2rem', 
          maxWidth: '600px', 
          margin: '0 auto 40px auto',
          lineHeight: '1.6'
        }}>
          Deja de perder dinero por errores en el IVA, reduflación y cargos ilegales. 
          Vindicat007 audita tus tickets con precisión quirúrgica.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px' }}>
          <Link href="/scan">
            <button className="btn-primary">EMPEZAR CAZA</button>
          </Link>
          <Link href="#manifesto">
            <button className="btn-secondary">MANIFIESTO DE PRIVACIDAD</button>
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
          
          <h3 className="neon-text-blue">Tecnología Edge Computing</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Todo el OCR y la anonimización ocurre en tu dispositivo. <br />
            Tus datos sensibles nunca salen de tu mano.
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
            Manifiesto de <span className="neon-text-green">Privacidad</span>
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '40px' 
          }}>
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--neon-blue)' }}>01. Cero Almacenamiento de PII</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                No queremos tu nombre, dirección ni números de tarjeta. Nuestros escáneres omiten información personal localmente antes de la auditoría.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--neon-blue)' }}>02. Inteligencia en el Dispositivo</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                La Inteligencia Artificial no debe significar vigilancia. Usamos modelos pequeños (SLMs) que se ejecutan 100% en tu navegador.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '12px', color: 'var(--neon-blue)' }}>03. Tu Reclamación, Tu Poder</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Vindicat007 te da la munición legal. Tú decides cuándo y cómo disparar contra las empresas que te cobran de más.
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
        VINDICAT007 &copy; 2026 | CONSTRUIDO PARA EL CONSUMIDOR SOBERANO
      </footer>
    </main>
  );
}
