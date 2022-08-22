import useAuth from '@data/hook/useAuth'
import Layout from '@components/auth/Layout'
import Login from '@components/auth/Login'
import Singup from '@components/auth/Singup'
import { useEffect, useState } from 'react'
import UserInterface, { empty } from '@interfaces/userInterface'

export default function Auth() {
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'singup'>('login')
  const [type, setType] = useState<'text' | 'password'>('password')
  const [user, setUser] = useState<UserInterface>(empty())

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

  const { submit } = useAuth({ mode, user, setError })
  return (
    <Layout
      title={'Gerenciador de Riscos de Projetos'}
      mode={mode}
      setMode={setMode}
    >
      <Login
        error={error}
        mode={mode}
        user={user}
        setUser={setUser}
        type={type}
        setType={setType}
        submit={submit}
      />
      <Singup
        error={error}
        mode={mode}
        user={user}
        setUser={setUser}
        type={type}
        setType={setType}
        submit={submit}
      />
    </Layout>
  )
}
