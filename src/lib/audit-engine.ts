export interface AuditIssue {
  type: 'VAT_ERROR' | 'SHRINKFLATION' | 'UNEXPECTED_FEE';
  item: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  recoverableAmount: number;
}

export interface AuditResult {
  totalRecoverable: number;
  issues: AuditIssue[];
}

const VAT_REGULATIONS: Record<string, number> = {
  "PAN": 0.04, // IVA Superreducido en España
  "LECHE": 0.04,
  "FRUTA": 0.04,
  "LIBRO": 0.04,
  "REFRESCO": 0.21,
  "ALCOHOL": 0.21,
};

const HISTORICAL_PRICES: Record<string, { weight: number, price: number }> = {
  "Papas Fritas 150g": { weight: 150, price: 2.50 },
  "Aceite de Oliva 1L": { weight: 1000, price: 8.50 },
};

export function runAudit(data: any): AuditResult {
  const issues: AuditIssue[] = [];
  let totalRecoverable = 0;

  // 1. VAT Audit Heuristics
  if (data.items) {
    data.items.forEach((item: any) => {
      const productName = item.name.toUpperCase();
      const appliedIVA = item.taxRate || 0.21;
      
      for (const [key, correctIVA] of Object.entries(VAT_REGULATIONS)) {
        if (productName.includes(key)) {
          if (appliedIVA > correctIVA) {
            const diff = item.total * (appliedIVA - correctIVA);
            issues.push({
              type: 'VAT_ERROR',
              item: item.name,
              severity: 'HIGH',
              description: `Incorrect VAT Applied: ${appliedIVA * 100}% instead of ${correctIVA * 100}%.`,
              recoverableAmount: diff
            });
            totalRecoverable += diff;
          }
        }
      }
    });

    // 2. Shrinkflation Audit
    data.items.forEach((item: any) => {
      for (const [key, history] of Object.entries(HISTORICAL_PRICES)) {
        if (item.name.includes("Papas Fritas") && item.weight < history.weight) {
          issues.push({
            type: 'SHRINKFLATION',
            item: item.name,
            severity: 'MEDIUM',
            description: `Shrinkflation Detected: Last month this item was ${history.weight}g for the same price. Current weight: ${item.weight}g. (-${((history.weight - item.weight) / history.weight * 100).toFixed(1)}%)`,
            recoverableAmount: 0 // Not directly recoverable in cash but legal claimable for deception
          });
        }
      }
    });
  }

  return { totalRecoverable, issues };
}
