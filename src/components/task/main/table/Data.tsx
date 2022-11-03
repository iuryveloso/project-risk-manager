import { TaskInterface } from '@interfaces/taskInterfaces'
import { Dispatch, SetStateAction } from 'react'
import Actions from '@components/task/main/table/Actions'

interface DataInterface {
  task: TaskInterface
  index: number
  selectTask: (task: TaskInterface) => void
  deleteTask: (task: TaskInterface) => void
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  projectID: string
}

export default function Data({
  task,
  index,
  selectTask,
  deleteTask,
  deleteMessage,
  setDeleteMessage,
  projectID,
}: DataInterface) {
  return (
    <tr
      key={task._id}
      className={`${
        index % 2 === 0
          ? `
                bg-slate-100
                dark:bg-slate-600
            `
          : `
                bg-slate-200
                dark:bg-slate-700
            `
      }`}
    >
      <td className={'text-left p-1 pl-4'}>{task.title}</td>
      <td className={'text-justify p-1'}>{task.description}</td>
      <td className={'text-left p-1'}>{`${task.begin.split('-')[2]}/${
        task.begin.split('-')[1]
      }/${task.begin.split('-')[0]}`}</td>
      <td className={'text-left p-1'}>{`${task.end.split('-')[2]}/${
        task.end.split('-')[1]
      }/${task.end.split('-')[0]}`}</td>
      <Actions
        task={task}
        projectID={projectID}
        deleteTask={deleteTask}
        selectTask={selectTask}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
    </tr>
  )
}
