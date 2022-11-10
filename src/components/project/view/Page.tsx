import { ProjectInterface } from '@interfaces/projectInterfaces'
import { alertCircleIcon, queueList } from '@components/icons'
import { useRouter } from 'next/router'

interface PageInterface {
  project: ProjectInterface
}

export default function Page({ project }: PageInterface) {
  const router = useRouter()
  return (
    <div
      className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
    >
      <h1></h1>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl font-bold text-center'}> {project.title}</p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl text-justify'}>
          <label className={'font-bold'}>Descrição: </label>
          {project.description}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl'}>
          <label className={'font-bold'}> Início: </label>
          {`${project.begin.split('-')[2]}/${project.begin.split('-')[1]}/${
            project.begin.split('-')[0]
          }`}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl'}>
          <label className={'font-bold'}> Término: </label>
          {`${project.end.split('-')[2]}/${project.end.split('-')[1]}/${
            project.end.split('-')[0]
          }`}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <div className={'flex w-1/2'}>
          <button
            className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    text-slate-50 px-3 py-2 mt-2 rounded-lg
                    flex flex-grow justify-center mr-1
                    bg-teal-600 hover:bg-teal-700 
                    dark:bg-teal-500 dark:hover:bg-teal-600
                `}
            onClick={() => router.push(`/projects/${project._id}/tasks`)}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{queueList}</span>
              <span>Tarefas do Projeto</span>
            </div>
          </button>
        </div>
        <div className={'flex w-1/2'}>
          <button
            className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    text-slate-50 px-3 py-2 mt-2 rounded-lg
                    flex flex-grow justify-center ml-1
                    bg-amber-600 hover:bg-amber-700 
                    dark:bg-amber-500 dark:hover:bg-amber-600
                `}
            onClick={() => router.push(`/projects/${project._id}/risks`)}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{alertCircleIcon}</span>
              <span>Riscos do Projeto</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
