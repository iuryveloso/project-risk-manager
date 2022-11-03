export interface TaskInterface {
  _id?: string
  title: string
  description: string
  begin: string
  end: string
  projectID?: string
  parentTaskID?: string
}

export interface OrderInterface {
  column: 'title' | 'description' | 'begin' | 'end'
  direction: 'asc' | 'desc'
}

export function empty() {
  const task: TaskInterface = {
    title: '',
    description: '',
    begin: '',
    end: '',
  }
  return task
}
