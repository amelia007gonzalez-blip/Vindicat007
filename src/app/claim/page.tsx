"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClaimPage() {
  const [copied, setCopied] = useState(false);
  const [claimText, setClaimText] = useState("");

  useEffect(() => {
    const draft = `Asunto: Reclamación Extrajudicial por Cobro Indebido e Infracción Tributaria

A la atención del Servicio de Atención al Cliente,

Por la presente, les comunico que tras una auditoría forense digital de mi ticket de compra realizado el 21.05.2026, se ha detectado una anomalía en la aplicación de los tipos impositivos (IVA):

1. Producto: PAN TRADICIONAL
2. Infracción: Se ha aplicado un IVA del 21% cuando la legislación vigente (Ley del IVA) estipula un tipo superreducido del 4% (o 0% según prórrogas vigentes) para productos de panadería común.
3. Diferencial cobrado indebidamente: 0.16€

Asimismo, se ha detectado una práctica de 'Reduflación' no comunicada en el producto 'Papas Fritas', habiendo reducido el peso neto de 150g a 130g manteniendo el precio de venta al público de 2.50€.

Solicito el reembolso del importe cobrado indebidamente y el registro de esta incidencia en su canal de cumplimiento normativo.

Atentamente,
[Su Nombre Aquí]
Forensic Evidence ID: V007-SCAN-9928`;
    setClaimText(draft);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(claimText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = () => {
    const subject = encodeURIComponent("Reclamación por Cobro Indebido - Vindicat007");
    const body = encodeURIComponent(claimText);
    window.location.href = `mailto:atencioncliente@empresa.com?subject=${subject}&body=${body}`;
  };

  return (
    <main style={{ padding: '0 20px', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <nav style={{ padding: '24px 0', marginBottom: '40px' }}>
        <Link href="/results" style={{ color: 'var(--neon-blue)' }}>← VOLVER A LAS EVIDENCIAS</Link>
      </nav>

      <div className="glass-container" style={{ padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '24px' }}>Generar <span className="neon-text-blue">Reclamación Legal</span></h2>
        
        <div style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: '30px', 
          borderRadius: '8px', 
          fontFamily: 'monospace', 
          fontSize: '0.9rem',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          border: '1px solid var(--glass-border)',
          maxHeight: '400px',
          overflowY: 'auto',
          marginBottom: '30px'
        }}>
          {claimText}
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-primary" onClick={sendEmail} style={{ flex: 1 }}>ENVIAR POR EMAIL</button>
          <button className="btn-secondary" onClick={copyToClipboard} style={{ flex: 1 }}>
            {copied ? "✓ COPIADO" : "COPIAR AL PORTAPAPELES"}
          </button>
        </div>
      </div>

      <div className="glass-container" style={{ padding: '30px', textAlign: 'center' }}>
        <h4 className="neon-text-green">¿Qué ocurre ahora?</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
          La mayoría de las empresas reembolsan estos importes de inmediato para evitar escaladas legales. 
          Vindicat007 te da el poder con las referencias exactas a la ley.
        </p>
      </div>

      <footer style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5, fontSize: '0.8rem' }}>
        PARA FINES DEMOSTRATIVOS | MOTOR LEGAL RAG VINDICAT007
      </footer>

    </main>
  );
}
