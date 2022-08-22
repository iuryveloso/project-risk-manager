import Auth from '@api/Auth'
import UserInterface from '@interfaces/userInterface'
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
  setMessage,
  user,
  setUser,
  setCheckAuth,
}: UseAuthInterface) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  function get() {
    if (setUser) {
      Auth.get().then((e) => setUser(e))
    }
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

  function update() {
    Auth.update(user ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
      }
    })
  }
  function updateAvatar(avatar: File) {
    Auth.updateAvatar(avatar ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
      }
    })
  }
  function updatePassword() {
    Auth.updatePassword(user ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
      }
    })
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

  function showError(message: any, seconds = 5) {
    if (setError) {
      setError(message)
      setTimeout(() => setError(null), seconds * 1000)
    }
  }
  function showMessage(message: any, seconds = 5) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }
  return {
    check,
    get,
    loading,
    submit,
    logout,
    update,
    updateAvatar,
    updatePassword,
  }
}
