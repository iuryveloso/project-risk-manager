class ThemeApi {
  public async get() {
    const url = `${process.env.NEXT_HOSTNAME}/theme`
    const response = await fetch(url, { method: 'GET' })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
      theme: responseJSON.theme,
    }
  }

  public async set(theme: string) {
    const url = `${process.env.NEXT_HOSTNAME}/theme`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ theme }),
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }
}

export default new ThemeApi()
