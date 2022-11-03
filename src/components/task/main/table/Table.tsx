import { Dispatch, SetStateAction } from 'react'
import Header from '@components/task/main/table/Header'
import Data from '@components/task/main/table/Data'
import { TaskInterface, OrderInterface } from '@interfaces/taskInterfaces'

interface TableInterface {
  mode: 'main' | 'create' | 'edit'
  tasks: TaskInterface[]
  projectID: string
  selectTask: (task: TaskInterface) => void
  deleteTask: (task: TaskInterface) => void
  order: OrderInterface
  setOrder: Dispatch<SetStateAction<OrderInterface>>
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  orderBy: (
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) => void
}

export default function Table({
  mode,
  tasks,
  selectTask,
  deleteTask,
  order,
  setOrder,
  orderBy,
  deleteMessage,
  setDeleteMessage,
  projectID,
}: TableInterface) {
  return (
    <div className={`${mode === 'main' ? '' : 'hidden'}`}>
      <table
        className={'w-full  overflow-hidden text-slate-900 dark:text-slate-300'}
      >
        <thead
          className={`
                    bg-slate-300 dark:bg-slate-900 
                    `}
        >
          <Header order={order} orderBy={orderBy} setOrder={setOrder} />
        </thead>
        <tbody>
          {tasks?.map((task, index) => {
            return (
              <Data
                key={index}
                index={index}
                projectID={projectID}
                task={task}
                deleteTask={deleteTask}
                selectTask={selectTask}
                deleteMessage={deleteMessage}
                setDeleteMessage={setDeleteMessage}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
