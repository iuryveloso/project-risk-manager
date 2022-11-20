import { TaskInterface } from '@interfaces/taskInterfaces'
import SubTask from '@components/project/export/Task/SubTask'

interface ExportTaskInterface {
  tasks: TaskInterface[]
  subTasks: TaskInterface[]
}

export default function ExportTask({ tasks, subTasks }: ExportTaskInterface) {
  return (
    <div className={'mt-5 text-black'} style={{ width: '34rem' }}>
      <div className={'flex justify-center'}>
        <h3 className={'text-xl'}>Tarefas</h3>
      </div>
      <ul className={'border border-black mt-3 pb-7'}>
        {tasks.map((task, index) => {
          return (
            <SubTask
              key={index}
              task={task}
              subTasks={subTasks}
              tasks={subTasks.filter((subTask) =>
                subTask.parentTaskID?.includes(task._id as string)
              )}
            />
          )
        })}
      </ul>
    </div>
  )
}
