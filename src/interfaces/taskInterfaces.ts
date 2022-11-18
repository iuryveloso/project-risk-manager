export interface TaskInterface {
  _id?: string
  title: string
  description: string
  responsible: string
  begin: string
  end: string
  projectID?: string
  parentTaskID?: string
}

export interface OrderInterface {
  column: 'title' | 'description' | 'responsible' | 'begin' | 'end'
  direction: 'asc' | 'desc'
}

export function empty() {
  const task: TaskInterface = {
    title: '',
    description: '',
    responsible: '',
    begin: '',
    end: '',
  }
  return task
}
