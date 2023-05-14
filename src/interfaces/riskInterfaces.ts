export interface RiskInterface {
  _id?: string
  title: string
  description: string
  category: 'Gestão do Projeto' | 'Técnico' | 'Organizacional' | 'Externo'
  causes: string
  probabilityPositive: number
  impactPositive: number
  probabilityNegative: number
  impactNegative: number
  observations: string
  status: 'Aprovado' | 'Em Análise' | 'Reprovado'
  projectID?: string
}

export interface OrderInterface {
  column:
    | 'title'
    | 'description'
    | 'category'
    | 'causes'
    | 'probabilityPositive'
    | 'probabilityNegative'
    | 'impactPositive'
    | 'impactNegative'
    | 'observations'
    | 'status'
  direction: 'asc' | 'desc'
}

export function empty() {
  const risk: RiskInterface = {
    title: '',
    description: '',
    category: 'Gestão do Projeto',
    causes: '',
    probabilityPositive: 0,
    impactPositive: 0,
    probabilityNegative: 0,
    impactNegative: 0,
    observations: '',
    status: 'Em Análise',
  }
  return risk
}

export interface chartRefInterface {
  toBase64Image: () => any
}
