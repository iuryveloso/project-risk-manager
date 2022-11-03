export interface ProjectInterface {
  _id?: string
  title: string
  description: string
  begin: string
  end: string
  userID?: string
}

export interface OrderInterface {
  column: 'title' | 'description' | 'begin' | 'end'
  direction: 'asc' | 'desc'
}

export function empty() {
  const project: ProjectInterface = {
    title: '',
    description: '',
    begin: '',
    end: '',
  }
  return project
}
