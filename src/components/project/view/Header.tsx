import { alertCircleIcon, leftArrowIcon, queueList } from '@components/icons'
import { useRouter } from 'next/router'

interface HeaderInterface {
  projectID: string
}

export default function Header({ projectID }: HeaderInterface) {
  const router = useRouter()
  return (
    <div className={`flex`}>
      <div className={'w-1/4'}>
        <button
          onClick={() => router.push('/projects')}
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
      <div className={'flex w-2/4'}>
        <button
          className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    text-slate-50 px-3 py-2 mt-2 rounded-lg
                    flex flex-grow justify-center mr-1
                    bg-teal-600 hover:bg-teal-700 
                    dark:bg-teal-500 dark:hover:bg-teal-600
                `}
          onClick={() => router.push(`/projects/${projectID}/tasks`)}
        >
          <div className={'flex'}>
            <span className={'mr-2'}>{queueList}</span>
            <span>Tarefas do Projeto</span>
          </div>
        </button>
        <button
          className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    text-slate-50 px-3 py-2 mt-2 rounded-lg
                    flex flex-grow justify-center ml-1
                    bg-amber-600 hover:bg-amber-700 
                    dark:bg-amber-500 dark:hover:bg-amber-600
                `}
          onClick={() => router.push(`/projects/${projectID}/risks`)}
        >
          <div className={'flex'}>
            <span className={'mr-2'}>{alertCircleIcon}</span>
            <span>Riscos do Projeto</span>
          </div>
        </button>
      </div>
    </div>
  )
}
