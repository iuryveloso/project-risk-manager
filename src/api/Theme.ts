class ThemeApi {
  public async get() {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/theme`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((e) => e.json())
    return response
  }

  public async set(theme: string) {
    const url = `${process.env.NEXT_PUBLIC_HOSTNAME}/theme`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ theme }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const responseJSON = await response.json()
    return {
      message: responseJSON.message,
      status: response.status,
    }
  }
}

export default new ThemeApi()
