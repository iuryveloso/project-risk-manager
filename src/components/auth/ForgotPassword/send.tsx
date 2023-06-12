import UserInterface from '@interfaces/userInterfaces'
import { Dispatch, SetStateAction } from 'react'

interface SendInterface {
  setInnerMode: Dispatch<SetStateAction<'send' | 'verify' | 'change'>>
  user: UserInterface
  setUser: Dispatch<SetStateAction<UserInterface>>
  sendEmail: () => void
}

export default function Send({
  setInnerMode,
  user,
  setUser,
  sendEmail,
}: SendInterface) {
  function sendEmailClick() {
    sendEmail()
    setInnerMode('verify')
  }
  return (
    <div>
      <div className={'flex flex-col mt-3'}>
        <label className={'text-slate-700'}>
          Digite o Email usado no Cadastro
        </label>
        <input
          type={'email'}
          value={user?.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onKeyDown={(e) => {
            return e.key === 'Enter' ? sendEmailClick() : false
          }}
          placeholder={'seu.email@email.com'}
          required
          className={`
                  px-3 py-2 rounded-lg bg-slate-100 mt-1 text-slate-700
                  border border-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white
              `}
        />
      </div>
      <button
        onClick={sendEmailClick}
        className={` 
                w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                px-3 py-2 mt-6
            `}
      >
        Enviar Token
      </button>
    </div>
  )
}
