import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'

interface SubTaskInterface {
  riskID: string
  task: TaskInterface
  tasks: TaskInterface[]
  subTasks: TaskInterface[]
  riskTasks: RiskTaskInterface[]
}

export default function Task({
  riskID,
  task,
  tasks,
  riskTasks,
  subTasks,
}: SubTaskInterface) {
  return (
    <li>
      <div className={'flex flex-col text-xs'}>
        <div className={'flex px-2 pb-1'}>
          <div className={'flex-grow '}>{task.title}</div>
          <div className={'w-20  text-center'}>
            {riskTasks.filter((riskTask) =>
              riskTask.taskID.includes(task._id as string)
            ).length > 0 ? (
              <label className={'text-green-600'}>Sim</label>
            ) : (
              <label className={'text-red-600'}>Não</label>
            )}
          </div>
        </div>
        <div className={''}>
          <ul className={'ml-3 pl-1 mt-1 border-l border-gray-400'}>
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
                />
              )
            })}
          </ul>
        </div>
      </div>
    </li>
  )
}
