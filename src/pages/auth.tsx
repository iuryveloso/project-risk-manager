import useAuth from '@data/hook/useAuth'
import Layout from '@components/auth/Layout'
import Login from '@components/auth/Login'
import ForgotPassword from '@components/auth/ForgotPassword'
import Singup from '@components/auth/Singup'
import { useEffect, useState } from 'react'
import UserInterface, { empty } from '@interfaces/userInterfaces'

export default function Auth() {
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'singup' | 'forgot'>('login')
  const [type, setType] = useState<'text' | 'password'>('password')
  const [token, setToken] = useState('')
  const [sentToken, setSentToken] = useState('')
  const [user, setUser] = useState<UserInterface>(empty())

  useEffect(() => {
    setUser(empty())
  }, [mode])

  const { submit, getGoogleOAuthURl, sendEmail, verifyToken, updatePassword } =
    useAuth({
      mode,
      user,
      setError,
      setToken,
      token,
      sentToken,
    })
  return (
    <Layout
      title={'Gerenciador de Riscos de Projetos'}
      mode={mode}
      setMode={setMode}
      getGoogleOAuthURl={getGoogleOAuthURl}
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
      <ForgotPassword
        error={error}
        mode={mode}
        user={user}
        setUser={setUser}
        type={type}
        setType={setType}
        sentToken={sentToken}
        setSentToken={setSentToken}
        sendEmail={sendEmail}
        verifyToken={verifyToken}
        updatePassword={updatePassword}
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
