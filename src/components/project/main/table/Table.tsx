import { Dispatch, SetStateAction } from 'react'
import Header from '@components/project/main/table/Header'
import Data from '@components/project/main/table/Data'
import { ProjectInterface, OrderInterface } from '@interfaces/projectInterfaces'

interface TableInterface {
  mode: 'main' | 'create' | 'edit' | 'view'
  projects: ProjectInterface[]
  selectProject: (project: ProjectInterface) => void
  deleteProject: (project: ProjectInterface) => void
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
  projects,
  selectProject,
  deleteProject,
  order,
  setOrder,
  orderBy,
  deleteMessage,
  setDeleteMessage,
}: TableInterface) {
  return (
    <div className={`${mode === 'main' ? '' : 'hidden'}`}>
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
          {projects?.map((project, index) => {
            return (
              <Data
                key={index}
                project={project}
                deleteProject={deleteProject}
                selectProject={selectProject}
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
