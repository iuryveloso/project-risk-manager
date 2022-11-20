import { checkIcon, docLookIcon, xmarkIcon } from '@components/icons'
import { RiskInterface } from '@interfaces/riskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SubTaskInterface {
  taskID: string
  projectID: string
  risk: RiskInterface
  riskTasks: RiskTaskInterface[]
  saveRiskTask: (riskTask: RiskTaskInterface) => void
  deleteRiskTask: (riskTask: RiskTaskInterface) => void
}

export default function Risk({
  taskID,
  projectID,
  risk,
  riskTasks,
  saveRiskTask,
  deleteRiskTask,
}: SubTaskInterface) {
  const [saveORDelete, setSaveORDelete] = useState<'save' | 'delete'>('save')
  useEffect(() => {
    setSaveORDelete(
      riskTasks.filter((riskTask) =>
        riskTask.riskID.includes(risk._id as string)
      ).length > 0
        ? 'delete'
        : 'save'
    )
  }, [riskTasks])
  return (
    <li>
      <div className={'flex flex-col'}>
        <div
          className={
            'flex items-center bg-slate-300 dark:bg-slate-600 px-2 py-2 my-1 rounded-md '
          }
        >
          <div className={'flex-grow'}>{risk.title}</div>
          <Link href={`/projects/${projectID}/risks/${risk._id}`}>
            <a target={'_blank'}>
              <button
                className={`
                              text-cyan-600 hover:bg-slate-200 hover:text-cyan-700 rounded-lg mr-1
                              dark:text-cyan-400 dark:hover:bg-slate-800 dark:hover:text-cyan-200 py-1 px-2
                          `}
              >
                <div className={'flex'}>
                  <span className={'mr-1'}>{docLookIcon}</span>
                  <span>Detalhes</span>
                </div>
              </button>
            </a>
          </Link>
          {saveORDelete === 'save' ? (
            <button
              onClick={() => {
                saveRiskTask({ taskID, riskID: risk._id as string })
                setSaveORDelete('delete')
              }}
              className={`
                        text-emerald-600 hover:bg-slate-200 hover:text-emerald-700 rounded-lg ml-1
                        dark:text-emerald-400 dark:hover:bg-slate-800 dark:hover:text-emerald-200 py-1 px-2
                      `}
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{checkIcon}</span>
                <span>Adicionar</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                deleteRiskTask({ taskID, riskID: risk._id as string })
                setSaveORDelete('save')
              }}
              className={`
                        text-red-600 hover:bg-slate-200 hover:text-red-700 rounded-lg ml-1
                        dark:text-red-500 dark:hover:bg-slate-800 dark:hover:text-red-400 py-1 px-2
                      `}
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{xmarkIcon}</span>
                <span>Remover</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </li>
  )
}
