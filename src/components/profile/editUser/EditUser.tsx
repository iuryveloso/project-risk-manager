import UserInterface from '@interfaces/userInterfaces'
import { Dispatch, SetStateAction } from 'react'

interface EditUserInterface {
  user: UserInterface
  setUser: Dispatch<SetStateAction<UserInterface>>
  mode: 'main' | 'edit' | 'password'
}

export default function EditUser({ setUser, user, mode }: EditUserInterface) {
  const classname = `
    px-3 py-2 rounded-lg border focus:outline-none my-1
    bg-slate-100 dark:bg-slate-600
    border-slate-500 dark:border-slate-200
    text-slate-900 dark:text-slate-100
    focus:bg-white dark:focus:bg-slate-500 
    focus:border-indigo-700 dark:focus:border-indigo-600
  `

  return (
    <div className={`${mode === 'edit' ? '' : 'hidden'}`}>
      <div className={'flex-grow'}>
        <div className={'flex flex-col'}>
          <label>Email </label>
          <input
            type="text"
            className={classname}
            value={user?.email ?? ''}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className={'flex flex-col mt-3'}>
          <label>Nome </label>
          <input
            type="text"
            className={classname}
            value={user?.firstName ?? ''}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>
        <div className={'flex flex-col mt-3'}>
          <label>Sobrenome </label>
          <input
            type="text"
            className={classname}
            value={user?.lastName ?? ''}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
