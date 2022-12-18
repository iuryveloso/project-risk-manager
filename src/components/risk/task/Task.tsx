import { checkIcon, docLookIcon, xmarkIcon } from '@components/icons'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import Link from 'next/link'

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
  const saveORDelete =
    riskTasks.filter((riskTask) => riskTask.taskID.includes(task._id as string))
      .length > 0
      ? 'delete'
      : 'save'
  return (
    <li>
      <div className={'flex flex-col'}>
        <div
          className={
            'flex items-center bg-slate-300 dark:bg-slate-600 px-2 my-1 rounded-md '
          }
        >
          <div className={'flex-grow'}>{task.title}</div>
          <Link
            href={`/projects/${task.projectID}/tasks/${task._id}/${
              task.parentTaskID ? '1' : '2'
            }/view`}
          >
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
                saveRiskTask({ taskID: task._id as string, riskID })
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
                deleteRiskTask({ taskID: task._id as string, riskID })
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
        <div className={''}>
          <ul
            className={
              'ml-4 pl-3 border-l border-gray-700 dark:border-gray-400'
            }
          >
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
