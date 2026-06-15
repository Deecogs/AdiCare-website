// ----------------------------------------------------------------
// Fully local, in-browser prescription parser for the Live Demo.
// No network, no API key, no external dependency — runs instantly
// in the browser. Heuristic only; for display/demo purposes.
// ----------------------------------------------------------------

export interface ScanResult {
  patient: { name: string; age: string; sex: string };
  diagnosis: string[];
  medications: { name: string; dose: string; route: string; frequency: string; duration: string }[];
  follow_up: string;
  safety: {
    interactions: { drugs: string[]; severity: "low" | "moderate" | "high"; note: string }[];
    warnings: string[];
  };
  summary: string;
}

const FREQ_LABEL: Record<string, string> = {
  OD: "once daily",
  BD: "twice daily",
  BID: "twice daily",
  TID: "three times daily",
  QID: "four times daily",
  HS: "at bedtime",
  PRN: "as needed",
};

// A tiny demo-only interaction table (not clinically exhaustive).
const INTERACTIONS: { a: RegExp; b: RegExp; severity: "low" | "moderate" | "high"; note: string }[] = [
  { a: /metformin/i, b: /glimepiride/i, severity: "moderate", note: "Combined glucose-lowering — monitor for hypoglycaemia." },
  { a: /tramadol/i, b: /paracetamol|acetaminophen/i, severity: "low", note: "Common analgesic pairing — watch total paracetamol dose." },
  { a: /aspirin/i, b: /atorvastatin|statin/i, severity: "low", note: "Frequently co-prescribed in cardiac risk — generally well tolerated." },
];

export function parsePrescription(input: string): ScanResult {
  const text = input.slice(0, 4000);
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  // ---- patient ----
  const ptLine = lines.find((l) => /^pt[:\s]/i.test(l)) || "";
  const ptBody = ptLine.replace(/^pt[:\s]*/i, "");
  const ageSexMatch = ptBody.match(/(\d{1,3})\s*(?:yr|y)?\s*[\/, ]?\s*([MF])/i);
  const name = (ptBody.split(",")[0] || "Patient").replace(/\b\d.*$/, "").trim() || "Patient";
  const sexRaw = ageSexMatch?.[2]?.toUpperCase();

  // ---- diagnosis ----
  const dxLine = lines.find((l) => /^dx[:\s]/i.test(l)) || "";
  const diagnosis = dxLine
    ? dxLine.replace(/^dx[:\s]*/i, "").split(/[,;]/).map((s) => s.trim()).filter(Boolean)
    : [];

  // ---- medications ----
  const medLines = lines.filter((l) => !/^(pt|dx|f\/u|review|return|warm|post)/i.test(l));
  const medications = medLines.slice(0, 6).map((l) => {
    const dose = l.match(/(\d+(?:\.\d+)?\s?(?:mg|g|ml|mcg)(?:\s?\/\s?\d*\s?ml)?)/i)?.[0]?.replace(/\s+/g, "") || "—";
    const freqKey = l.match(/\b(OD|BD|TID|QID|HS|PRN|BID)\b/i)?.[0]?.toUpperCase();
    const freq = freqKey ? FREQ_LABEL[freqKey] || freqKey : "as directed";
    const duration = l.match(/x\s?\d+\s?(?:d|days|weeks|wks)/i)?.[0]?.replace(/\s+/g, " ").trim() || "—";
    const medName =
      l.replace(/^tab\s+|^cap\s+/i, "").split(/\d/)[0].replace(/[,.]$/, "").trim() || l.trim();
    return { name: medName, dose, route: "PO", frequency: freq, duration };
  });

  // ---- follow-up ----
  const fuLine = lines.find((l) => /^(f\/u|review|return)/i.test(l)) || "";
  const follow_up = fuLine.replace(/^(f\/u|review|return)[:\s]*/i, "").trim() || "As advised";

  // ---- safety (local heuristic) ----
  const medNames = medications.map((m) => m.name);
  const interactions: ScanResult["safety"]["interactions"] = [];
  for (const rule of INTERACTIONS) {
    const hasA = medNames.find((n) => rule.a.test(n));
    const hasB = medNames.find((n) => rule.b.test(n));
    if (hasA && hasB) {
      interactions.push({ drugs: [hasA, hasB], severity: rule.severity, note: rule.note });
    }
  }
  const warnings: string[] = [];
  if (/amoxicillin/i.test(text)) warnings.push("Confirm no penicillin allergy before dispensing.");
  if (medications.length >= 4) warnings.push("Polypharmacy — review for cumulative side effects.");

  // ---- summary ----
  const medCount = medications.length;
  const dxText = diagnosis[0] ? ` for ${diagnosis[0]}` : "";
  const summary =
    medCount > 0
      ? `${name} has ${medCount} medication${medCount > 1 ? "s" : ""}${dxText}; follow up ${follow_up.toLowerCase()}.`
      : "Prescription parsed — review the structured fields above.";

  return {
    patient: {
      name,
      age: ageSexMatch?.[1] ? `${ageSexMatch[1]}` : "—",
      sex: sexRaw === "M" ? "M" : sexRaw === "F" ? "F" : "other",
    },
    diagnosis,
    medications: medications.length ? medications : [{ name: "—", dose: "—", route: "PO", frequency: "—", duration: "—" }],
    follow_up,
    safety: {
      interactions,
      warnings: interactions.length === 0 && warnings.length === 0 ? ["No significant interactions detected in this demo set."] : warnings,
    },
    summary,
  };
}
