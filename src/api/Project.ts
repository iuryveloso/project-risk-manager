import { ProjectInterface } from '@interfaces/projectInterfaces'

class ProjectApi {
  public async index() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/project`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/project/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(project: ProjectInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/project`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(project),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async update(project: ProjectInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/project/${project._id}`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(project),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async delete(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/project/${projectID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }
}

export default new ProjectApi()
