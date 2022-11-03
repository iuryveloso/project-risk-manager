import Auth from '@api/Auth'
import UserInterface from '@interfaces/userInterfaces'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

interface UseAuthInterface {
  mode?: 'login' | 'singup'
  user?: UserInterface
  setUser?: Dispatch<SetStateAction<UserInterface>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setCheckAuth?: Dispatch<SetStateAction<boolean>>
}

export default function useAuth({
  mode,
  setError,
  user,
  setCheckAuth,
}: UseAuthInterface) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

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

  function check() {
    try {
      setLoading(true)
      Auth.check().then((e) => {
        if (setCheckAuth) setCheckAuth(e)
      })
    } finally {
      setLoading(false)
    }
  }

  function submit() {
    try {
      setLoading(true)
      if (mode === 'login') {
        Auth.login(user ?? {}).then((e) => {
          if (e.error) {
            showError(e.error)
          } else {
            router.push('/')
          }
        })
      } else {
        Auth.create(user ?? {}).then((e) => {
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

  function logout() {
    Auth.logout()
    router.push('/auth')
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
    logout,
  }
}
