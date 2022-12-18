import { RiskInterface } from '@interfaces/riskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import SubTask from '@components/risk/export/Task/SubTask'

interface FormInterface {
  tasks: TaskInterface[]
  subTasks: TaskInterface[]
  riskTasks: RiskTaskInterface[]
  risk: RiskInterface
}

export default function FormTask({
  tasks,
  subTasks,
  riskTasks,
  risk,
}: FormInterface) {
  return (
    <div
      className={'mt-5 text-black'}
      style={{ width: '34rem', fontFamily: 'sans-serif' }}
    >
      <div className={'flex justify-center'}>
        <h3 className={'text-xl'}>Tarefas Vinculadas</h3>
      </div>
      <div className={'mt-3 border border-black'}>
        <ul className={'pb-5'}>
          <li className={'flex text-sm border-b border-black '}>
            <div className={'flex justify-center flex-grow font-bold pl-1'}>
              Tarefas
            </div>
            <div className={'w-20 pb-3 font-bold text-center'}>Vinculado</div>
          </li>
          {tasks.map((task, index) => {
            return (
              <SubTask
                key={index}
                riskID={risk._id as string}
                task={task}
                subTasks={subTasks}
                riskTasks={riskTasks}
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
