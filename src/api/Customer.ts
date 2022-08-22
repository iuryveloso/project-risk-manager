import { CustomerInterface } from '@interfaces/customerInterface'

class CustomerApi {
  public async index() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get(customerID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer/${customerID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(customer: CustomerInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(customer),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async update(customer: CustomerInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer/${customer._id}`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(customer),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async delete(customerID: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer/${customerID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }
}

export default new CustomerApi()
