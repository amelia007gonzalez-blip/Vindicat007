export interface AuditIssue {
  type: 'IVA_ERROR' | 'REDUFLACION' | 'CARGO_INESPERADO';
  item: string;
  severity: 'ALTA' | 'MEDIA' | 'BAJA';
  description: string;
  recoverableAmount: number;
}

export interface AuditResult {
  totalRecoverable: number;
  issues: AuditIssue[];
}

const IVA_REGULATIONS: Record<string, number> = {
  "PAN": 0.04, // IVA Superreducido en España
  "LECHE": 0.04,
  "FRUTA": 0.04,
  "LIBRO": 0.04,
  "ACEITE": 0.00, // IVA eliminado temporalmente o reducido (ajustable)
  "REFRESCO": 0.21,
  "ALCOHOL": 0.21,
};

const PRECIOS_HISTORICOS: Record<string, { weight: number, price: number }> = {
  "Papas Fritas 150g": { weight: 150, price: 2.50 },
  "Aceite de Oliva 1L": { weight: 1000, price: 8.50 },
};

export function runAudit(data: any): AuditResult {
  const issues: AuditIssue[] = [];
  let totalRecoverable = 0;

  // 1. Auditoría de IVA
  if (data.items) {
    data.items.forEach((item: any) => {
      const productName = item.name.toUpperCase();
      const appliedIVA = item.taxRate || 0.21;
      
      for (const [key, correctIVA] of Object.entries(IVA_REGULATIONS)) {
        if (productName.includes(key)) {
          if (appliedIVA > correctIVA) {
            const diff = item.total * (appliedIVA - correctIVA);
            issues.push({
              type: 'IVA_ERROR',
              item: item.name,
              severity: 'ALTA',
              description: `IVA Incorrecto: Se ha aplicado un ${Math.round(appliedIVA * 100)}% en lugar del ${Math.round(correctIVA * 100)}% correspondiente.`,
              recoverableAmount: diff
            });
            totalRecoverable += diff;
          }
        }
      }
    });

    // 2. Auditoría de Reduflación
    data.items.forEach((item: any) => {
      for (const [key, history] of Object.entries(PRECIOS_HISTORICOS)) {
        if (item.name.includes("Papas Fritas") && item.weight < history.weight) {
          issues.push({
            type: 'REDUFLACION',
            item: item.name,
            severity: 'MEDIA',
            description: `Reduflación Detectada: Este producto solía pesar ${history.weight}g por el mismo precio. Peso actual: ${item.weight}g. (-${((history.weight - item.weight) / history.weight * 100).toFixed(1)}%)`,
            recoverableAmount: 0
          });
        }
      }
    });
  }

  return { totalRecoverable, issues };
}
