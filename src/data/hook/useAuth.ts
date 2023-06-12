import Auth from '@api/Auth'
import UserInterface, { empty } from '@interfaces/userInterfaces'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

interface UseAuthInterface {
  mode?: 'login' | 'singup' | 'forgot'
  user?: UserInterface
  token?: string
  setUser?: Dispatch<SetStateAction<UserInterface>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setCheckAuth?: Dispatch<SetStateAction<boolean>>
  setToken?: Dispatch<SetStateAction<string>>
  sentToken?: string
}

export default function useAuth({
  mode,
  setError,
  user,
  setCheckAuth,
  token,
  setToken,
  sentToken,
}: UseAuthInterface) {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  function getGoogleOAuthURl() {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'

    const options = {
      redirect_uri: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_REDIRECT_URL as string,
      client_id: process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID as string,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    }

    const queryString = new URLSearchParams(options)

    return `${rootURL}?${queryString.toString()}`
  }

  async function check() {
    try {
      // setLoading(true)
      await Auth.check().then((e) => {
        if (setCheckAuth) setCheckAuth(e)
      })
    } finally {
      setTimeout(() => setLoading(false), 300)
    }
  }

  async function submit() {
    try {
      setLoading(true)
      if (mode === 'login') {
        await Auth.login(user ?? {}).then((e) => {
          if (e.error) {
            showError(e.error)
          } else {
            router.push('/')
          }
        })
      } else {
        await Auth.create(user ?? {}).then((e) => {
          if (e.error) {
            showError(e.error)
          } else {
            router.push('/')
          }
        })
      }
    } finally {
      setLoading(false)
    }
  }
  async function sendEmail() {
    if (user && setToken) {
      const token = Math.random().toString(36).slice(2)
      setToken(token)
      await Auth.sendEmail(user.email as string, token)
    }
  }

  async function updatePassword() {
    await Auth.updatePassword(user ?? empty()).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        router.push('/')
      }
    })
  }

  async function logout() {
    await Auth.logout()
    router.push('/auth')
  }

  function verifyToken() {
    if (token && sentToken && token === sentToken) {
      return true
    }
    showError('Token inválido, verifique seu email e tente novamente!')
    return false
  }

  function showError(message: any, seconds = 3) {
    if (setError) {
      setError(message)
      setTimeout(() => setError(null), seconds * 1000)
    }
  }
  return {
    check,
    getGoogleOAuthURl,
    loading,
    submit,
    sendEmail,
    updatePassword,
    verifyToken,
    logout,
  }
}
