import { checkIcon, xmarkIcon } from '@components/icons'
import { RiskInterface } from '@interfaces/riskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { useEffect, useState } from 'react'

interface SubTaskInterface {
  taskID: string
  risk: RiskInterface
  riskTasks: RiskTaskInterface[]
  saveRiskTask: (riskTask: RiskTaskInterface) => void
  deleteRiskTask: (riskTask: RiskTaskInterface) => void
}

export default function Risk({
  taskID,
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
          {saveORDelete === 'save' ? (
            <button
              onClick={() => {
                saveRiskTask({ taskID, riskID: risk._id as string })
                setSaveORDelete('delete')
              }}
              className={`
                          focus:border-indigo-700 dark:focus:border-indigo-600
                          bg-emerald-700 text-slate-50 px-2
                          rounded-md hover:bg-emerald-800
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
                            focus:border-indigo-700 dark:focus:border-indigo-600
                            bg-rose-700 text-slate-50 px-2
                            rounded-md hover:bg-rose-800
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
