import { checkIcon, xmarkIcon } from '@components/icons'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { useEffect, useState } from 'react'

interface SubTaskInterface {
  riskID: string
  task: TaskInterface
  tasks: TaskInterface[]
  subTasks: TaskInterface[]
  riskTasks: RiskTaskInterface[]
  saveRiskTask: (riskTask: RiskTaskInterface) => void
  deleteRiskTask: (riskTask: RiskTaskInterface) => void
}

export default function Task({
  riskID,
  task,
  tasks,
  riskTasks,
  subTasks,
  saveRiskTask,
  deleteRiskTask,
}: SubTaskInterface) {
  const [saveORDelete, setSaveORDelete] = useState<'save' | 'delete'>('save')
  useEffect(() => {
    setSaveORDelete(
      riskTasks.filter((riskTask) =>
        riskTask.taskID.includes(task._id as string)
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
            'flex items-center bg-slate-300 dark:bg-slate-600 px-2 py-1 my-1 rounded-md '
          }
        >
          <div className={'flex-grow'}>{task.title}</div>
          {saveORDelete === 'save' ? (
            <button
              onClick={() => {
                saveRiskTask({ taskID: task._id as string, riskID })
                setSaveORDelete('delete')
              }}
              className={`
                          focus:border-indigo-700 dark:focus:border-indigo-600
                          bg-emerald-700 text-slate-50 px-2 py-1 mt-1
                          rounded-lg hover:bg-emerald-800
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
                deleteRiskTask({ taskID: task._id as string, riskID })
                setSaveORDelete('save')
              }}
              className={`
                            focus:border-indigo-700 dark:focus:border-indigo-600
                            bg-rose-700 text-slate-50 px-2 py-1  mt-1
                            rounded-lg hover:bg-rose-800
                            `}
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{xmarkIcon}</span>
                <span>Remover</span>
              </div>
            </button>
          )}
        </div>
        <div className={'ml-7'}>
          <ul>
            {tasks.map((task, index) => {
              const riskSubTasks = subTasks.filter((subTask) =>
                subTask.parentTaskID?.includes(task._id as string)
              )
              return (
                <Task
                  key={index}
                  riskID={riskID}
                  task={task}
                  riskTasks={riskTasks}
                  subTasks={subTasks}
                  tasks={riskSubTasks}
                  saveRiskTask={saveRiskTask}
                  deleteRiskTask={deleteRiskTask}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </li>
  )
}
