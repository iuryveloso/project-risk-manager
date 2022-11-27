import { leftArrowIcon, plusIcon } from '@components/icons'
import Error from '@components/task/alerts/Error'
import Message from '@components/task/alerts/Message'
import Delete from '@components/task/alerts/Delete'
import Link from 'next/link'

interface HeaderInterface {
  mode: 'main' | 'create' | 'edit' | 'view'
  newTask: () => void
  back: () => string
  search: (searchTag: string) => void
  error: string | null
  message: string | null
  deleteMessage: string | null
  tasksLength: number
  allTasksLength: number
}

export default function Header({
  newTask,
  back,
  search,
  mode,
  error,
  message,
  deleteMessage,
  tasksLength,
  allTasksLength,
}: HeaderInterface) {
  return (
    <div className={mode === 'main' ? '' : 'hidden'}>
      <div className={`flex`}>
        <div className={'w-1/3'}>
          <Link href={back()}>
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
            onClick={() => newTask()}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{plusIcon}</span>
              <span>Nova Tarefa</span>
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
            Mostrando {tasksLength} de {allTasksLength} Tarefas Cadastradas
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
    </div>
  )
}
