import { TaskInterface } from '@interfaces/taskInterfaces'
import { Dispatch, SetStateAction } from 'react'
import Actions from '@components/task/main/table/Actions'

interface DataInterface {
  task: TaskInterface
  selectTask: (task: TaskInterface) => void
  deleteTask: (task: TaskInterface) => void
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  projectID: string
  typeTask?: string
}

export default function Data({
  task,
  selectTask,
  deleteTask,
  deleteMessage,
  setDeleteMessage,
  projectID,
  typeTask,
}: DataInterface) {
  return (
    <tr key={task._id}>
      <td className={'text-left p-1 pl-4'}>{task.title}</td>
      <td className={'text-justify p-1'}>{task.description}</td>
      <td className={'text-justify p-1'}>{task.responsible}</td>
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
        typeTask={typeTask}
      />
    </tr>
  )
}
