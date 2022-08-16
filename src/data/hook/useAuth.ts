import Auth from '@api/Auth'
import UserInterface from '@interfaces/userInterface'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useAuth() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'singup'>('login')
  const [type, setType] = useState<'text' | 'password'>('password')
  const [user, setUser] = useState<UserInterface>({
    email: '',
    firstName: '',
    lastName: '',
    avatar: undefined,
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    setUser({
      email: '',
      password: '',
      confirmPassword: '',
      avatar: undefined,
      firstName: '',
      lastName: '',
    })
  }, [mode])

  async function submit() {
    if (mode === 'login') {
      await Auth.login(user).then((e) => {
        if (e.error) {
          showError(e.error)
        } else {
          router.push('/')
        }
      })
    } else {
      await Auth.create(user).then((e) => {
        if (e.error) {
          showError(e.error)
        } else {
          router.push('/')
        }
      })
    }
  }

  function showError(message: any, seconds = 5) {
    setError(message)
    setTimeout(() => setError(null), seconds * 1000)
  }
  return {
    error,
    mode,
    setMode,
    user,
    setUser,
    type,
    setType,
    submit,
  }
}
