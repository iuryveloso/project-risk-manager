import {
  dontLookIcon,
  leftArrowIcon,
  lookIcon,
  rightArrowIcon,
} from '@components/icons'
import Error from '@components/auth/Error'
import UserInterface from '@interfaces/userInterface'
import { Dispatch, SetStateAction, useState } from 'react'

interface SingupInterface {
  error: string | null
  mode: string
  type: string
  setType: Dispatch<SetStateAction<'password' | 'text'>>
  user: UserInterface
  setUser: Dispatch<SetStateAction<UserInterface>>
  submit: () => Promise<void>
}

export default function Singup({
  error,
  mode,
  type,
  setType,
  user,
  setUser,
  submit,
}: SingupInterface) {
  const [page, setPage] = useState<'personal' | 'credentials'>('personal')
  return (
    <div className={`${mode === 'singup' ? '' : 'hidden'} `}>
      <Error error={error} />
      <div className={'flex text-slate-100 mt-2'}>
        <div className={'flex w-1/3'}>
          <button
            className={`rounded-lg py-1 px-2 ${
              page === 'personal'
                ? 'hidden'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            onClick={() => setPage('personal')}
          >
            {leftArrowIcon}
          </button>
        </div>
        <div
          className={'flex items-center justify-center text-slate-700 w-1/3'}
        >
          <span className={'py-1 px-2'}>
            {page === 'personal' ? '1/2' : '2/2'}
          </span>
        </div>
        <div className={'flex w-1/3 justify-end'}>
          <button
            className={`rounded-lg py-1 px-2 ${
              page === 'credentials'
                ? 'hidden'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            onClick={() => setPage('credentials')}
          >
            {rightArrowIcon}
          </button>
        </div>
      </div>
      <div className={page === 'personal' ? '' : 'hidden'}>
        <div className={'flex flex-col mt-3'}>
          <label className={'text-slate-700'}>Nome</label>
          <input
            type={'text'}
            value={user?.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder={'Digite o seu nome'}
            className={`
                      px-3 py-2 rounded-lg bg-slate-100 mt-1 text-slate-700
                      border border-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white
                  `}
          />
        </div>
        <div className={'flex flex-col mt-3'}>
          <label className={'text-slate-700'}>Sobrenome</label>
          <input
            type={'text'}
            value={user?.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            placeholder={'Digite o Seu sobrenome'}
            className={`
                      px-3 py-2 rounded-lg bg-slate-100 mt-1 text-slate-700
                      border border-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white
                  `}
          />
        </div>
        <div className={'flex flex-col mt-3'}>
          <div className={'flex'}>
            <label className={'text-slate-700 mb-1 flex-grow'}>
              Imagem de Perfil
            </label>
            <label className={'flex items-end text-red-400 text-sm'}>
              {' '}
              *PNG ou JPG{' '}
            </label>
          </div>
          <div>
            <label htmlFor={'file_input'} className={'flex text-slate-700 '}>
              <div
                className={
                  'flex items-center rounded-l-lg px-3 bg-indigo-600 hover:bg-indigo-700 text-slate-100 cursor-pointer'
                }
              >
                Escolher Arquivo
              </div>
              <div
                className={`
                        px-3 py-2 rounded-r-lg bg-slate-100  text-gray-400 flex-grow
                        border border-slate-300 focus:outline-none focus:border-indigo-500 
                      `}
              >
                {user?.avatar?.name === undefined
                  ? 'Nenhuma Imagem Selecionada'
                  : user?.avatar?.name}
              </div>
            </label>
            <input
              type={'file'}
              id={'file_input'}
              accept={'image/png, image/jpeg'}
              onChange={(e) =>
                e.target.files !== null
                  ? setUser({
                      ...user,
                      avatar: e.target.files[0],
                    })
                  : false
              }
              className={'hidden'}
            />
          </div>
        </div>
      </div>
      <div className={page === 'credentials' ? '' : 'hidden'}>
        <div className={'flex flex-col mt-3'}>
          <label className={'text-slate-700'}>Email</label>
          <input
            type={'email'}
            value={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder={'seu.email@email.com'}
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
      </div>
      <button
        onClick={submit}
        className={` 
                w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                px-3 py-2 mt-6
            `}
      >
        Cadastrar
      </button>
    </div>
  )
}
