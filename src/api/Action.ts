import { ActionInterface } from '@interfaces/actionInterfaces'

class ActionApi {
  public async list(riskID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/action/${riskID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async listAll() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/action`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get(actionID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/action/get/${actionID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(action: ActionInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/action`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(action),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async update(action: ActionInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/action/${action._id}`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(action),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async delete(actionID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/action/${actionID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }
}

export default new ActionApi()
