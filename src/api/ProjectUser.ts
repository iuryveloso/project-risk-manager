import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'

class RiskTaskApi {
  public async list(userID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/projectUser/${userID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async listByProject(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/projectUser/project/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get(userID: string, projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/projectUser/get/${userID}/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(projectUser: ProjectUserInterface) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/projectUser`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(projectUser),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async delete(projectUser: ProjectUserInterface) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/projectUser/${projectUser.userID}/${projectUser.projectID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }
}

export default new RiskTaskApi()
