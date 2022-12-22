import { ProjectInterface } from '@interfaces/projectInterfaces'

class ProjectApi {
  public async list() {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/project`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/project/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(project: ProjectInterface) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/project`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(project),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async update(project: ProjectInterface) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/project/${project._id}`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(project),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async delete(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/project/${projectID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }
}

export default new ProjectApi()
