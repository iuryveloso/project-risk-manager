import { RiskInterface } from '@interfaces/riskInterfaces'

class RiskApi {
  public async list(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/risk/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async listHigherImpacts(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/risk/impacts/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async getRisksCost(projectID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/risk/risks_cost/${projectID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get(riskID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/risk/get/${riskID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(risk: RiskInterface) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/risk`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(risk),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async update(risk: RiskInterface) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/risk/${risk._id}`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(risk),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async delete(riskID: string) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/risk/${riskID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }
}

export default new RiskApi()
