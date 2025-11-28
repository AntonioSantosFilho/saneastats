export interface Attendee {
  id: string
  nome: string
  nomeCracha: string
  email: string
  documento: string
  cep: string
  endereco: string
  numero: string
  uf: string
  cidade: string
  pais: string
  instituicao: string
  formacao: string
  area: string
  subArea: string
  dataInscricao: string
  horaInscricao: string
  numeroInscricao: string
  categoria: string
  inscricao: string
  telefonePrimario: string
  telefoneSecundario: string
  credenciado: string
  dataCredenciamento: string
  horaCredenciamento: string
  material: string
  inscrito: string
  quantidadeCheckins: string
  impactoAmbiental: string
  hospedagem: string
  transporte: string
  pessoasTransporte: string
}

function normalizeText(text: string): string {
  let result = text
  
  // FIRST PASS: Fix known broken words BEFORE general replacements
  // These must be exact matches to avoid over-correction
  const knownWords: [RegExp, string][] = [
    // Fix "Avio" -> "Avião"
    [/\bAvio\b/gi, "Avião"],
    [/\bavio\b/gi, "avião"],
    // Fix "No Respondeu" -> "Não Respondeu"
    [/\bNo Respondeu\b/gi, "Não Respondeu"],
    [/\bno respondeu\b/gi, "não respondeu"],
    [/\bNo respondeu\b/g, "Não respondeu"],
    // Fix "Estudante de Ps-Graduação" -> "Estudante de Pós Graduação"
    [/\bPs-Graduação\b/gi, "Pós-Graduação"],
    [/\bPs-Graduacao\b/gi, "Pós-Graduação"],
    [/\bps-graduação\b/gi, "pós-graduação"],
    [/\bps-graduacao\b/gi, "pós-graduação"],
    [/\bEstudante de Ps-Graduação\b/gi, "Estudante de Pós-Graduação"],
    [/\bEstudante de Ps-Graduacao\b/gi, "Estudante de Pós-Graduação"],
    [/\bPs[^\w]Graduação\b/gi, "Pós-Graduação"],
    [/\bPs[^\w]Graduacao\b/gi, "Pós-Graduação"],
    // Fix "Ensino Mdio" -> "Ensino Médio"
    [/\bEnsino Mdio\b/gi, "Ensino Médio"],
    [/\bensino mdio\b/gi, "ensino médio"],
    [/\bEnsino mdio\b/g, "Ensino médio"],
    [/\bMdio\b/gi, "Médio"],
    [/\bmdio\b/gi, "médio"],
    // Fix "Tcnico" -> "Técnico"
    [/\bTcnico\b/gi, "Técnico"],
    [/\btcnico\b/gi, "técnico"],
    [/\bTcnico\b/g, "Técnico"],
    // Fix graduação in various broken forms - exact matches first
    [/\bGradua[óõô]{2,}o\b/gi, "Graduação"],
    [/\bgradua[óõô]{2,}o\b/gi, "graduação"],
    [/\bGradua[ï¿½]{2}o\b/gi, "Graduação"],
    [/\bgradua[ï¿½]{2}o\b/gi, "graduação"],
    [/\bGradua([óõô])\1+o\b/gi, "Graduação"],
    [/\bgradua([óõô])\1+o\b/gi, "graduação"],
    // Fix "Graduao" (without accent) to "Graduação"
    [/\bGraduao\b/gi, "Graduação"],
    [/\bgraduao\b/gi, "graduação"],
    // Fix "graduaó" -> "graduação"
    [/\bgradua[óõô]\b/gi, "graduação"],
    [/\bGradua[óõô]\b/gi, "Graduação"],
  ]
  
  for (const [pattern, replacement] of knownWords) {
    result = result.replace(pattern, replacement)
  }
  
  // Common UTF-8 double-encoding fixes
  const replacements: [RegExp, string][] = [
    // Fix UTF-8 replacement characters (ï¿½ pattern) - MUST BE FIRST
    // Fix specific broken words (order matters - more specific first)
    [/Prï¿½prio/gi, "Próprio"],
    [/prï¿½prio/gi, "próprio"],
    [/nï¿½o/gi, "não"],
    [/Nï¿½o/gi, "Não"],
    [/pï¿½blico/gi, "público"],
    [/Pï¿½blico/gi, "Público"],
    [/institui[ï¿½]{2}o/gi, "instituição"],
    [/Institui[ï¿½]{2}o/gi, "Instituição"],
    [/instituiï¿½ï¿½o/gi, "instituição"],
    [/Instituiï¿½ï¿½o/gi, "Instituição"],
    [/forma[ï¿½]{2}o/gi, "formação"],
    [/Forma[ï¿½]{2}o/gi, "Formação"],
    [/formaï¿½ï¿½o/gi, "formação"],
    [/Formaï¿½ï¿½o/gi, "Formação"],
    // Fix common word endings with broken encoding
    [/[ï¿½]{2}o/gi, "ção"],
    [/ï¿½/g, "ó"], // General replacement character -> ó (most common in Portuguese)
    // Lowercase accented letters
    [/Ã§/g, "ç"],
    [/Ã£/g, "ã"],
    [/Ã¡/g, "á"],
    [/Ã©/g, "é"],
    [/Ã­/g, "í"],
    [/Ã³/g, "ó"],
    [/Ãº/g, "ú"],
    [/Ã¢/g, "â"],
    [/Ãª/g, "ê"],
    [/Ã´/g, "ô"],
    [/Ã /g, "à"],
    [/Ã¼/g, "ü"],
    [/Ã±/g, "ñ"],
    [/Ã£o/g, "ão"],
    [/Ã§Ã£o/g, "ção"],
    // Uppercase accented letters
    [/Ã‰/g, "É"],
    [/Ã"/g, "Ó"],
    [/Ãš/g, "Ú"],
    [/Ã•/g, "Õ"],
    [/Ã‚/g, "Â"],
    [/Ãƒ/g, "Ã"],
    [/Ã€/g, "À"],
    [/Ã‡/g, "Ç"],
    // Alternative encodings
    [/ã§/g, "ç"],
    [/ã£/g, "ã"],
    [/ã¡/g, "á"],
    [/ã©/g, "é"],
    [/ã­/g, "í"],
    [/ã³/g, "ó"],
    [/ãº/g, "ú"],
    [/ã¢/g, "â"],
    [/ãª/g, "ê"],
    [/ã´/g, "ô"],
    [/ã /g, "à"],
    // Windows-1252 to UTF-8 common issues
    [/Ã¡/g, "á"],
    [/Ã¢/g, "â"],
    [/Ã£/g, "ã"],
    [/Ã©/g, "é"],
    [/Ãª/g, "ê"],
    [/Ã­/g, "í"],
    [/Ã³/g, "ó"],
    [/Ã´/g, "ô"],
    [/Ãµ/g, "õ"],
    [/Ãº/g, "ú"],
    [/Ã§/g, "ç"],
    [/Ã/g, "Á"],
    [/Ã‚/g, "Â"],
    [/Ãƒ/g, "Ã"],
    [/Ã‰/g, "É"],
    [/ÃŠ/g, "Ê"],
    [/Ã/g, "Í"],
    [/Ã"/g, "Ó"],
    [/Ã"/g, "Ô"],
    [/Ã•/g, "Õ"],
    [/Ãš/g, "Ú"],
    [/Ã‡/g, "Ç"],
    // Remove remaining replacement characters
    [/\uFFFD/g, ""],
  ]

  // Apply general replacements to result from first pass
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement)
  }
  
  // Additional pass: try to fix common Portuguese words with broken characters
  const commonWords: [RegExp, string][] = [
    // Fix "Avio" -> "Avião" (in case it wasn't caught)
    [/\bAvio\b/gi, "Avião"],
    // Fix "No Respondeu" variations
    [/\bNo[^\w]Respondeu\b/gi, "Não Respondeu"],
    [/^No\s+Respondeu$/gi, "Não Respondeu"],
    // Fix "Ps-Graduação" variations
    [/\bPs[^\w]Graduação\b/gi, "Pós Graduação"],
    [/\bPs[^\w]Graduacao\b/gi, "Pós Graduação"],
    // Fix "Mdio" -> "Médio"
    [/\bMdio\b/gi, "Médio"],
    [/\bEnsino\s+Mdio\b/gi, "Ensino Médio"],
    // Fix "Tcnico" -> "Técnico"
    [/\bTcnico\b/gi, "Técnico"],
    [/\btcnico\b/gi, "técnico"],
    // Fix graduação variations - be very specific to avoid over-matching
    [/^Gradua[óõô]+o$/g, "Graduação"],
    [/^gradua[óõô]+o$/g, "graduação"],
    [/Gradua[óõô]{2,}o/gi, "Graduação"],
    [/gradua[óõô]{2,}o/gi, "graduação"],
    [/Gradua[óõô]+$/g, "Graduação"],
    [/gradua[óõô]+$/g, "graduação"],
    [/Graduao$/g, "Graduação"],
    [/graduao$/g, "graduação"],
    [/Pr[^\w\s]prio/gi, "Próprio"],
    [/pr[^\w\s]prio/gi, "próprio"],
    [/n[^\w\s]o/gi, "não"],
    [/N[^\w\s]o/gi, "Não"],
  ]
  
  for (const [pattern, replacement] of commonWords) {
    result = result.replace(pattern, replacement)
  }
  
  // Final cleanup pass: fix any remaining issues
  // Fix cases like "Graduaóóo" -> "Graduação" (should have been caught earlier, but just in case)
  result = result.replace(/\bGradua([óõô])\1+o\b/gi, "Graduação")
  // Fix "Graduaó" -> "Graduação"
  result = result.replace(/\bGradua[óõô]\b/gi, "Graduação")
  // Fix "graduaó" -> "graduação"
  result = result.replace(/\bgradua[óõô]\b/gi, "graduação")
  // Fix "Graduao" (if it somehow still exists) -> "Graduação"
  result = result.replace(/\bGraduao\b/gi, "Graduação")
  // Clean up any remaining duplicate accented characters (but preserve single ones)
  result = result.replace(/([óõô])\1{3,}/g, "ção")
  result = result.replace(/([óõô])\1{2}/g, "ção")
  
  return result
}

export async function fetchCSVWithEncoding(url: string): Promise<string> {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()

  // Try different encodings and choose the best one
  let text = ""
  let bestText = ""
  let minBrokenChars = Infinity

  const encodings: string[] = ["utf-8", "iso-8859-1", "windows-1252"]

  for (const encoding of encodings) {
    try {
      text = new TextDecoder(encoding, { fatal: false }).decode(buffer)
      // Count replacement characters (U+FFFD or the literal sequence ï¿½)
      const brokenCharCount = (text.match(/\uFFFD|ï¿½/g) || []).length
      
      if (brokenCharCount < minBrokenChars) {
        minBrokenChars = brokenCharCount
        bestText = text
      }
      
      // If no broken characters, use this encoding immediately
      if (brokenCharCount === 0) {
        break
      }
    } catch (e) {
      // Continue to next encoding
      continue
    }
  }

  // Use the best text we found, or fallback to UTF-8
  text = bestText || new TextDecoder("utf-8", { fatal: false }).decode(buffer)

  return normalizeText(text)
}

export function parseCSV(csvText: string): Attendee[] {
  const normalizedText = normalizeText(csvText)
  const lines = normalizedText.split("\n")
  const attendees: Attendee[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = line.split(";")

    attendees.push({
      id: values[0] || "",
      nome: values[1] || "",
      nomeCracha: values[2] || "",
      email: values[3] || "",
      documento: values[4] || "",
      cep: values[5] || "",
      endereco: values[6] || "",
      numero: values[7] || "",
      uf: values[8] || "",
      cidade: values[9] || "",
      pais: values[10] || "",
      instituicao: values[11] || "",
      formacao: values[12] || "",
      area: values[13] || "",
      subArea: values[14] || "",
      dataInscricao: values[15] || "",
      horaInscricao: values[16] || "",
      numeroInscricao: values[17] || "",
      categoria: values[18] || "",
      inscricao: values[19] || "",
      telefonePrimario: values[20] || "",
      telefoneSecundario: values[21] || "",
      credenciado: values[22] || "",
      dataCredenciamento: values[23] || "",
      horaCredenciamento: values[24] || "",
      material: values[25] || "",
      inscrito: values[26] || "",
      quantidadeCheckins: values[27] || "",
      impactoAmbiental: values[28] || "",
      hospedagem: values[29] || "",
      transporte: values[30] || "",
      pessoasTransporte: values[31] || "",
    })
  }

  return attendees
}

export function countByField(attendees: Attendee[], field: keyof Attendee): Record<string, number> {
  const counts: Record<string, number> = {}
  attendees.forEach((a) => {
    const value = a[field] || "Não informado"
    counts[value] = (counts[value] || 0) + 1
  })
  return counts
}

export function toChartData(counts: Record<string, number>) {
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}
