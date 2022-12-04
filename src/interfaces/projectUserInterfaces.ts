export interface ProjectUserInterface {
  _id?: string
  functionProject: 'manager' | 'collaborator'
  userID: string
  projectID: string
}

export function empty() {
  const projectUser: ProjectUserInterface = {
    userID: '',
    projectID: '',
    functionProject: 'collaborator',
  }
  return projectUser
}
