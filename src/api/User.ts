import UserInterface from '@interfaces/userInterfaces'

class UserApi {
  public async list() {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/user`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async get() {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/user/get`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async update(user: UserInterface) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/user`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }

  public async updateAvatar(avatar: File) {
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/user/avatar`
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
    const url = `${process.env.NEXT_PUBLIC_API_NAME}/user/password`
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((e) => e.json())
    return response
  }
}

export default new UserApi()
