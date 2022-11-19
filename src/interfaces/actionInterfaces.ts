export interface ActionInterface {
  _id?: ''
  title: string
  description: string
  type: 'Oportunidade' | 'Ameaça'
  responsible: string
  status: 'Pendente' | 'Em Andamento' | 'Concluído'
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
    type: 'Ameaça',
    responsible: '',
    status: 'Pendente',
    observation: '',
  }
  return action
}
