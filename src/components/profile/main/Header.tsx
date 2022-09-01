import { editIcon, lockIcon } from '@components/icons'
import { Dispatch, SetStateAction } from 'react'
import Error from '@components/profile/alerts/Error'
import Message from '@components/profile/alerts/Message'

interface HeaderInterface {
  mode: 'password' | 'main' | 'edit'
  setMode: Dispatch<SetStateAction<'password' | 'main' | 'edit'>>
  error: string | null
  message: string | null
}

export default function Header({
  mode,
  setMode,
  error,
  message,
}: HeaderInterface) {
  return (
    <div className={mode === 'main' ? '' : 'hidden'}>
      <div className={'flex justify-end'}>
        <div className={'flex justify-center w-1/3'}>
          <Error error={error} />
          <Message message={message} />
        </div>
        <div className={'flex justify-end w-1/3'}>
          <button
            onClick={() => setMode('edit')}
            className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    bg-blue-700 text-slate-50 px-3 py-2  mt-2 mr-1 
                    rounded-lg hover:bg-blue-800
                  `}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{editIcon}</span>
              <span>Editar Dados Pessoais</span>
            </div>
          </button>
          <button
            onClick={() => setMode('password')}
            className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    bg-orange-600 text-slate-50 px-3 py-2  mt-2 ml-1
                    rounded-lg hover:bg-orange-700
                  `}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{lockIcon}</span>
              <span>Alterar Senha</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
