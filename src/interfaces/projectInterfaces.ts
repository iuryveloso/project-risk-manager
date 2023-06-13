export interface ProjectInterface {
  _id?: string
  title: string
  description: string
  occupationArea: string
  begin: string
  end: string
  cost: number
  userID?: string
  message?: string
  functionProject?: 'manager' | 'collaborator'
}

export interface OrderInterface {
  column:
    | 'title'
    | 'description'
    | 'occupationArea'
    | 'begin'
    | 'end'
    | 'cost'
    | 'functionProject'
  direction: 'asc' | 'desc'
}

export function empty() {
  const project: ProjectInterface = {
    title: '',
    description: '',
    occupationArea: '',
    begin: '',
    end: '',
    cost: 0,
  }
  return project
}
