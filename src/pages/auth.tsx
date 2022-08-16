import useAuth from '@data/hook/useAuth'
import Layout from '@components/auth/Layout'
import Login from '@components/auth/Login'
import Singup from '@components/auth/Singup'

export default function Auth() {
  const { error, setMode, setType, mode, setUser, submit, type, user } =
    useAuth()
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
