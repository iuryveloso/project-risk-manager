import { leftArrowIcon, plusIcon } from '@components/icons'
import Error from '@components/action/alerts/Error'
import Message from '@components/action/alerts/Message'
import Delete from '@components/action/alerts/Delete'
import Link from 'next/link'

interface HeaderInterface {
  mode: 'main' | 'create' | 'edit' | 'view'
  newAction: () => void
  search: (searchTag: string) => void
  error: string | null
  message: string | null
  deleteMessage: string | null
  actionsLength: number
  allActionsLength: number
  riskID: string
  projectID: string
}

export default function Header({
  newAction,
  search,
  mode,
  error,
  message,
  deleteMessage,
  actionsLength,
  allActionsLength,
  riskID,
  projectID,
}: HeaderInterface) {
  return (
    <>
      {mode === 'main' ? (
        <div className={`flex`}>
          <div className={'w-1/3'}>
            <Link href={`/projects/${projectID}/risks/${riskID}`}>
              <button
                className={`
                      focus:border-indigo-700 dark:focus:border-indigo-600
                      text-slate-50 px-3 py-2 mt-2 mr-2 rounded-lg
                      bg-red-700 hover:bg-red-800
                  `}
              >
                <div className={'flex'}>
                  <span className={'mr-2'}>{leftArrowIcon}</span>
                  <span>Voltar</span>
                </div>
              </button>
            </Link>
            <button
              className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    text-slate-50 px-3 py-2 mt-2 rounded-lg
                    bg-green-600 hover:bg-green-700
                    dark:bg-green-500 dark:hover:bg-green-600
                `}
              onClick={() => newAction()}
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{plusIcon}</span>
                <span>Nova Ação</span>
              </div>
            </button>
          </div>
          <div className={'flex justify-center items-end w-1/3'}>
            <Error error={error} />
            <Message message={message} />
            <Delete deleteMessage={deleteMessage} />
            <div
              className={`italic font-semibold text-slate-900 dark:text-slate-200 ${
                !(error || message || deleteMessage) ? '' : 'hidden'
              }`}
            >
              Mostrando {actionsLength} de {allActionsLength} Ações Cadastradas
            </div>
          </div>
          <div className={'flex justify-end w-1/3'}>
            <input
              className={`
                      px-4 py-2 rounded-md border focus:outline-none mt-2 ml-5
                      bg-slate-100 dark:bg-slate-600
                      border-slate-500 dark:border-slate-200
                      text-slate-900 dark:text-slate-100
                      focus:bg-white dark:focus:bg-slate-500 
                      focus:border-indigo-700 dark:focus:border-indigo-600 

                  `}
              type={'search'}
              placeholder={'Filtrar...'}
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div>
      ) : (
        false
      )}
    </>
  )
}
