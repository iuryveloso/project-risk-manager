import { dontLookIcon, lookIcon } from '@components/icons'
import Error from '@components/auth/Error'
import UserInterface from '@interfaces/userInterfaces'
import { Dispatch, SetStateAction } from 'react'

interface LoginInterface {
  error: string | null
  mode: 'login' | 'singup' | 'forgot'
  type: string
  setType: Dispatch<SetStateAction<'password' | 'text'>>
  user: UserInterface
  setUser: Dispatch<SetStateAction<UserInterface>>
  submit: () => void
}

export default function Login({
  error,
  mode,
  type,
  setType,
  user,
  setUser,
  submit,
}: LoginInterface) {
  return (
    <div className={`${mode === 'login' ? '' : 'hidden'}`}>
      <Error error={error} />

      <div className={'flex flex-col mt-3'}>
        <label className={'text-slate-700'}>Email</label>
        <input
          type={'email'}
          value={user?.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onKeyDown={(e) => {
            return e.key === 'Enter' ? submit() : false
          }}
          placeholder={'seu.email@email.com'}
          required
          className={`
                  px-3 py-2 rounded-lg bg-slate-100 mt-1 text-slate-700
                  border border-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white
              `}
        />
      </div>
      <div className={'flex flex-col mt-3'}>
        <label className={'text-slate-700'}>Senha</label>
        <div className={'flex mt-1'}>
          <input
            type={type}
            value={user?.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            onKeyDown={(e) => {
              return e.key === 'Enter' ? submit() : false
            }}
            placeholder={'Digite sua senha'}
            required
            className={`
                    flex-grow px-3 py-2 rounded-l-lg bg-slate-100
                    border-y border-l border-slate-300 text-slate-700
                    focus:border-r focus:outline-none focus:border-indigo-500 focus:bg-white 
                `}
          />
          <button
            onClick={() => setType(type === 'password' ? 'text' : 'password')}
            className={`
                      rounded-r-lg bg-slate-100 text-slate-700
                      border-y border-r border-slate-300 px-3 py-2
                      hover:bg-slate-200
                  `}
          >
            {type === 'password' ? lookIcon : dontLookIcon}
          </button>
        </div>
      </div>
      <button
        onClick={submit}
        className={` 
                w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                px-3 py-2 mt-6
            `}
      >
        Entrar
      </button>
    </div>
  )
}
