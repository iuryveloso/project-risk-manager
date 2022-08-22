import UserInterface from '@interfaces/userInterface'

class AuthApi {
  public async get() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async check() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/check`
    const response = await fetch(url, { method: 'GET', credentials: 'include' })
    return response.status === 200
  }

  public async create(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth`
    const userFormData = new FormData()
    userFormData.append('firstName', user.firstName ?? '')
    userFormData.append('lastName', user.lastName ?? '')
    userFormData.append('avatar', user.avatar ?? '')
    userFormData.append('email', user.email ?? '')
    userFormData.append('password', user.password ?? '')
    userFormData.append('confirmPassword', user.confirmPassword ?? '')
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
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
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    return response
  }

  public async update(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async updateAvatar(avatar: File) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/avatar`
    const userFormData = new FormData()
    userFormData.append('avatar', avatar ?? '')
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: userFormData,
    }).then((e) => e.json())
    return response
  }

  public async updatePassword(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/password`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }
}

export default new AuthApi()
