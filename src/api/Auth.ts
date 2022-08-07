interface UserInterface {
  email?: string
  firstName?: string
  lastName?: string
  avatar?: string
  password?: string
  confirmPassword?: string
  newPassword?: string
}

class AuthApi {
  public async get() {
    const url = `${process.env.NEXT_HOSTNAME}/auth`
    const response = await fetch(url, { method: 'GET' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
      user: responseJSON.user,
    }
  }

  public async check() {
    const url = `${process.env.NEXT_HOSTNAME}/auth/check`
    const response = await fetch(url, { method: 'GET' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async create(user: UserInterface) {
    const url = `${process.env.NEXT_HOSTNAME}/auth`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async login(user: UserInterface) {
    const url = `${process.env.NEXT_HOSTNAME}/auth/login`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async logout() {
    const url = `${process.env.NEXT_HOSTNAME}/auth/logout`
    const response = await fetch(url, { method: 'GET' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async update(user: UserInterface) {
    const url = `${process.env.NEXT_HOSTNAME}/auth`
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(user),
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }

  public async updatePassword(user: UserInterface) {
    const url = `${process.env.NEXT_HOSTNAME}/auth/password`
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(user),
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }
}

export default new AuthApi()
