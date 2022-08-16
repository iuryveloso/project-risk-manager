import UserInterface from '@interfaces/userInterface'

class AuthApi {
  public async get() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => {
      return { json: e.json(), status: e.status }
    })
    return response
  }

  public async check() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/check`
    const response = await fetch(url, { method: 'GET', credentials: 'include' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async create(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth`
    console.log(user)
    const userFormData = new FormData()
    userFormData.append('firstName', user.firstName ?? '')
    userFormData.append('lastName', user.lastName ?? '')
    userFormData.append('avatar', user.avatar ?? '')
    userFormData.append('email', user.email ?? '')
    userFormData.append('password', user.password ?? '')
    userFormData.append('confirmPassword', user.confirmPassword ?? '')
    console.log(userFormData)
    const response = await fetch(url, {
      method: 'POST',
      body: userFormData,
    }).then((e) => e.json())
    return response
  }

  public async login(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/login`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async logout() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/logout`
    const response = await fetch(url, { method: 'GET', credentials: 'include' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async update(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async updatePassword(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/password`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }
}

export default new AuthApi()
