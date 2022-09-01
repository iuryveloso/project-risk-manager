import UserInterface from '@interfaces/userInterface'

interface UserDataInterface {
  user: UserInterface
  mode: 'main' | 'edit' | 'password'
}

export default function UserData({ user, mode }: UserDataInterface) {
  const classname = `
    px-3 py-2 rounded-lg  focus:outline-none my-1
    bg-slate-200 dark:bg-slate-700 text-lg
    text-slate-900 dark:text-slate-100
  `

  return (
    <div className={`${mode === 'main' ? '' : 'hidden'}`}>
      <div className={'flex items-center'}>
        <label className={'text-xl mr-2 my-2'}>Email: </label>
        <span className={classname}>{user.email}</span>
      </div>
      <div className={'flex items-center'}>
        <label className={'text-xl mr-2 my-2'}>Nome: </label>
        <span className={classname}>{user.firstName}</span>
      </div>
      <div className={'flex items-center'}>
        <label className={'text-xl mr-2 my-2'}>Sobrenome: </label>
        <span className={classname}>{user.lastName}</span>
      </div>
    </div>
  )
}
