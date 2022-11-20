import { TaskInterface } from '@interfaces/taskInterfaces'

interface SubTaskInterface {
  task: TaskInterface
  tasks: TaskInterface[]
  subTasks: TaskInterface[]
}

export default function SubTask({ task, tasks, subTasks }: SubTaskInterface) {
  return (
    <li>
      <div className={'flex flex-col text-xs'}>
        <div className={'px-2 pb-7 pt-2'}>
          <div className={'flex px-2 pb-1'}>
            <label className={'font-bold mr-2'}>Tarefa:</label>
            <span>{task.title}</span>
          </div>
          <div className={'flex px-2 pb-1'}>
            <label className={'font-bold mr-2'}>Descrição: </label>
            <div className={'flex flex-col'}>
              {task.description.split('\n').map((descriptionLine, index) => (
                <div key={index}>{descriptionLine}</div>
              ))}
            </div>
          </div>
          <div className={'flex px-2 pb-1'}>
            <label className={'font-bold mr-2'}>Responsável:</label>
            <span>{task.responsible}</span>
          </div>
          <div className={'flex'}>
            <div className={'flex px-2 pb-1 mr-2'}>
              <label className={'font-bold mr-2'}>Início: </label>
              <span className={'text-justify'}>
                {`${task.begin.split('-')[2]} / ${task.begin.split('-')[1]} / ${
                  task.begin.split('-')[0]
                }`}
              </span>
            </div>
            <div className={'flex px-2 pb-1 ml-2'}>
              <label className={'font-bold mr-2'}>Término: </label>
              <span className={'text-justify'}>{`${task.end.split('-')[2]} / ${
                task.end.split('-')[1]
              } / ${task.end.split('-')[0]}`}</span>
            </div>
          </div>
        </div>
        <div className={''}>
          <ul className={'ml-4 pl-4 border-l border-gray-400'}>
            {tasks.map((task, index) => {
              const riskSubTasks = subTasks.filter((subTask) =>
                subTask.parentTaskID?.includes(task._id as string)
              )
              return (
                <SubTask
                  key={index}
                  task={task}
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
