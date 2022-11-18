export interface RiskInterface {
  _id?: string
  title: string
  description: string
  category: string
  causes: string
  probabilityPositive: number
  impactPositive: number
  probabilityNegative: number
  impactNegative: number
  observations: string
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
  direction: 'asc' | 'desc'
}

export function empty() {
  const risk: RiskInterface = {
    title: '',
    description: '',
    category: '',
    causes: '',
    probabilityPositive: 0,
    impactPositive: 0,
    probabilityNegative: 0,
    impactNegative: 0,
    observations: '',
  }
  return risk
}

export interface chartRefInterface {
  toBase64Image: () => any
}
