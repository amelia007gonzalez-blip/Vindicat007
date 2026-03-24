"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ScanPage() {
  const [step, setStep] = useState(0); // 0: Idle/Upload, 1: Scanning, 2: Redacting, 3: Success
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      simulateProcess();
    }
  };

  const simulateProcess = async () => {
    setStep(1); // Escaneando
    await new Promise(r => setTimeout(r, 3000));
    setStep(2); // Anonimizando
    await new Promise(r => setTimeout(r, 2000));
    setStep(3); // Éxito
  };

  return (
    <main style={{ padding: '0 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: 'var(--max-width)', 
        margin: '0 auto', 
        padding: '24px 0',
        width: '100%'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="neon-text-blue">←</span> VOLVER
        </Link>
        <span style={{ fontWeight: 700, letterSpacing: '2px' }}>ESCÁNER FORENSE</span>
      </nav>

      <section style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        width: '100%'
      }}>
        
        {step === 0 && (
          <div className="glass-container" style={{ 
            padding: '60px', 
            textAlign: 'center', 
            maxWidth: '500px',
            width: '100%',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload}
              style={{ 
                position: 'absolute', 
                inset: 0, 
                opacity: 0, 
                cursor: 'pointer' 
              }}
            />
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📄</div>
            <h3 style={{ marginBottom: '12px' }}>Subir Ticket</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Arrastra tu imagen aquí o haz clic para escanear. <br />
              <span className="neon-text-green">Solo procesamiento local.</span>
            </p>
          </div>
        )}

        {step > 0 && (
          <div className="glass-container" style={{ 
            padding: '40px', 
            width: '100%', 
            maxWidth: '600px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Status Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div style={{ color: step === 1 ? 'var(--neon-blue)' : 'var(--text-secondary)' }}>
                {step === 1 ? '● ESCANEANDO...' : '✓ ESCANEADO'}
              </div>
              <div style={{ color: step === 2 ? 'var(--neon-blue)' : step > 2 ? 'var(--neon-green)' : 'var(--text-secondary)' }}>
                {step === 2 ? '● ANONIMIZANDO...' : step > 2 ? '✓ ANONIMIZADO' : '○ PRIVACIDAD'}
              </div>
              <div style={{ color: step === 3 ? 'var(--neon-green)' : 'var(--text-secondary)' }}>
                {step === 3 ? '✓ AUDITORÍA LISTA' : '○ AUDITORÍA'}
              </div>
            </div>

            {/* Visualizer */}
            <div style={{ 
              height: '300px', 
              background: 'rgba(0,0,0,0.5)', 
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px'
            }}>
              {/* Fake Text Extraction Lines */}
              <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                {step === 1 && (
                  <div className="extracting-text">
                    [INFO] Extrayendo píxeles... <br />
                    [INFO] Motor OCR: VisionV2 <br />
                    [DATA] Encontrado: MERCADONA S.A. <br />
                    [DATA] Encontrado: 21.05.2026 - 18:45 <br />
                    [DATA] Encontrado: PAN TRADICIONAL ... 0.45€ <br />
                  </div>
                )}
                {step === 2 && (
                  <div className="redacting-text">
                    [PRIVACIDAD] Ocultando Tarjeta: **** **** **** 4421 <br />
                    [PRIVACIDAD] Eliminando ID Cliente: 992831 <br />
                    [PRIVACIDAD] Sanificando Dirección de Tienda... <br />
                    <span className="neon-text-green">[ÉXITO] Datos Forenses Anonimizados.</span>
                  </div>
                )}
                {step === 3 && (
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <h2 className="neon-text-green" style={{ fontSize: '3rem' }}>✓</h2>
                    <h3>Análisis Preparado</h3>
                    <p style={{ marginTop: '10px' }}>PII eliminada. Estructura de datos extraída.</p>
                  </div>
                )}
              </div>

              {/* Scanning laser line */}
              {step === 1 && (
                <div style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, right: 0, height: '2px', 
                  background: 'var(--neon-blue)', 
                  boxShadow: '0 0 10px var(--neon-blue)',
                  animation: 'scan-laser 1.5s infinite linear'
                }}></div>
              )}
            </div>

            {step === 3 && (
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Link href="/results">
                  <button className="btn-primary" style={{ width: '100%' }}>EJECUTAR AUDITORÍA FORENSE</button>
                </Link>
              </div>
            )}
          </div>
        )}

      </section>
    </main>
  );
}
