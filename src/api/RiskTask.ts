import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'

class RiskTaskApi {
  public async list(riskID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/riskTask/${riskID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async listByTask(taskID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/riskTask/task/${taskID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(riskTask: RiskTaskInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/riskTask`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(riskTask),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async delete(riskTask: RiskTaskInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/riskTask/${riskTask.riskID}/${riskTask.taskID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }
}

export default new RiskTaskApi()
