import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import useUser from '@data/hook/useUser'
import UserInterface, { empty } from '@interfaces/userInterfaces'
import UserData from '@components/profile/main/UserData'
import Header from '@components/profile/main/Header'
import AvatarImage from '@components/profile/main/AvatarImage'
import EditUser from '@components/profile/editUser/EditUser'
import HeaderEdit from '@components/profile/editUser/HeaderEdit'
import HeaderPassword from '@components/profile/editPassword/HeaderPassword'
import EditPassword from '@components/profile/editPassword/EditPassword'

export default function Profile() {
  const [mode, setMode] = useState<'main' | 'edit' | 'password'>('main')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [user, setUser] = useState<UserInterface>(empty())

  const { getUser, updateAvatar, updateUser, updatePassword } = useUser({
    user,
    setUser,
    setMessage,
    setError,
    setMode,
  })

  useEffect(() => {
    getUser()
  }, [mode])

  return (
    <Layout
      page={'Perfil'}
      title={'Perfil do Usuário'}
      contentHeader={
        <>
          <Header
            mode={mode}
            setMode={setMode}
            error={error}
            message={message}
          />
          <HeaderEdit
            mode={mode}
            setMode={setMode}
            error={error}
            message={message}
            update={updateUser}
          />
          <HeaderPassword
            mode={mode}
            setMode={setMode}
            error={error}
            message={message}
            updatePassword={updatePassword}
          />
        </>
      }
    >
      <div
        className={`
        w-full flex-grow rounded-t-lg
        bg-slate-200 dark:bg-slate-700 p-4 
        `}
      >
        <div className={'flex'}>
          <AvatarImage updateAvatar={updateAvatar} user={user} />
          <div className={'flex flex-col flex-grow ml-5'}>
            <h1 className={'font-medium text-2xl mb-3'}>Dados Pessoais</h1>

            <UserData user={user} mode={mode} />
            <EditUser
              user={user}
              setUser={setUser}
              mode={mode}
              update={updateUser}
            />
            <EditPassword
              user={user}
              setUser={setUser}
              mode={mode}
              updatePassword={updatePassword}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
