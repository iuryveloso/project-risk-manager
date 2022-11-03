import { plusIcon } from '@components/icons'
import Error from '@components/project/alerts/Error'
import Message from '@components/project/alerts/Message'
import Delete from '@components/project/alerts/Delete'

interface HeaderInterface {
  mode: 'main' | 'create' | 'edit' | 'view'
  newProject: () => void
  search: (searchTag: string) => void
  error: string | null
  message: string | null
  deleteMessage: string | null
  projectsLength: number
  allProjectsLength: number
}

export default function Header({
  newProject,
  search,
  mode,
  error,
  message,
  deleteMessage,
  projectsLength,
  allProjectsLength,
}: HeaderInterface) {
  return (
    <div className={mode === 'main' ? '' : 'hidden'}>
      <div className={`flex`}>
        <div className={'w-1/3'}>
          <button
            className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    text-slate-50 px-3 py-2 mt-2 rounded-lg
                    bg-green-600 hover:bg-green-700
                    dark:bg-green-500 dark:hover:bg-green-600
                `}
            onClick={() => newProject()}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{plusIcon}</span>
              <span>Novo Projeto</span>
            </div>
          </button>
        </div>
        <div className={'flex justify-center items-end w-1/3'}>
          <Error error={error} />
          <Message message={message} />
          <Delete deleteMessage={deleteMessage} />
          <div
            className={`italic font-semibold ${
              !(error || message || deleteMessage) ? '' : 'hidden'
            }`}
          >
            Mostrando {projectsLength} de {allProjectsLength} Projetos
            Cadastrados
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
            type="text"
            placeholder="Pesquisar..."
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
