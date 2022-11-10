import { RiskInterface } from '@interfaces/riskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import Task from '@components/risk/task/Task'

interface FormInterface {
  tasks: TaskInterface[]
  subTasks: TaskInterface[]
  riskTasks: RiskTaskInterface[]
  risk: RiskInterface
  saveRiskTask: (riskTask: RiskTaskInterface) => void
  deleteRiskTask: (riskTask: RiskTaskInterface) => void
}

export default function Form({
  tasks,
  subTasks,
  riskTasks,
  risk,
  saveRiskTask,
  deleteRiskTask,
}: FormInterface) {
  return (
    <div
      className={`
        flex flex-col justify-center
    `}
    >
      <div
        className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
      >
        <ul>
          {tasks.map((task, index) => {
            return (
              <Task
                key={index}
                riskID={risk._id as string}
                task={task}
                subTasks={subTasks}
                riskTasks={riskTasks}
                saveRiskTask={saveRiskTask}
                deleteRiskTask={deleteRiskTask}
                tasks={subTasks.filter((subTask) =>
                  subTask.parentTaskID?.includes(task._id as string)
                )}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
