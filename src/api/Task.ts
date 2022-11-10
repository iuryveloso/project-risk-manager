import { TaskInterface } from '@interfaces/taskInterfaces'

class TaskApi {
  public async list(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/task/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async listSubTasks(projectID: string, parentTaskID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/task/${projectID}/${parentTaskID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async listAllSubTasks(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/task/subtasks/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get(id: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/task/get/${id}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(task: TaskInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/task`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(task),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async update(task: TaskInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/task/${task._id}`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(task),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async delete(taskID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/task/${taskID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }
}

export default new TaskApi()
