import ExportMain from '@components/project/export/Main'
import ExportRisk from '@components/project/export/Risk'
import ExportTask from '@components/project/export/Task/Task'

import {
  alertCircleIcon,
  documentIcon,
  leftArrowIcon,
  queueList,
} from '@components/icons'
import Link from 'next/link'
import { ReactElement } from 'react'
import { RiskInterface } from '@interfaces/riskInterfaces'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import UserInterface from '@interfaces/userInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { ActionInterface } from '@interfaces/actionInterfaces'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'

interface HeaderInterface {
  tasks: TaskInterface[]
  subTasks: TaskInterface[]
  project: ProjectInterface
  user: UserInterface
  risks: RiskInterface[]
  actions: ActionInterface[]
  projectID: string
  projectUser: ProjectUserInterface
  generatePDF: (
    risk: ReactElement,
    task: ReactElement,
    main: ReactElement
  ) => void
  getChartLevel: (
    impact: number,
    probability: number,
    type: 'negative' | 'positive'
  ) => {
    label: string
    hexColor: string
  }
}

export default function Header({
  tasks,
  subTasks,
  project,
  user,
  risks,
  actions,
  projectID,
  projectUser,
  generatePDF,
  getChartLevel,
}: HeaderInterface) {
  return (
    <div className={`flex`}>
      <div className={'w-1/5'}>
        <Link href={'/projects'}>
          <button
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
        </Link>
      </div>
      <div className={`flex w-3/5`}>
        <div className={'flex w-1/3'}>
          {projectUser?.functionProject === 'manager' ? (
            <button
              className={`
                          focus:border-indigo-700 dark:focus:border-indigo-600
                          text-slate-50 px-3 py-2 mt-2 rounded-lg mr-1
                          flex flex-grow justify-center
                          bg-rose-600 hover:bg-rose-700 
                          dark:bg-rose-500 dark:hover:bg-rose-600
                          ${
                            projectUser?.functionProject === 'manager'
                              ? ''
                              : 'hidden'
                          }
                      `}
              onClick={() =>
                generatePDF(
                  <ExportRisk
                    getChartLevel={getChartLevel}
                    risks={risks}
                    actions={actions}
                  />,
                  <ExportTask tasks={tasks} subTasks={subTasks} />,
                  <ExportMain project={project} user={user} />
                )
              }
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{documentIcon}</span>
                <span>Relatório de Projeto</span>
              </div>
            </button>
          ) : (
            false
          )}
        </div>
        <div className={'flex w-1/3'}>
          <Link href={`/projects/${projectID}/risks`}>
            <button
              className={`
                        focus:border-indigo-700 dark:focus:border-indigo-600
                        text-slate-50 px-3 py-2 mt-2 rounded-lg
                        flex flex-grow justify-center ml-1
                        bg-amber-600 hover:bg-amber-700 
                        dark:bg-amber-500 dark:hover:bg-amber-600
                    `}
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{alertCircleIcon}</span>
                <span>Riscos do Projeto</span>
              </div>
            </button>
          </Link>
        </div>
        <div className={'flex w-1/3'}>
          {projectUser?.functionProject === 'manager' ? (
            <Link href={`/projects/${projectID}/tasks`}>
              <button
                className={`
                          focus:border-indigo-700 dark:focus:border-indigo-600
                          text-slate-50 px-3 py-2 mt-2 rounded-lg
                          flex flex-grow justify-center mx-1
                          bg-teal-600 hover:bg-teal-700 
                          dark:bg-teal-500 dark:hover:bg-teal-600
                          
                      `}
              >
                <div className={'flex'}>
                  <span className={'mr-2'}>{queueList}</span>
                  <span>Tarefas do Projeto</span>
                </div>
              </button>
            </Link>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  )
}
