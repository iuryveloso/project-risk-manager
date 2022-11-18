import { ReactElement, RefObject } from 'react'
import { useRouter } from 'next/router'
import ExportMain from '@components/risk/export/Main'
import ExportAction from '@components/risk/export/Action'
import ExportTask from '@components/risk/export/Task/Task'
import { checkShieldIcon, documentIcon, leftArrowIcon } from '@components/icons'
import { RiskInterface, chartRefInterface } from '@interfaces/riskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import { ActionInterface } from '@interfaces/actionInterfaces'

interface HeaderInterface {
  negativeChartRef: RefObject<chartRefInterface>
  positiveChartRef: RefObject<chartRefInterface>
  risk: RiskInterface
  tasks: TaskInterface[]
  subTasks: TaskInterface[]
  riskTasks: RiskTaskInterface[]
  project: ProjectInterface
  actions: ActionInterface[]
  generatePDF: (
    action: ReactElement,
    task: ReactElement,
    main: ReactElement,
    negativeChartRef: RefObject<chartRefInterface>,
    positiveChartRef: RefObject<chartRefInterface>,
    getChartLevel: (
      impact: number,
      probability: number,
      type: 'negative' | 'positive'
    ) => {
      label: string
      hexColor: string
    }
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
  negativeChartRef,
  positiveChartRef,
  risk,
  tasks,
  subTasks,
  riskTasks,
  generatePDF,
  getChartLevel,
  project,
  actions,
}: HeaderInterface) {
  const router = useRouter()
  return (
    <div className={`flex`}>
      <div className={'w-1/4'}>
        <button
          onClick={() => router.push(`/projects/${risk.projectID}/risks`)}
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
                      text-slate-50 px-3 py-2 mt-2 rounded-lg mr-1
                      flex flex-grow justify-center
                      bg-rose-600 hover:bg-rose-700 
                      dark:bg-rose-500 dark:hover:bg-rose-600
                  `}
          onClick={() =>
            generatePDF(
              <ExportAction actions={actions} />,
              <ExportTask
                risk={risk}
                tasks={tasks}
                subTasks={subTasks}
                riskTasks={riskTasks}
              />,
              <ExportMain risk={risk} project={project} />,
              negativeChartRef,
              positiveChartRef,
              getChartLevel
            )
          }
        >
          <div className={'flex'}>
            <span className={'mr-2'}>{documentIcon}</span>
            <span>Relatório de Risco</span>
          </div>
        </button>
        <button
          className={`
                      focus:border-indigo-700 dark:focus:border-indigo-600
                      text-slate-50 px-3 py-2 mt-2 rounded-lg ml-1
                      flex flex-grow justify-center
                      bg-cyan-600 hover:bg-cyan-700 
                      dark:bg-cyan-500 dark:hover:bg-cyan-600
                  `}
          onClick={() =>
            router.push(`/projects/${risk.projectID}/risks/${risk._id}/actions`)
          }
        >
          <div className={'flex'}>
            <span className={'mr-2'}>{checkShieldIcon}</span>
            <span>Ações do Risco</span>
          </div>
        </button>
      </div>
    </div>
  )
}
