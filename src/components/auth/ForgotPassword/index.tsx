import Error from '@components/auth/Error'
import UserInterface from '@interfaces/userInterfaces'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Send from '@components/auth/ForgotPassword/send'
import Verify from '@components/auth/ForgotPassword/verify'
import Change from '@components/auth/ForgotPassword/change'

interface LoginInterface {
  error: string | null
  mode: 'login' | 'singup' | 'forgot'
  type: string
  sentToken: string
  setSentToken: Dispatch<SetStateAction<string>>
  setType: Dispatch<SetStateAction<'password' | 'text'>>
  user: UserInterface
  setUser: Dispatch<SetStateAction<UserInterface>>
  sendEmail: () => void
  verifyToken: () => boolean
  updatePassword: () => Promise<void>
}

export default function Login({
  error,
  mode,
  type,
  setType,
  sentToken,
  setSentToken,
  user,
  setUser,
  sendEmail,
  verifyToken,
  updatePassword,
}: LoginInterface) {
  const [innerMode, setInnerMode] = useState<'send' | 'verify' | 'change'>(
    'send'
  )
  useEffect(() => {
    setInnerMode('send')
  }, [mode])

  return (
    <div className={`${mode === 'forgot' ? '' : 'hidden'}`}>
      <Error error={error} />

      {innerMode === 'send' ? (
        <Send
          setInnerMode={setInnerMode}
          user={user}
          setUser={setUser}
          sendEmail={sendEmail}
        />
      ) : (
        false
      )}
      {innerMode === 'verify' ? (
        <Verify
          setInnerMode={setInnerMode}
          sentToken={sentToken}
          setSentToken={setSentToken}
          verifyToken={verifyToken}
        />
      ) : (
        false
      )}
      {innerMode === 'change' ? (
        <Change
          user={user}
          setUser={setUser}
          type={type}
          setType={setType}
          updatePassword={updatePassword}
        />
      ) : (
        false
      )}
    </div>
  )
}
