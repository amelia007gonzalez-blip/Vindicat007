"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { runAudit, AuditResult } from "@/lib/audit-engine";

export default function ResultsPage() {
  const [result, setResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    // Datos simulados extraídos del paso anterior
    const mockData = {
      items: [
        { name: "PAN TRADICIONAL", total: 0.95, taxRate: 0.21, weight: 250 },
        { name: "Papas Fritas", total: 2.50, taxRate: 0.21, weight: 130 },
        { name: "LECHE ENTERA", total: 1.20, taxRate: 0.04, weight: 1000 },
      ]
    };
    setResult(runAudit(mockData));
  }, []);

  if (!result) return <div style={{ textAlign: 'center', padding: '100px' }}>Analizando Datos Forenses...</div>;

  return (
    <main style={{ padding: '0 20px', minHeight: '100vh', maxWidth: 'var(--max-width)', margin: '0 auto' }}>
      <nav style={{ padding: '24px 0', borderBottom: '1px solid var(--glass-border)', marginBottom: '40px' }}>
        <h2 style={{ letterSpacing: '2px' }}>INFORME <span className="neon-text-blue">FORENSE</span></h2>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        {/* Card de Resumen */}
        <div className="glass-container" style={{ 
          padding: '40px', 
          border: '2px solid var(--neon-blue)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: '0 0 30px rgba(0, 242, 255, 0.1)'
        }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>TOTAL RECUPERABLE</span>
          <h1 className="neon-text-blue" style={{ fontSize: '4rem' }}>{result.totalRecoverable.toFixed(2)}€</h1>
          <p style={{ color: 'var(--neon-green)', fontWeight: 600 }}>Evidencia Forense Bloqueada</p>
        </div>

        {/* Card de Estadísticas */}
        <div className="glass-container" style={{ padding: '40px' }}>
          <h3>Resumen de Auditoría</h3>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Artículos Escaneados:</span>
              <span className="neon-text-blue">3</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Infracciones de IVA:</span>
              <span className="neon-text-blue">{result.issues.filter(i => i.type === 'IVA_ERROR').length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Alertas de Reduflación:</span>
              <span className="neon-text-green">{result.issues.filter(i => i.type === 'REDUFLACION').length}</span>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '24px' }}>Desglose de Infracciones</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '80px' }}>
        {result.issues.map((issue, i) => (
          <div key={i} className="glass-container" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ 
                fontSize: '0.7rem', 
                background: issue.type === 'IVA_ERROR' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(57, 255, 20, 0.1)',
                color: issue.type === 'IVA_ERROR' ? 'var(--neon-blue)' : 'var(--neon-green)',
                padding: '4px 8px',
                borderRadius: '4px',
                display: 'inline-block',
                marginBottom: '8px',
                border: '1px solid currentColor'
              }}>
                {issue.type.replace('_', ' ')}
              </div>
              <h4 style={{ marginBottom: '4px' }}>{issue.item}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{issue.description}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              {issue.recoverableAmount > 0 && (
                <div className="neon-text-blue" style={{ fontWeight: 700, fontSize: '1.2rem' }}>
                  +{issue.recoverableAmount.toFixed(2)}€
                </div>
              )}
              <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Severidad: {issue.severity}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', paddingBottom: '100px' }}>
        <Link href="/claim">
          <button className="btn-primary" style={{ padding: '20px 60px', fontSize: '1.2rem' }}>GENERAR RECLAMACIÓN LEGAL</button>
        </Link>
      </div>

    </main>
  );
}
