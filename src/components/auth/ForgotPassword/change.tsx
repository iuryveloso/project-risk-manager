import { dontLookIcon, lookIcon } from '@components/icons'
import UserInterface from '@interfaces/userInterfaces'
import { Dispatch, SetStateAction } from 'react'

interface ChangeInterface {
  user: UserInterface
  setUser: Dispatch<SetStateAction<UserInterface>>
  updatePassword: () => Promise<void>
  type: string
  setType: Dispatch<SetStateAction<'password' | 'text'>>
}

export default function Change({
  user,
  setUser,
  updatePassword,
  type,
  setType,
}: ChangeInterface) {
  return (
    <div>
      <div className={'flex flex-col mt-3'}>
        <label className={'text-slate-700'}>Senha</label>
        <div className={'flex mt-1'}>
          <input
            type={type}
            onKeyDown={(e) => {
              return e.key === 'Enter' ? updatePassword() : false
            }}
            value={user?.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder={'Digite sua senha'}
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
      <div className={'flex flex-col mt-3'}>
        <label className={'text-slate-700'}>Confirmar Senha</label>
        <div className={'flex mt-1'}>
          <input
            type={type}
            onKeyDown={(e) => {
              return e.key === 'Enter' ? updatePassword() : false
            }}
            value={user?.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            placeholder={'Digite novamente sua senha'}
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
        onClick={updatePassword}
        className={` 
                w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                px-3 py-2 mt-6
            `}
      >
        Alterar Senha
      </button>
    </div>
  )
}
