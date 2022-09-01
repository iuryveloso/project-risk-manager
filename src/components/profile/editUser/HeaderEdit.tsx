import { leftArrowIcon, saveIcon } from '@components/icons'
import { Dispatch, SetStateAction } from 'react'
import Error from '@components/profile/alerts/Error'
import Message from '@components/profile/alerts/Message'

interface HeaderEditInterface {
  mode: 'password' | 'main' | 'edit'
  setMode: Dispatch<SetStateAction<'password' | 'main' | 'edit'>>
  error: string | null
  message: string | null
  update: () => void
}

export default function HeaderEdit({
  mode,
  setMode,
  error,
  message,
  update,
}: HeaderEditInterface) {
  return (
    <div className={mode === 'edit' ? '' : 'hidden'}>
      <div className={'flex'}>
        <div className={'w-1/3'}>
          <button
            onClick={() => setMode('main')}
            className={`
                            focus:border-indigo-700 dark:focus:border-indigo-600
                            bg-red-700 text-slate-50 px-3 py-2  mt-2 mr-1 
                            rounded-lg hover:bg-red-800
                            `}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{leftArrowIcon}</span>
              <span>Voltar</span>
            </div>
          </button>
        </div>
        <div className={'flex justify-center w-1/3'}>
          <Error error={error} />
          <Message message={message} />
        </div>
        <div className={'flex justify-end w-1/3'}>
          <button
            onClick={() => {
              update()
              setMode('main')
            }}
            className={`
                            focus:border-indigo-700 dark:focus:border-indigo-600
                            bg-green-700 text-slate-50 px-3 py-2  mt-2 ml-1
                            rounded-lg hover:bg-green-800
                            `}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{saveIcon}</span>
              <span>Alterar</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
