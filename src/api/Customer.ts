import { CustomerInterface } from '@interfaces/customerInterface'
interface CustomerApiInterface {
  message: any
  status: number
  customer?: any
  customers?: any
}

class CustomerApi {
  public async index() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get(customerID: string): Promise<CustomerApiInterface> {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer/${customerID}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async create(
    customer: CustomerInterface
  ): Promise<CustomerApiInterface> {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(customer),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async update(
    customer: CustomerInterface
  ): Promise<CustomerApiInterface> {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer/${customer._id}`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(customer),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async delete(customerID: string): Promise<CustomerApiInterface> {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/customer/${customerID}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }
}

export default new CustomerApi()
