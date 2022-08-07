interface CustomerInterface {
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
  birthDate: Date
}

class CustomerApi {
  public async index() {
    const url = `${process.env.NEXT_HOSTNAME}/customer`
    const response = await fetch(url, { method: 'GET' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
      customers: responseJSON.customers,
    }
  }

  public async get(customerID: string) {
    const url = `${process.env.NEXT_HOSTNAME}/customer/${customerID}`
    const response = await fetch(url, { method: 'GET' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
      customer: responseJSON.customer,
    }
  }

  public async create(customer: CustomerInterface) {
    const url = `${process.env.NEXT_HOSTNAME}/customer`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(customer),
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async update(customer: CustomerInterface, customerID: string) {
    const url = `${process.env.NEXT_HOSTNAME}/customer/${customerID}`
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(customer),
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async delete(customerID: string) {
    const url = `${process.env.NEXT_HOSTNAME}/customer/${customerID}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }
}

export default new CustomerApi()
