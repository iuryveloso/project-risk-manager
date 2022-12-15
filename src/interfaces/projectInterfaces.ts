export interface ProjectInterface {
  _id?: string
  title: string
  description: string
  occupationArea: string
  begin: string
  end: string
  userID?: string
  message?: string
  functionProject?: 'manager' | 'collaborator'
}

export interface OrderInterface {
  column: 'title' | 'description' | 'occupationArea' | 'begin' | 'end'
  direction: 'asc' | 'desc'
}

export function empty() {
  const project: ProjectInterface = {
    title: '',
    description: '',
    occupationArea: '',
    begin: '',
    end: '',
  }
  return project
}
