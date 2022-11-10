export interface RiskTaskInterface {
  _id?: string
  riskID: string
  taskID: string
}

export function empty() {
  const risk: RiskTaskInterface = {
    riskID: '',
    taskID: '',
  }
  return risk
}
