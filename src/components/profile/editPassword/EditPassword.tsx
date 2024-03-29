import { dontLookIcon, lookIcon } from '@components/icons'
import UserInterface from '@interfaces/userInterfaces'
import { Dispatch, SetStateAction, useState } from 'react'

interface EditPasswordInterface {
  user: UserInterface
  setUser: Dispatch<SetStateAction<UserInterface>>
  mode: 'main' | 'edit' | 'password'
  updatePassword: () => Promise<void>
}

export default function EditPassword({
  setUser,
  user,
  mode,
  updatePassword,
}: EditPasswordInterface) {
  const [type, setType] = useState<'text' | 'password'>('password')

  const classnameInput = `
    px-3 py-2 rounded-l-lg border-y border-l focus:outline-none my-1
    bg-slate-100 dark:bg-slate-600 flex-grow 
    border-slate-500 dark:border-slate-200
    text-slate-900 dark:text-slate-100
    focus:bg-white dark:focus:bg-slate-500 
    focus:border-indigo-700 dark:focus:border-indigo-600
  `
  const classNameButton = `
    rounded-r-lg px-3 py-2 my-1
    bg-slate-600 text-slate-200 dark:bg-slate-200 dark:text-slate-800
    border-y border-r border-slate-600 dark:border-slate-200
    hover:bg-slate-700 dark:hover:bg-slate-300 
  `

  return (
    <div className={`${mode === 'password' ? '' : 'hidden'}`}>
      <div className={'flex-grow'}>
        <div className={'flex flex-col mb-3'}>
          <label>Senha Atual </label>
          <div className={'flex '}>
            <input
              type={type}
              className={classnameInput}
              value={user?.password ?? ''}
              onKeyDown={(e) => {
                return e.key === 'Enter' ? updatePassword() : false
              }}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              onClick={() => setType(type === 'password' ? 'text' : 'password')}
              className={classNameButton}
            >
              {type === 'password' ? lookIcon : dontLookIcon}
            </button>
          </div>
        </div>
        <div className={'flex flex-col mb-3'}>
          <label>Nova Senha </label>
          <div className={'flex '}>
            <input
              type={type}
              className={classnameInput}
              value={user?.newPassword ?? ''}
              onKeyDown={(e) => {
                return e.key === 'Enter' ? updatePassword() : false
              }}
              onChange={(e) =>
                setUser({ ...user, newPassword: e.target.value })
              }
            />
            <button
              onClick={() => setType(type === 'password' ? 'text' : 'password')}
              className={classNameButton}
            >
              {type === 'password' ? lookIcon : dontLookIcon}
            </button>
          </div>
        </div>
        <div className={'flex flex-col'}>
          <label>Confirmar Senha </label>
          <div className={'flex '}>
            <input
              type={type}
              className={classnameInput}
              value={user?.confirmPassword ?? ''}
              onKeyDown={(e) => {
                return e.key === 'Enter' ? updatePassword() : false
              }}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <button
              onClick={() => setType(type === 'password' ? 'text' : 'password')}
              className={classNameButton}
            >
              {type === 'password' ? lookIcon : dontLookIcon}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
