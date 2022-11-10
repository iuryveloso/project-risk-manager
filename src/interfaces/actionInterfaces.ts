export interface ActionInterface {
  _id?: ''
  title: string
  description: string
  type: string
  responsible: string
  status: string
  observation: string
  riskID?: string
}

export interface OrderInterface {
  column:
    | 'title'
    | 'description'
    | 'type'
    | 'responsible'
    | 'status'
    | 'observation'
  direction: 'asc' | 'desc'
}

export function empty() {
  const action: ActionInterface = {
    title: '',
    description: '',
    type: '',
    responsible: '',
    status: '',
    observation: '',
  }
  return action
}
