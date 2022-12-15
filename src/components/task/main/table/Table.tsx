import { Dispatch, SetStateAction } from 'react'
import Header from '@components/task/main/table/Header'
import Data from '@components/task/main/table/Data'
import { TaskInterface, OrderInterface } from '@interfaces/taskInterfaces'

interface TableInterface {
  mode: 'main' | 'create' | 'edit'
  tasks: TaskInterface[]
  typeTask?: string
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
  typeTask,
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
    <>
      {mode === 'main' ? (
        <div>
          <table
            className={`w-full  overflow-hidden text-slate-900 dark:text-slate-300 border-8
        border-slate-300 dark:border-slate-900 bg-slate-100 dark:bg-slate-700`}
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
                    projectID={projectID}
                    task={task}
                    deleteTask={deleteTask}
                    selectTask={selectTask}
                    deleteMessage={deleteMessage}
                    setDeleteMessage={setDeleteMessage}
                    typeTask={typeTask}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        false
      )}
    </>
  )
}
