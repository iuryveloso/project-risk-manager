import { leftArrowIcon, saveIcon } from '@components/icons'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import Error from '@components/project/alerts/Error'
import Message from '@components/project/alerts/Message'

interface HeaderInterface {
  mode: 'main' | 'create' | 'edit' | 'view'
  switchMode: (mode: 'main' | 'create' | 'edit' | 'view') => void
  project: ProjectInterface
  saveProject: (project: ProjectInterface) => void
  error: string | null
  message: string | null
}

export default function Header({
  mode,
  switchMode,
  project,
  saveProject,
  error,
  message,
}: HeaderInterface) {
  return (
    <div className={mode === 'edit' ? '' : 'hidden'}>
      <div className={`flex`}>
        <div className={'w-1/3'}>
          <button
            onClick={() => switchMode('main')}
            className={`
                            focus:border-indigo-700 dark:focus:border-indigo-600
                            bg-red-700 text-slate-50 px-3 py-2  mt-2
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
            onClick={() => saveProject(project)}
            className={`
                            focus:border-indigo-700 dark:focus:border-indigo-600
                            bg-green-700 text-slate-50 px-3 py-2 
                            rounded-lg hover:bg-green-800 mt-2 ml-1
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
