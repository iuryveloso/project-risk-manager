import UserInterface from '@interfaces/userInterface'

class AuthApi {
  public async get() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth`
    const response = await fetch(url, { method: 'GET', credentials: 'include' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
      user: responseJSON.user,
    }
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
    const response = await fetch(url, {
      method: 'POST',
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

  public async login(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/login`
    const response = await fetch(url, {
      method: 'POST',
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
