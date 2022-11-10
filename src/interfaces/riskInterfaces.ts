export interface RiskInterface {
  _id?: string
  title: string
  description: string
  category: string
  causes: string
  probability: number
  impact: number
  observations: string
  projectID?: string
}

export interface OrderInterface {
  column: 'title' | 'description' | 'category' | 'causes' | 'observations'
  direction: 'asc' | 'desc'
}

export function empty() {
  const risk: RiskInterface = {
    title: '',
    description: '',
    category: '',
    causes: '',
    probability: 0,
    impact: 0,
    observations: '',
  }
  return risk
}
