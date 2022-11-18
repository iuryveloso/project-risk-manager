import { RiskInterface } from '@interfaces/riskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import Risk from '@components/task/risk/Risk'

interface FormInterface {
  task: TaskInterface
  riskTasks: RiskTaskInterface[]
  risks: RiskInterface[]
  saveRiskTask: (riskTask: RiskTaskInterface) => void
  deleteRiskTask: (riskTask: RiskTaskInterface) => void
}

export default function Form({
  task,
  riskTasks,
  risks,
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
          {risks.map((risk, index) => {
            return (
              <Risk
                key={index}
                taskID={task._id as string}
                risk={risk}
                riskTasks={riskTasks}
                saveRiskTask={saveRiskTask}
                deleteRiskTask={deleteRiskTask}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
